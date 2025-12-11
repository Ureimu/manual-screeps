import { PowerBankData } from "AI/AIUreium/control/recordRoomData";

export function startGetPower(powerBankData: PowerBankData): void {
    if (!powerBankData.originRoomName) return;
    const mainRoom = Game.rooms[powerBankData.originRoomName];
    if (!mainRoom.memory.AIUreium.getPower[powerBankData.roomName]) {
        mainRoom.memory.AIUreium.getPower[powerBankData.roomName] = {};
    }
    mainRoom.memory.AIUreium.getPower[powerBankData.roomName][powerBankData.id] = { memory: { spawnCarrier: false } };
}
