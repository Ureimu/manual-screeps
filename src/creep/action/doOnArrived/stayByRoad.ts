import { AcrossTick, newAcrossTickTask } from "utils/AcrossTick";
import { PosStr } from "utils/RoomPositionToStr";
import { CreepAction } from ".";
import { state } from "..";
import { getMidpointObjects } from "./utils/getMidpointObjects";

function run(creep: Creep): state {
    if (!global.roomMemory?.[creep.room.name]?.freeSpacePosList) {
        if (!global.roomMemory) global.roomMemory = {};
        const posList = creep.room.memory.construct.freeSpacePosList as string[];
        global.roomMemory[creep.room.name] = {
            freeSpacePosList: []
        };
        posList.forEach(posStr => {
            global.roomMemory[creep.room.name].freeSpacePosList.push({ posStr, creepName: "undefined" });
        });
    }

    const freeSpacePosList = global.roomMemory[creep.room.name].freeSpacePosList;

    if (!global.creepMemory[creep.name].parkingSpot) {
        const closestSpot = creep.pos.findClosestByRange(
            freeSpacePosList
                .filter(({ creepName }) => {
                    if (!creepName || creepName === "undefined") return false;
                    else return true;
                })
                .map(({ posStr }) => {
                    return PosStr.getPosFromStr(posStr);
                })
        );
        if (closestSpot) global.creepMemory[creep.name].parkingSpot = PosStr.setPosToStr(closestSpot);
    }
    const creepStayPos = global.creepMemory[creep.name].parkingSpot;
    if (!creepStayPos) return "moving";
    else {
        const pos = PosStr.getPosFromStr(creepStayPos);
        if (!creep.pos.isEqualTo(pos)) {
            creep.moveTo(pos);
            return "arrived";
        } else {
            newAcrossTickTask({
                taskName: "checkPosOccupation",
                executeTick: Game.time,
                intervalTick: 3,
                args: [creep.name]
            });
            return "moving";
        }
    }
}

export function callOnStart(): void {
    AcrossTick.mountTaskFunction({ taskName: "checkPosOccupation" }, ({ args }) => {
        const [creepName] = args as string[];
        const creep = Game.creeps[creepName];
        if (creep.pos && global.creepMemory[creepName].parkingSpot) {
            const creepPos = Game.creeps[creepName].pos;
            if (PosStr.setPosToStr(creepPos) === global.creepMemory[creepName].parkingSpot) {
                return "runAgain";
            }
        }

        global.roomMemory[creep.room.name].freeSpacePosList.filter(({ posStr }) => {
            return posStr === global.creepMemory[creepName].parkingSpot;
        })[0].creepName = "undefined";
        global.creepMemory[creepName].parkingSpot = undefined;
        return "finish";
    });
}

export const stayByRoad: CreepAction = {
    run,
    name: "stayByRoad",
    description: "呆在路边，但不站在路上，为其他使用路的creep让出空间，适用于一段时间不需要在路上运行的creep",
    type: "move"
};

declare global {
    namespace NodeJS {
        interface Global {
            roomMemory: { [name: string]: GlobalRoomMemory };
        }
    }
}

interface GlobalRoomMemory {
    freeSpacePosList: { posStr: string; creepName: string }[];
}
