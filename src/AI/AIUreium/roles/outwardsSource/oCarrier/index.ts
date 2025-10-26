import { resourceLimit } from "AI/AIUreium/control/constants/roomResource";
import { runLayout } from "frame/construct";

import { getStructureIdList } from "frame/construct/utils";
import { logManager } from "utils/log4screeps";
import { PosStr } from "utils/RoomPositionToStr";
const logger = logManager.createLogger("debug", "oCarrier");

const creepMemory: {
    [name: string]: {
        containerId: Id<StructureContainer>;
        containerPosStr: string;
    };
} = {};
export function oCarrier1(creep: Creep, args: string[]): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    if (
        !creepMemory[creep.name] ||
        (Game.rooms[sourceRoomName] && !Game.getObjectById(creepMemory[creep.name].containerId))
    ) {
        if (Game.time % 100 === 0) {
            runLayout(Game.rooms[sourceRoomName]);
        }
    }

    if (!creepMemory[creep.name]) {
        const container = getContainer(originRoomName, sourceRoomName, sourceName);
        if (container) {
            creepMemory[creep.name] = { containerId: container.id, containerPosStr: PosStr.setPosToStr(container.pos) };
        } else {
            return;
        }
    }

    const containerId = creepMemory[creep.name].containerId;
    const containerPosStr = creepMemory[creep.name].containerPosStr;

    if (creep.store.getFreeCapacity() !== 0) {
        const sourceContainerPos = PosStr.getPosFromStr(containerPosStr);
        if (!creep.pos.isNearTo(sourceContainerPos)) {
            creep.moveTo(sourceContainerPos, { range: 1 });
        } else {
            const container = Game.getObjectById(containerId);
            if (!container) {
                logger.debug(`${creep.name} container not found with id ${containerId}`);
                return;
            }
            const containerEnergy = container.store.energy;
            if (containerEnergy >= creep.store.getFreeCapacity() || containerEnergy > 2000) {
                creep.withdraw(container, "energy");
            } else {
                const resource = container.pos.lookFor(LOOK_RESOURCES).find(i => i.resourceType === "energy");
                if (resource && (resource.amount >= creep.store.getFreeCapacity() || resource.amount > 2000)) {
                    creep.pickup(resource);
                }
            }
        }
    } else {
        const originRoom = Game.rooms[originRoomName];
        if (!originRoom.storage) {
            logger.debug(`${creep.name} no storage in origin room ${originRoomName}`);
            return;
        }
        const maxEnergyNum = resourceLimit.storage.energy.max * 1.3;
        if (originRoom.storage.store.energy > maxEnergyNum) {
            logger.debug(`${creep.name} storage energy exceeded limit in ${originRoomName}`);
            return;
        }
        if (!creep.pos.isNearTo(originRoom.storage.pos)) {
            creep.moveTo(originRoom.storage.pos, { range: 1 });
        } else {
            creep.transfer(originRoom.storage, "energy");
            recordEnergy(creep.store.energy, originRoomName, sourceRoomName, sourceName);
        }
    }
}

function recordEnergy(energyNum: number, originRoomName: string, sourceRoomName: string, sourceName: string) {
    const roomSourcesMemory = Memory.rooms[sourceRoomName].sources;
    if (!roomSourcesMemory) {
        logger.debug(`No sources memory for room ${sourceRoomName}`);
        return;
    }
    roomSourcesMemory[sourceName].roomData[originRoomName].harvestedEnergyNum += energyNum;
}

function getContainer(originRoomName: string, sourceRoomName: string, sourceName: string) {
    const sourceRoomMemory = Memory.rooms[sourceRoomName];
    const roomSourcesMemory = sourceRoomMemory.sources;
    if (!roomSourcesMemory) return;
    const sourceData = roomSourcesMemory[sourceName].roomData[originRoomName];
    if (!sourceData.path) return;
    const containerPosStr = sourceData.path[sourceData.path.length - 1];
    const containerPos = PosStr.getPosFromStr(containerPosStr);
    const sourceRoom = Game.rooms[sourceRoomName];
    if (!sourceRoom) return;
    const container = sourceRoom
        .lookForAt(LOOK_STRUCTURES, containerPos)
        .find<StructureContainer>((value): value is StructureContainer => value.structureType === "container");
    if (!container) return;
    return container;
}
