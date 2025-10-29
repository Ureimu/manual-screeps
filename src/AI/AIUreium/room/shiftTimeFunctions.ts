import { CreepGroupMemory, CreepGroupMode } from "frame/creep/group/type";
import { addShiftTimeFunction } from "frame/spawn/spawning/readyCondition/spawnShiftCreep";
import { numData } from "frame/spawn/spawning/readyCondition/utils/numData";
import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";
import { getRoomControlData } from "../control";
import { getMaintainRoomProject } from "./maintain/taskRelation";
import { getCenterCarrierCreepName } from "./maintain/tasks/createCreepGroup/createCenterCarryGroup";
import { upgradeByLink } from "./maintain/tasks/upgrader/upgradeByLink";

// 把所有shift设置放在一个文件而不是分散在对应位置的原因是，
// 在对应位置进行函数编写很容易出现循环引用，不太好。
export function mountShiftTimeFunction() {
    addShiftTimeFunction("upgrader", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;

        const project = getMaintainRoomProject(roomName);
        if (project.diagram.diagramDict[upgradeByLink.name].state !== "end") {
            return true;
        }

        const centerCarrierMemory = Memory.creeps[getCenterCarrierCreepName(roomName, 0)];
        if (!centerCarrierMemory) return false;

        const setting = getRoomControlData(roomName).upgradeController.run;
        if (setting === "loop") {
            return true;
        } else if (setting === "onControllerLinkWorks") {
            const centerCarrierLinkState = centerCarrierMemory.centerCarrierLinkState;
            if (!centerCarrierLinkState) return false;
        } else if (setting === "stop") {
            return false;
        }

        return true;
    });

    addShiftTimeFunction("mineralMiner", detail => {
        if (!getRoomControlData(detail.roomName)?.harvestMineral) return false;
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;
        const flagName = `${roomName}mineral0`;
        const flag = Game.flags[flagName];
        if (!flag) return false;
        const mineral = flag.pos.lookFor(LOOK_MINERALS)[0];
        if (!mineral) return false;
        if (mineral.ticksToRegeneration > 0) return false;

        return true;
    });

    addShiftTimeFunction("gpWorker", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        if (detail.spawnCount > 0) return false;
        return true;
    });

    addShiftTimeFunction("levelKeeper", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;
        const controller = room.controller;
        if (!controller) return false;

        if (controller.ticksToDowngrade > 5000) return false;

        return true;
    });

    addShiftTimeFunction("builder", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        if (constructionSites.length !== 0) return true;
        const containers = room.find(FIND_STRUCTURES, { filter: i => i.structureType === "container" && i.hits < 5e4 });
        if (containers.length !== 0) return true;
        return false;
    });

    addShiftTimeFunction("outwardsSourceWorker", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        if (checkInvaderCoreExist(detail)) return false;
        if (checkInvaderExist(detail)) return false;
        return true;
    });

    addShiftTimeFunction("outwardsSourceReserver", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        if (checkInvaderCoreExist(detail)) return false;
        if (checkInvaderExist(detail)) return false;
        const [roomName, sourceRoomName, sourceName] = getCreepGroupDetailBySpawnCreepDetail(detail).arguments;
        const reserveEndTime = Memory.rooms[sourceRoomName].controller?.reserveEndTime;
        if (reserveEndTime && reserveEndTime - Game.time > 1500) {
            return false;
        }
        return true;
    });
}

function checkInvaderCoreExist(detail: SpawnCreepDetail): boolean {
    if (getRoomControlData(detail.roomName)?.outwardsSource.invaderCoreStrategy === "stop") {
        const [roomName, sourceRoomName, sourceName] = getCreepGroupDetailBySpawnCreepDetail(detail).arguments;
        const coreData = Memory.rooms[sourceRoomName].invaderCores;
        if (coreData) {
            if (_.some(coreData, data => data.decayTime + 5000 > Game.time)) {
                return true;
            }
        }
        return false;
    }
    return false;
}

function checkInvaderExist(detail: SpawnCreepDetail): boolean {
    if (getRoomControlData(detail.roomName)?.outwardsSource.invaderStrategy === "stop") {
        const [roomName, sourceRoomName, sourceName] = getCreepGroupDetailBySpawnCreepDetail(detail).arguments;
        const invaderData = Memory.rooms[sourceRoomName].invaders;
        if (invaderData) {
            if (invaderData.decayTime > Game.time) {
                return true;
            }
        }
        return false;
    }
    return false;
}

function getCreepGroupDetailBySpawnCreepDetail(detail: SpawnCreepDetail): CreepGroupMemory<CreepGroupMode> {
    return Memory.creepGroups[Memory.creeps[detail.creepName].groupName];
}
