import { PosStr } from "utils/RoomPositionToStr";
import { getGridLayout } from "./composition/gridLayout";
import { runLayout } from "./composition/runLayOut";

export function callOnStart(room: Room): void {
    const controller = room.controller as StructureController;
    if (controller.my) {
        if (room.memory.construct === undefined) {
            (room.memory as Partial<RoomMemory>) = {
                construct: {
                    startTime: Game.time,
                    roomControlStatus: [1],
                    construction: {},
                    centerPos: "",
                    firstSpawnName: {
                        name: room.find(FIND_MY_SPAWNS)[0].name,
                        pos: PosStr.setPosToStr(room.find(FIND_MY_SPAWNS)[0].pos)
                    },
                    ifCompleted: false
                }
            };
        }
    }
}

function restartConstruction(room: Room): void {
    for (const m in room.memory.construct.construction) {
        const constructMemory =
            room.memory.construct.construction[m as keyof typeof room.memory.construct.construction];
        for (const n in constructMemory) {
            constructMemory[n as keyof typeof constructMemory].hasPutSites = false;
        }
    }
}

export function autoConstruction(room: Room): void {
    callOnStart(room);
    if (room.memory.construct.roomControlStatus[0] !== room.controller?.level) {
        restartConstruction(room);
        console.log("[build] 房间等级提升，重新检查建筑数量");
    }
    if ((Game.time - room.memory.construct.startTime) % 20000 === 0) {
        restartConstruction(room);
        console.log("[build] 定时检查建筑数量");
    }
    const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
    if (constructionSites.length !== room.memory.construct.roomControlStatus[3]) updateConstruction(room);
    room.memory.construct.roomControlStatus[0] = room.controller?.level as number;
    room.memory.construct.roomControlStatus[1] = room.controller?.progress as number;
    room.memory.construct.roomControlStatus[2] = room.controller?.progressTotal as number;
    room.memory.construct.roomControlStatus[3] = constructionSites.length;
    if ((Game.time - room.memory.construct.startTime) % 30 === 30 - 1) runLayout(room, "gridLayout", getGridLayout);
}

function updateConstruction(room: Room): void {
    const structures = room.find(FIND_MY_STRUCTURES) as ConcreteStructure<BuildableStructureConstant>[];
    for (const myStructure of structures) {
        if (myStructure.hitsMax) {
            const structureName = buildingName(myStructure);
            if (structureName === "") continue;
            const structureList = myStructure.room.memory.construct.construction[myStructure.structureType];
            if (structureList && !structureList[structureName].memory[myStructure.id])
                structureList[structureName].memory[myStructure.id] = {
                    built: true,
                    pos: PosStr.setPosToStr(myStructure.pos)
                };
            if (
                structureList &&
                structureList[structureName].hasPutSites &&
                Object.keys(structureList[structureName].memory).length === structureList[structureName].num
            ) {
                structureList[structureName].hasBuilt = true;
            }
        }
    }
}

function buildingName<T extends BuildableStructureConstant>(myStructure: ConcreteStructure<T>): string {
    for (const name in myStructure.room.memory.construct.construction) {
        if (name === myStructure.structureType) {
            const structureList = myStructure.room.memory.construct.construction[name];
            for (const kindName in structureList) {
                const memory = structureList[kindName].memory;
                for (const id in memory) {
                    if (memory[id].built) {
                        if (memory[id].pos === PosStr.setPosToStr(myStructure.pos)) {
                            return kindName;
                        }
                    }
                }
            }
        }
    }
    return "";
}
