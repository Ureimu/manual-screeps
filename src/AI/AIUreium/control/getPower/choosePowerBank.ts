import { startGetPower } from "AI/AIUreium/projects/getPower/start";
import { getCostMatrix } from "frame/construct/utils/costMatrix";
import { getRoomDistance } from "utils/roomNameUtils";
import { Constant } from "../constants/roomTaskControl";
import { getRoomConfig } from "../../config";
import { PowerBankData } from "../recordRoomData";
import { calcGetPowerSpawnTime } from "./calcSpawnTime";
import { logManager } from "utils/log4screeps";
import { canBoostGetPowerCreeps } from "./canBoostGetPowerCreeps";

const workTime = 1500;
const maxMoveTime = 500;
const logger = logManager.createLogger("debug", "ChoosePowerBank");

declare global {
    interface TaskStatus {
        getPower?: boolean;
    }
}

export const getPowerBodyCollection = {
    normal: {
        gpAttacker: "m20a20",
        gpHealer: "m25h25",
        gpCarrier: "m17c33"
    },

    boosted: {
        gpAttacker: "t5m25a20 t5b2 a20b2",
        gpHealer: "m19h19 h19b2",
        gpCarrier: "m17c33"
    }
};

export function choosePowerBank(mainRoom: Room): void {
    const taskControl = getRoomConfig(mainRoom.name).getPower;
    if (!taskControl) return;
    if (!taskControl.run) return;
    logger.info(`${mainRoom.name} choosePowerBank`);
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
    if (storage.store.energy < taskControl.lowestEnergyInStorage) return;
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
            if (powerBankMemory.amount < taskControl.minPowerInBank) return;
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

            const isBoosted = taskControl.useBoost
                ? canBoostGetPowerCreeps(mainRoom, getPowerBodyCollection["boosted"])
                : false;

            const spawnCreepTime = calcGetPowerSpawnTime(
                powerBankMemory.blankSpaceCount,
                isBoosted ? 1 : Constant.getPower.spawnAttackerCount
            );
            const neededTime = moveTime + spawnCreepTime + workTime;
            const ifChooseThisPowerBank = periodToGetPower > neededTime;
            logger.debug(
                `chosen:${Boolean(ifChooseThisPowerBank)} boosted:${Boolean(
                    isBoosted
                )} periodToGetPower:${periodToGetPower} ${
                    periodToGetPower > neededTime ? ">" : "<"
                } neededTime:${neededTime} = \npathLength:${moveTime} + spawnCreepTime:${spawnCreepTime} + workTime:${workTime}`
            );
            if (!ifChooseThisPowerBank) return;
            validatedPowerBanks.push(powerBankMemory);
            powerBankMemory.originRoomName = mainRoom.name;
            powerBankMemory.moveTime = moveTime;
            if (isBoosted) {
                powerBankMemory.boosted = true;
            }
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
        logger.info(`${mainRoom.name} start getPower in ${powerBankMemory.roomName}`);
    }
}
