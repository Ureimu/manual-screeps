import { consoleStyle, LogLevel } from "frame/console/style";
import {
    StructureInf,
    ConstructionMemory,
    SpecifiedLayoutData,
    LayoutDataNode,
    LayoutRequireList,
    FullSpecifiedStructureMemory,
    SpecifiedStructureNameList,
    SpecifiedStructureInf
} from "frame/construct/type";
import { logManager } from "utils/log4screeps";
import { PosStr } from "utils/RoomPositionToStr";
import { getLayoutFromSegment } from "./getLayoutFromSegment";
import { getTotalSiteNum } from "./utils/getTotalSiteNum";
import { getAllSpecifiedTypeMemory } from "./utils/structureMemory";

const logger = logManager.createLogger("info", "RunLayout");
export function runLayout(room: Room): void {
    logger.debug(room.name);
    const construct = room.memory.construct;
    if (!construct.layout) {
        logger.debug(`尝试获取layout ${Game.time}`);
        const cacheLayoutData = getLayoutFromSegment(room.name);
        if (cacheLayoutData) {
            logger.debug("获取layout完成");
            construct.layout = cacheLayoutData.layout;
            construct.centerPos = cacheLayoutData.centerPos;
            construct.freeSpacePosList = cacheLayoutData.freeSpacePosList;
        }
    }
    if (!construct.layout) {
        logger.debug(`提前返回：construct.layout 不存在`, "error");
        return;
    }
    let totalSitesNum = getTotalSiteNum();
    logger.debug(`初始工地数量: ${totalSitesNum}`);
    Object.entries(construct.layout).some(entry => {
        const constructionName = entry[0] as BuildableStructureConstant;

        const specifiedLayout = entry[1];

        if (!specifiedLayout) return;
        const level = room.controller?.level ?? 0;
        const layoutStructureList = Object.values(specifiedLayout)
            .reduce((p, n) => {
                p.push(...n.requireList);
                return p;
            }, [] as LayoutRequireList)
            .filter(i => i[1] <= level)
            .sort((a, b) => b[2] - a[2]);

        const buildNumberLimit = CONTROLLER_STRUCTURES[constructionName][level];
        const requireList = layoutStructureList;
        if (!requireList) {
            logger.debug(`${constructionName} posStrList不存在,跳过`);
            return false;
        }

        if (buildNumberLimit > 0) {
            totalSitesNum = putConstructionSites(room, requireList, constructionName, totalSitesNum);
        }
        // 下面这一行注释掉了，因为刷新逻辑也在这个函数执行
        // if (totalSitesNum >= MAX_CONSTRUCTION_SITES) {
        //     return true;
        // }
        return false;
    });
    if (!construct.layout || !construct.construction) {
        logger.debug(`提前返回：construct.layout 或 construct.construction 不存在`, "error");
        return;
    }
    if (!global.roomMemory) global.roomMemory = {};
    if (!global.roomMemory[room.name]) global.roomMemory[room.name] = {};
    const specifiedTypeMemory = getAllSpecifiedTypeMemory(room);
    logger.debug(`更新全局建筑内存：${JSON.stringify(specifiedTypeMemory, null, 2)}`);
    global.roomMemory[room.name].construction = specifiedTypeMemory;
}

declare global {
    interface GlobalRoomMemory {
        construction?: FullSpecifiedStructureMemory;
    }
}

function initConstructionMemory<T extends StructureConstant>(room: Room, structureType: T): void {
    const construction = room.memory.construct.construction;
    const typedConstruction = construction[structureType];
    if (!typedConstruction) {
        (construction[structureType] as unknown as StructureInf<T>) = {
            siteList: [],
            hasPutSites: false,
            hasBuilt: false,
            type: structureType,
            structureList: []
        };
    }
}

function putConstructionSites<T extends BuildableStructureConstant>(
    room: Room,
    layoutRequireList: LayoutRequireList,
    structureType: T,
    totalSitesNum: number
): number {
    initConstructionMemory(room, structureType);
    const construction = room.memory.construct.construction;
    const layout = room.memory.construct.layout;
    if (!layout || !construction) return 0;
    const specifiedConstruction = construction[structureType] as Exclude<ConstructionMemory[T], undefined>;
    const specifiedLayout = layout[structureType] as Exclude<SpecifiedLayoutData<T>, undefined>;
    if (!specifiedConstruction) return 0;
    if (!specifiedLayout) return 0;
    if (specifiedConstruction?.hasPutSites === true && specifiedConstruction?.hasBuilt === true) return 0;
    const constructionTypeMemory = specifiedConstruction;
    if (!constructionTypeMemory) throw new Error("no constructionTypeMemory");
    // debug(JSON.stringify(constructionTypeMemory, null, 4));
    const structures = room.find(FIND_STRUCTURES, {
        filter: structure => {
            return structure.structureType === structureType;
        }
    });
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES, {
        filter: constructionSite => {
            return constructionSite.structureType === structureType;
        }
    });

    /*
    这里一共有三个建筑表，一个是布局要求的（layout，记为表A），一个是现在room.find得到的（记为表B），一个是memory存的（记为表C）。
    将建筑表记为1，建筑工地表记为2.如C2指memory存的建筑工地id表。
    我们希望layout的所有建筑没有冲突（即不会出现不能叠加放置的建筑叠加在一起,除了road以外不会出现有重复的相同建筑类型的pos的注册）
    memory只存structureType分类，而具体的specifiedType在有新建筑建成和global重置时，根据layout的对应位置来自动生成在global上。

    找出所有表A的符合rcl等级要求建筑的位置字符串以及优先级组成的对象并组合为列表，并按照优先度排序，遍历该列表，{
        1.遍历表B1，找到与其位置相同的建筑。如果有相同的，将所有相同的汇集为一个列表，将该列表传给步骤2，并进入步骤2，如果没有，进入步骤3。
        2.
        遍历该列表，{
            如果建筑类型相同，在表C1中查找该建筑，{
                如果有该建筑，跳过。
                如果没有该建筑，向表C1添加这个建筑（pos和id）。并查找表C2对应位置及建筑类型，如果有相同的则删除对应行。跳过。
            }
            如果建筑类型不相同，{
                且不是可以共存的建筑类型（如road，container，rampart），
                    则尝试destroy该建筑。并查找表C1,C2该建筑对应位置及建筑类型，如果有相同的则删除对应行。并跳过.
                是可以共存的建筑类型（如road，container，rampart），
                    则跳过.
            }
        }
        进入步骤3.
        3.遍历表B2，找到与其位置相同的建筑工地。如果有相同的，将所有相同的汇集为一个列表（应该只有1个元素），将该列表传给步骤4，并进入步骤4，
        如果没有，进入步骤5。
        4.
        遍历该列表，{
            如果建筑类型相同，在表C2中查找该建筑工地，{
                如果有该建筑工地，跳过。
                如果没有该建筑工地，向表C2添加这个建筑工地（pos和id）。并查找表C1对应位置及建筑类型，如果有相同的则删除对应行。跳过。
            }
            如果建筑类型不相同，{
                且不是可以共存的建筑类型（如road，container，rampart），
                    则尝试remove该建筑工地。并查找表C1,C2该建筑工地对应位置及建筑类型，如果有相同的则删除对应行。并跳过.
                是可以共存的建筑类型（如road，container，rampart），
                    则跳过.
            }
        }
        进入步骤5.
        5.尝试在对应位置放置工地。结束。（不做任何是否放置成功的检测，因为就算返回ok也可能没有放置成功，在下一次执行该函数的时候再判断。）
        如果当前总工地数量超过最大工地数量限制，跳出循环。
    }


    提供一个建筑类memory的属性：hasPutSites来判断当前rcl下是否已经放完了该建筑类所有site，通过检查site数量和建筑数量之和是否等于当前布局要求放置建筑数量来实现。
    提供一个建筑类memory的属性：hasBuilt来判断当前rcl下是否已经修好了该建筑类所有建筑，通过检查建筑数量是否等于当前布局要求放置建筑数量来实现。
    上面两个属性也给specifiedType提供。

    实现specifiedType.
    根据C1和A的建筑位置进行遍历对比即可生成specifiedType的表。
    因为很容易生成所以放在global上。
    每次建筑更新的时候也更新这个表。
    */

    layoutRequireList.forEach(([posStr]) => {
        const samePosList = structures.filter(structure => PosStr.setPosToStr(structure.pos) === posStr);
        const hasFoundStructure = samePosList.some(i => {
            const structure = i as ConcreteStructure<T>;
            const structurePosStr = PosStr.setPosToStr(structure.pos);
            if (structure.structureType === structureType) {
                if (!specifiedConstruction.structureList.some(i1 => i1.id === structure.id)) {
                    (specifiedConstruction.structureList as { pos: string; id: string }[]).push({
                        id: structure.id,
                        pos: structurePosStr
                    });
                    logger.debug(
                        `${structureType} structureList 添加了${structurePosStr}, 现在长度为${specifiedConstruction.siteList.length}`
                    );
                }
                return true;
            } else {
                if (
                    !([STRUCTURE_CONTAINER, STRUCTURE_RAMPART, STRUCTURE_ROAD] as StructureConstant[]).includes(
                        structure.structureType
                    )
                ) {
                    structure.destroy();
                    removeStructureFromConstructionMemory(structure.structureType, structurePosStr, construction);
                }
            }
            return false;
        });
        if (hasFoundStructure) return true;

        const sameSitePosList = constructionSites.filter(
            constructionSite => PosStr.setPosToStr(constructionSite.pos) === posStr
        );
        const hasFoundStructureSite = sameSitePosList.some(i => {
            const site = i as ConstructionSite<T>;
            const structurePosStr = PosStr.setPosToStr(site.pos);

            if (site.structureType === structureType) {
                if (!specifiedConstruction.siteList.some(i1 => i1.id === site.id)) {
                    (specifiedConstruction.siteList as { pos: string; id: string }[]).push({
                        id: site.id,
                        pos: structurePosStr
                    });
                    logger.debug(
                        `${structureType} siteList 添加了${structurePosStr}, 现在长度为${specifiedConstruction.siteList.length}`
                    );
                }
                return true;
            } else {
                if (
                    !([STRUCTURE_CONTAINER, STRUCTURE_RAMPART, STRUCTURE_ROAD] as StructureConstant[]).includes(
                        site.structureType
                    )
                ) {
                    site.remove();
                    removeStructureFromConstructionMemory(site.structureType, structurePosStr, construction);
                }
            }
            return false;
        });
        if (hasFoundStructureSite) return true;
        if (totalSitesNum < MAX_CONSTRUCTION_SITES) {
            logger.debug(`未检索到 ${structureType} 在 ${posStr} 已建成建筑或工地,尝试放置工地.`);
            const returnCode = room.createConstructionSite(PosStr.getPosFromStr(posStr), structureType);
            if (returnCode === ERR_RCL_NOT_ENOUGH) {
                logger.debug(`${structureType}放置数量已经达到rcl上限。`);
                return true;
            }
            if (returnCode === ERR_FULL) {
                totalSitesNum = MAX_CONSTRUCTION_SITES;
                return true;
            }
            if (returnCode === OK) {
                totalSitesNum++;
                if (totalSitesNum >= MAX_CONSTRUCTION_SITES) {
                    return true;
                }
            }
        }

        return false;
    });

    if (layoutRequireList.length === specifiedConstruction.structureList.length) {
        specifiedConstruction.hasBuilt = true;
    } else {
        specifiedConstruction.hasBuilt = false;
    }
    if (
        layoutRequireList.length ===
        specifiedConstruction.structureList.length + specifiedConstruction.siteList.length
    ) {
        specifiedConstruction.hasPutSites = true;
    } else {
        specifiedConstruction.hasPutSites = false;
    }
    return totalSitesNum;
}

function removeStructureFromConstructionMemory<T extends StructureConstant>(
    structureType: T,
    posStr: string,
    constructionMemory: ConstructionMemory
): void {
    const structureConstructionMemory = constructionMemory[structureType];
    if (!structureConstructionMemory) return;
    const structureList = structureConstructionMemory.structureList as { pos: string; id: string }[];

    const findStructureIndex = structureList.findIndex(({ pos }) => {
        return posStr === pos;
    });
    const structureSiteList = structureConstructionMemory.siteList as { pos: string; id: string }[];

    const findStructureSiteIndex = structureSiteList.findIndex(({ pos }) => {
        return posStr === pos;
    });
    if (findStructureIndex !== -1) {
        _.pullAt(structureConstructionMemory.structureList as { pos: string; id: string }[], findStructureIndex);
    }
    if (findStructureSiteIndex !== -1) {
        _.pullAt(structureConstructionMemory.siteList as { pos: string; id: string }[], findStructureSiteIndex);
    }
}
