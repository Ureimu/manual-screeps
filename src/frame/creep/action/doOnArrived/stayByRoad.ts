import { AcrossTick, newAcrossTickTask } from "utils/AcrossTick";
import { AcrossTickReturnCode } from "utils/AcrossTick/type";
import { PosStr } from "utils/RoomPositionToStr";
import { checkArray } from "utils/typeCheck";
import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";
import { runningCounter } from "./utils/runningCounter";

function run(creep: Creep): state {
    if (!global.roomMemory?.[creep.room.name]?.freeSpacePosList) {
        if (!global.roomMemory) global.roomMemory = {};
        const posList = creep.room.memory.construct.freeSpacePosList as string[];
        if (!global.roomMemory[creep.room.name]) global.roomMemory[creep.room.name] = {};
        if (!global.roomMemory[creep.room.name].freeSpacePosList) {
            global.roomMemory[creep.room.name].freeSpacePosList = [];
        }
        const globalPosList = global.roomMemory[creep.room.name].freeSpacePosList;
        if (checkArray(globalPosList)) {
            posList.forEach(posStr => {
                globalPosList.push({ posStr, creepName: "undefined" });
            });
        }
    }

    const freeSpacePosList = global.roomMemory[creep.room.name].freeSpacePosList;
    if (checkArray(freeSpacePosList)) {
        if (!global.creepMemory[creep.name].parkingSpot) {
            const closestSpot = creep.pos.findClosestByRange(
                freeSpacePosList
                    .filter(({ creepName }) => {
                        if (!creepName || creepName === "undefined" || creepName === creep.name) return true;
                        else return false;
                    })
                    .map(({ posStr }) => {
                        return PosStr.getPosFromStr(posStr);
                    })
            );
            if (closestSpot) {
                const posStr = PosStr.setPosToStr(closestSpot);
                global.creepMemory[creep.name].parkingSpot = posStr;
                const index = freeSpacePosList.findIndex(pos => pos.posStr === posStr);
                freeSpacePosList[index].creepName = creep.name;
                // console.log(`[creep] ${creep.name} 选择了parkingSpot ${posStr}`);
            } else {
                // console.log(`[creep] ${creep.name} 找不到parkingSpot`);
            }
        }
        const creepStayPos = global.creepMemory[creep.name].parkingSpot;
        if (!creepStayPos) return "moving";
        else {
            const pos = PosStr.getPosFromStr(creepStayPos);
            if (!creep.pos.isEqualTo(pos)) {
                creep.moveTo(pos);
                return "arrived";
            } else {
                if (
                    runningCounter(creep, "stayByRoad") > 1 ||
                    global.creepMemory[creep.name].checkPosOccupation === true
                )
                    return "moving";
                newAcrossTickTask({
                    taskName: "checkPosOccupation",
                    executeTick: Game.time + 6,
                    intervalTick: 10,
                    args: [creep.name, creep.room.name],
                    log: false
                });
                return "moving";
            }
        }
    } else {
        throw new TypeError("freeSpacePosList类型不正确");
    }
}

export function callOnStart(): void {
    AcrossTick.mountTaskFunction({ taskName: "checkPosOccupation" }, ({ args }) => {
        const [creepName, roomName] = args as string[];
        if (!global.creepMemory[creepName]) return "runAgain";
        const creep = Game.creeps[creepName];
        const parkingSpot = global.creepMemory[creepName]?.parkingSpot;
        if (!creep) {
            // console.log(`[creep] ${creepName} 由于不存在而放弃了parkingSpot`);
            global.creepMemory[creepName].checkPosOccupation = false;
            if (parkingSpot) {
                return releaseParkingSpot(roomName, creepName, parkingSpot);
            } else {
                return checkAllParkingSpot(roomName, creepName);
            }
        }

        if (!global.creepMemory[creepName].checkPosOccupation) {
            global.creepMemory[creepName].checkPosOccupation = true;
        }
        if (creep.pos && parkingSpot) {
            const creepPos = Game.creeps[creepName].pos;
            if (PosStr.setPosToStr(creepPos) === parkingSpot) {
                return "runAgain";
            }
        }
        if (parkingSpot) {
            return releaseParkingSpot(roomName, creepName, parkingSpot);
        } else {
            return checkAllParkingSpot(roomName, creepName);
        }
    });
}

function releaseParkingSpot(roomName: string, creepName: string, parkingSpot: string): AcrossTickReturnCode {
    const freeSpacePosList = global.roomMemory[roomName].freeSpacePosList;
    if (checkArray(freeSpacePosList)) {
        const index = freeSpacePosList.findIndex(pos => pos.posStr === parkingSpot);
        if (index !== -1) {
            freeSpacePosList[index].creepName = "undefined";
            // console.log(`[creep] ${creepName} 放弃了parkingSpot ${parkingSpot}`);
            global.creepMemory[creepName].parkingSpot = undefined;
        }
        global.creepMemory[creepName].checkPosOccupation = false;
        return "finish";
    } else {
        throw new TypeError("freeSpacePosList类型不正确");
    }
}

function checkAllParkingSpot(roomName: string, creepName: string): AcrossTickReturnCode {
    const freeSpacePosList = global.roomMemory[roomName]?.freeSpacePosList;
    if (checkArray(freeSpacePosList)) {
        if (!Game.creeps[creepName]) {
            for (const posObj of freeSpacePosList) {
                if (posObj.creepName === creepName) {
                    posObj.creepName = "undefined";
                }
            }
        }
        return "finish";
    } else {
        throw new TypeError("freeSpacePosList类型不正确");
    }
}

export const stayByRoad: CreepAction = {
    run,
    name: "stayByRoad",
    description: "呆在路边，但不站在路上，为其他使用路的creep让出空间，适用于一段时间不需要在路上运行的creep",
    type: "move"
};

declare global {
    interface GlobalCreepMemory {
        collectPos?: string;
        parkingSpot?: string;
        checkPosOccupation?: boolean;
    }

    interface GlobalRoomMemory {
        freeSpacePosList?: { posStr: string; creepName: string }[];
    }
}
