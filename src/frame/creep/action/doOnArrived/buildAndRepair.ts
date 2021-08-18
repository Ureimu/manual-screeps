import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";

const cache: { [name: string]: { repair: boolean } } = {};

function run(creep: Creep, args?: string[]): state {
    if (!args) throw Error("需要参数");
    const [structurePosStr, structureType] = args;
    const structurePos = PosStr.getPosFromStr(structurePosStr);
    const constructionSites = structurePos
        .lookFor(LOOK_CONSTRUCTION_SITES)
        .filter(site => site.structureType === structureType);
    const structures = structurePos.lookFor(LOOK_STRUCTURES).filter(i => i.structureType === structureType);

    const ifBuild = creep.store[RESOURCE_ENERGY] !== 0;
    if (ifBuild) {
        if (constructionSites[0]) {
            creep.build(constructionSites[0]);
        } else if (structures[0]) {
            const structure = structures[0];
            const ifRepair = structure.hits < structure.hitsMax * 0.8;
            const ifStopRepair = structure.hits === structure.hitsMax;
            if (!cache[creep.name]) cache[creep.name] = { repair: false };
            if (cache[creep.name].repair && ifStopRepair) {
                cache[creep.name].repair = false;
            }
            if (!cache[creep.name].repair && ifRepair) {
                cache[creep.name].repair = true;
            }
            if (cache[creep.name].repair) {
                creep.repair(structure);
            } else {
                return "moving";
            }
        }
        return "arrived";
    } else {
        return "moving";
    }
}

export const buildAndRepairOneStructure: CreepAction = {
    run,
    name: "buildAndRepairOneStructure",
    description: "建造某一个建筑并修复该建筑",
    type: "stay"
};
