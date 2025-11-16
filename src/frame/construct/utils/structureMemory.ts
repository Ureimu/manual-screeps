import { logManager } from "utils/log4screeps";
import { FullSpecifiedStructureMemory, SpecifiedStructureInf, SpecifiedStructureNameList } from "../type";
const logger = logManager.createLogger("debug", "getAllSpecifiedTypeMemory");
/**
 * 
 *  实现specifiedType.
    根据C1和A的建筑位置进行遍历对比即可生成specifiedType的表。
    因为很容易生成所以放在global上。
    每次建筑更新的时候也更新这个表。
 */
export function getAllSpecifiedTypeMemory(room: Room): FullSpecifiedStructureMemory {
    const start = Game.cpu.getUsed();
    const construction = room.memory.construct.construction;
    const layout = room.memory.construct.layout;
    if (!layout || !construction) throw Error("how");
    const fullMemory: FullSpecifiedStructureMemory = {};
    Object.entries(layout).forEach(([name, tLayout]) => {
        const structureType = name as BuildableStructureConstant;
        fullMemory[structureType] = {};
        const typedFullMemory = fullMemory[structureType];
        if (!typedFullMemory) return;
        const cTypedFullMemory = typedFullMemory as {
            [name: string]: SpecifiedStructureInf<
                BuildableStructureConstant,
                SpecifiedStructureNameList<BuildableStructureConstant>
            >;
        };
        const typedConstruction = construction[structureType];
        if (!typedConstruction) return;
        const structureList = typedConstruction.structureList as {
            pos: string;
            id: Id<ConcreteStructure<BuildableStructureConstant>>;
        }[];
        const siteList = typedConstruction.siteList as {
            pos: string;
            id: Id<ConstructionSite<BuildableStructureConstant>>;
        }[];
        if (!tLayout) return;
        Object.entries(tLayout).forEach(([sName, sLayout]) => {
            const specifiedName = sName as SpecifiedStructureNameList<BuildableStructureConstant>;
            cTypedFullMemory[specifiedName] = {
                hasBuilt: false,
                hasPutSites: false,
                siteList: [],
                structureList: [],
                type: specifiedName
            };
            const specifiedTypedMemory = cTypedFullMemory[specifiedName];
            if (!sLayout?.requireList) return;
            const requireList = sLayout.requireList.filter(([, levelToBuild]) => {
                return levelToBuild <= (room.controller?.level as number);
            });
            requireList.forEach(([posStr]) => {
                const foundStructure = structureList.find(({ pos }) => pos === posStr);
                if (foundStructure && Game.getObjectById(foundStructure.id)) {
                    specifiedTypedMemory.structureList.push({ pos: foundStructure.pos, id: foundStructure.id });
                }
                const foundSite = siteList.find(({ pos }) => pos === posStr);
                if (foundSite) {
                    (
                        specifiedTypedMemory.siteList as {
                            pos: string;
                            id: Id<ConstructionSite<BuildableStructureConstant>>;
                        }[]
                    ).push({ pos: foundSite.pos, id: foundSite.id });
                }
            });
            logger.debug(
                `${specifiedName} requireList:${requireList.length} structureList: ${specifiedTypedMemory.structureList.length} siteList: ${specifiedTypedMemory.siteList.length}`,
                "log"
            );
            if (requireList.length === specifiedTypedMemory.structureList.length) {
                specifiedTypedMemory.hasBuilt = true;
            } else {
                specifiedTypedMemory.hasBuilt = false;
            }
            if (
                requireList.length ===
                specifiedTypedMemory.structureList.length + specifiedTypedMemory.siteList.length
            ) {
                specifiedTypedMemory.hasPutSites = true;
            } else {
                specifiedTypedMemory.hasPutSites = false;
            }
        });
    });
    const end = Game.cpu.getUsed();
    logger.debug(`cost: ${(end - start).toFixed(4)}`, "log");
    // 消耗约0.2
    return fullMemory;
}
