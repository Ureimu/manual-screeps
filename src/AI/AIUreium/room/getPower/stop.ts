import { getPowerTaskArgs } from "./taskRelation";

export function stopGetPower(...args: getPowerTaskArgs): void {
    const [originRoomName, powerBankRoomName, powerBankId] = args;

    const room = Game.rooms[originRoomName];
    if (!room.memory.status) {
        room.memory.status = {};
    }
    const status = room.memory.status;
    status.getPower = false;

    delete room.memory.AIUreium.getPower[powerBankRoomName][powerBankId];
}
