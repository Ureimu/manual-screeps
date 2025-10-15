import { startGetPower } from "AI/AIUreium/room/getPower/start";
import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { getRoomDistance } from "utils/roomNameUtils";
import { Constant } from "../constants/roomTaskControl";
import { PowerBankData } from "../recordRoomData";
import { calcGetPowerSpawnTime } from "./calcSpawnTime";

const workTime = 1500;
const maxMoveTime = 500;

declare global {
    interface TaskStatus {
        getPower?: boolean;
    }
}

export function choosePowerBank(mainRoom: Room): void {
    const taskControl = global.roomMemory[mainRoom.name].control?.getPower;
    if (!taskControl) return;
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
    const validatedPowerBanks: PowerBankData[] = [];
    _.forEach(Memory.rooms, (powerBankRoomMemory, powerBankRoomName) => {
        if (status.getPower) return;
        if (!powerBankRoomName) return;
        if (!powerBankRoomMemory.powerBanks) return;
        if (!taskControl.rooms.includes(powerBankRoomName)) return;
        _.forEach(powerBankRoomMemory.powerBanks, powerBankMemory => {
            if (status.getPower) return;
            // 如果已经被其他人攻击过，则不选取
            if (powerBankMemory.isAttackedByOthers) return;
            if (powerBankMemory.isInMyAttack) return;
            if (getRoomDistance(powerBankRoomName, mainRoom.name) > maxMoveTime / 50) return;
            const periodToGetPower = powerBankMemory.decayTime - Game.time;
            const pathData = PathFinder.search(
                storage.pos,
                { pos: new RoomPosition(powerBankMemory.x, powerBankMemory.y, powerBankRoomName), range: 1 },
                { maxOps: 1000 * 50, roomCallback: getCostMatrix }
            );
            if (pathData.incomplete) return;
            const moveTime = pathData.cost / 2;
            if (moveTime > maxMoveTime) return;

            const spawnCreepTime = calcGetPowerSpawnTime(
                powerBankMemory.blankSpaceCount,
                Constant.getPower.spawnAttackerCount
            );
            console.log(
                `periodToGetPower:${periodToGetPower} pathLength:${moveTime} spawnCreepTime:${spawnCreepTime} workTime:${workTime}`
            );
            if (periodToGetPower - moveTime - spawnCreepTime - workTime < 0) return;
            validatedPowerBanks.push(powerBankMemory);
            powerBankMemory.originRoomName = mainRoom.name;
            powerBankMemory.moveTime = moveTime;
        });
    });

    if (validatedPowerBanks.length > 0) {
        const powerBankMemory = validatedPowerBanks.reduce(
            (a, b) => (a.amount - b.amount > 0 ? a : b),
            validatedPowerBanks[0]
        );
        powerBankMemory.isInMyAttack = true;
        startGetPower(powerBankMemory);
        status.getPower = true;
        console.log(`${mainRoom.name} start getPower in ${powerBankMemory.roomName}`);
    }
}
