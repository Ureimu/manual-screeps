import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "oReserver");

export function oReserver(creep: Creep, args: string[]): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    if (creep.pos.roomName !== sourceRoomName) {
        creep.moveTo(new RoomPosition(25, 25, sourceRoomName));
    } else {
        const controller = creep.room.controller;
        if (!controller) throw new Error("not controller room");
        if (creep.pos.isNearTo(controller)) {
            creep.reserveController(controller);
        } else {
            creep.moveTo(controller);
        }
        recordReserveEndTime(sourceRoomName, controller);
    }
}

function recordReserveEndTime(roomName: string, controller: StructureController) {
    const controllerMemory = Memory.rooms[roomName].controller;
    if (!controllerMemory) {
        Memory.rooms[roomName].controller = {
            reserveEndTime: controller.reservation?.ticksToEnd
                ? Game.time + controller.reservation.ticksToEnd
                : Game.time
        };
    } else {
        controllerMemory.reserveEndTime = controller.reservation?.ticksToEnd
            ? Game.time + controller.reservation.ticksToEnd
            : Game.time;
    }
}
