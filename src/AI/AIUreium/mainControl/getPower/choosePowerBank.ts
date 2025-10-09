import { startGetPower } from "AI/AIUreium/room/getPower/start";
import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { Constant } from "../constants/roomTaskControl";

const spawnCreepTime = 1000;
const workTime = 1500;
const maxMoveTime = 500;

declare global {
    interface TaskStatus {
        getPower?: boolean;
    }
}

export function choosePowerBank(mainRoom: Room): void {
    console.log(`${mainRoom.name} choosePowerBank`);
    if (!mainRoom.memory.status) {
        mainRoom.memory.status = {};
    }
    const status = mainRoom.memory.status;
    if (status.getPower) return;
    if (!("getPower" in status)) {
        status.getPower = false;
    }
    if (!mainRoom.storage) return;
    const storage = mainRoom.storage;
    if (storage.store.energy < Constant.getPower.lowestEnergyInStorage) return;
    _.forEach(Memory.rooms, (powerBankRoomMemory, powerBankRoomName) => {
        if (status.getPower) return;
        if (!powerBankRoomName) return;
        if (!powerBankRoomMemory.powerBanks) return;
        _.forEach(powerBankRoomMemory.powerBanks, powerBankMemory => {
            if (status.getPower) return;
            const periodToGetPower = powerBankMemory.decayTime - Game.time;
            const pathData = PathFinder.search(
                storage.pos,
                { pos: new RoomPosition(powerBankMemory.x, powerBankMemory.y, powerBankRoomName), range: 1 },
                { maxOps: 1000 * 50, roomCallback: getCostMatrix }
            );
            if (pathData.incomplete) return;
            const moveTime = pathData.cost / 2;
            if (moveTime > maxMoveTime) return;
            console.log(
                `periodToGetPower:${periodToGetPower} pathLength:${moveTime} spawnCreepTime:${spawnCreepTime} workTime:${workTime}`
            );
            if (periodToGetPower - moveTime - spawnCreepTime - workTime < 0) return;
            powerBankMemory.originRoomName = mainRoom.name;
            startGetPower(powerBankMemory);
            status.getPower = true;
            console.log(`${mainRoom.name} start getPower in ${powerBankRoomName}`);
        });
    });
}
