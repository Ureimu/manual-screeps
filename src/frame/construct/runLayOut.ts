import { constructionSiteInf, formedLayout } from "frame/construct/type";
import { PosStr } from "utils/RoomPositionToStr";
import { gridLayoutBuildNumberLimit } from "./composition/gridLayout";

export function runLayout(room: Room, layoutFunc?: (room: Room) => void): void {
    if (layoutFunc && !room.memory.construct.firstSpawnName) return;
    const layout = room.memory.construct.layout;
    if (!layout && layoutFunc) {
        layoutFunc(room);
    }
    if (!layout) return;
    let totalSitesNum = room.find(FIND_CONSTRUCTION_SITES).length;
    Object.entries(layout).forEach(entry => {
        const constructionName = entry[0] as BuildableStructureConstant;
        const construction = entry[1];
        for (const specifiedName in construction) {
            let levelToBuild = 0;
            const specifiedConstruction = construction[specifiedName as keyof typeof construction] as {
                levelToBuild?: number;
            };
            if (typeof specifiedConstruction.levelToBuild !== "undefined") {
                levelToBuild = specifiedConstruction.levelToBuild;
            }
            const level = room.controller?.level ?? 0;
            const buildNumberLimit = levelToBuild <= level ? gridLayoutBuildNumberLimit[constructionName][level] : 0;
            const posStrList = (
                construction[specifiedName as keyof typeof construction] as {
                    posStrList?: string[];
                }
            ).posStrList;
            if (!posStrList) {
                console.log(`[build] ${specifiedName} posStrList不存在,跳过`);
                continue;
            }
            if (buildNumberLimit > 0) {
                totalSitesNum += putConstructionSites(
                    room,
                    posStrList,
                    specifiedName,
                    constructionName,
                    buildNumberLimit,
                    totalSitesNum
                );
            }
            if (totalSitesNum >= 100) {
                break;
            }
        }
    });
}

function initConstructionMemory(room: Room, name: string, structureType: BuildableStructureConstant): void {
    const construction = room.memory.construct.construction;
    if (!construction[structureType]) {
        construction[structureType] = {};
    }
    const specifiedConstruction = construction[structureType] as {
        [name: string]: constructionSiteInf<typeof structureType>;
    };
    if (!specifiedConstruction[name]) {
        specifiedConstruction[name] = {
            sitePosList: {},
            hasPutSites: false,
            hasBuilt: false,
            type: structureType,
            num: 0,
            memory: {}
        };
    }
}

function putConstructionSites<T extends BuildableStructureConstant>(
    room: Room,
    posStrList: string[],
    name: string,
    structureType: T,
    buildNumberLimit: number,
    totalSitesNum: number
): number {
    initConstructionMemory(room, name, structureType);
    const construction = room.memory.construct.construction;
    const specifiedConstruction = construction[structureType];
    if (specifiedConstruction?.[name]?.hasPutSites === true) return 0;
    if (buildNumberLimit === 0) return 0;
    const listC = [];
    const posList: RoomPosition[] = [];
    posStrList.forEach(posStr => {
        if (!posStr) {
            console.log(`[build] ${structureType} posStr不存在,跳过`);
            return;
        }
        posList.push(PosStr.getPosFromStr(posStr));
    });

    const constructionTypeMemory = specifiedConstruction as {
        [name: string]: constructionSiteInf<typeof structureType>;
    };
    console.log(JSON.stringify(constructionTypeMemory));
    const structures: {
        structureType: string;
        pos: RoomPosition;
        destroy?: () => number;
        remove?: () => number;
    }[] = room.find(FIND_STRUCTURES, {
        filter: structure => {
            return structure.structureType === structureType;
        }
    });
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES, {
        filter: constructionSite => {
            return constructionSite.structureType === structureType;
        }
    });
    const constructionData = specifiedConstruction?.[name];

    if (posList.length > 0) console.log(`[build] 放置工地 ${name}`);
    for (let i = 0; i < posList.length; i++) {
        const conditionFlagList = {
            isInMemoryPosList: false,
            isExistUnregisteredStructure: false,
            isExistUnregisteredConstructionSite: false
        };
        //
        for (const structure of structures) {
            if (structure.pos.isEqualTo(posList[i])) {
                const constructionMemory = constructionData?.memory;
                for (const id in constructionMemory) {
                    const pos = PosStr.getPosFromStr(constructionMemory[id].pos);
                    if (pos.isEqualTo(posList[i])) {
                        conditionFlagList.isExistUnregisteredStructure = true;
                        break;
                    }
                }
                for (const pos of (
                    room.memory.construct.layout?.[structureType]?.[
                        name as keyof typeof room.memory.construct.layout[typeof structureType]
                    ] as unknown as { posStrList: string[] }
                ).posStrList) {
                    if (pos === PosStr.setPosToStr(structure.pos) && structureType === structure.structureType) {
                        conditionFlagList.isExistUnregisteredConstructionSite = true;
                        break;
                    }
                }
                if (!conditionFlagList.isExistUnregisteredStructure) {
                    // console.log(`[build] 检索到已建成建筑,已添加`);
                }
            }
        }

        for (const site of constructionSites) {
            if (site.pos.isEqualTo(posList[i])) {
                const constructionMemory = constructionData?.memory;
                for (const id in constructionMemory) {
                    const pos = PosStr.getPosFromStr(constructionMemory[id].pos);
                    if (pos.isEqualTo(posList[i])) {
                        conditionFlagList.isExistUnregisteredConstructionSite = true;
                        break;
                    }
                }
                const siteLayoutData = room.memory.construct.layout?.[structureType]?.[
                    name as keyof typeof room.memory.construct.layout[typeof structureType]
                ] as unknown as { posStrList: string[]; levelToBuild: number };
                if (siteLayoutData.levelToBuild <= (room.controller?.level as number)) {
                    for (const pos of siteLayoutData.posStrList) {
                        if (pos === PosStr.setPosToStr(site.pos) && structureType === site.structureType) {
                            conditionFlagList.isExistUnregisteredConstructionSite = true;
                            break;
                        }
                    }
                }
                if (!conditionFlagList.isExistUnregisteredConstructionSite) {
                    // console.log(`[build] 检索到已建成建筑,已添加`);
                }
            }
        }
        if (conditionFlagList.isExistUnregisteredStructure === true) {
            constructionTypeMemory[name].sitePosList[PosStr.setPosToStr(posList[i])] = "structure";
            constructionTypeMemory[name].num = Object.keys(constructionTypeMemory[name].sitePosList).length;
            conditionFlagList.isInMemoryPosList = true;
        }
        if (conditionFlagList.isExistUnregisteredConstructionSite === true) {
            constructionTypeMemory[name].sitePosList[PosStr.setPosToStr(posList[i])] = "site";
            constructionTypeMemory[name].num = Object.keys(constructionTypeMemory[name].sitePosList).length;
            conditionFlagList.isInMemoryPosList = true;
        }
        if (conditionFlagList.isInMemoryPosList === false) {
            console.log(`[build] 未检索到已建成建筑或工地,尝试放置工地 ${PosStr.setPosToStr(posList[i])}`);
            listC[i] = room.createConstructionSite(posList[i], structureType);
            if (listC[i] === ERR_RCL_NOT_ENOUGH) {
                console.log(`[build] ${name}放置数量已经达到上限。`);
                break;
            }
            if (listC[i] === ERR_FULL) return 100;
            if (listC[i] === OK) {
                totalSitesNum++;
                if (totalSitesNum >= 100) {
                    return totalSitesNum;
                }
            }
        }
    }
    if (constructionTypeMemory[name].num === posList.length || constructionTypeMemory[name].num >= buildNumberLimit) {
        constructionTypeMemory[name].hasPutSites = true;
    }
    console.log(`[build] ${name} 检索完成，现在总工地数为${totalSitesNum}`);
    return totalSitesNum;
}
