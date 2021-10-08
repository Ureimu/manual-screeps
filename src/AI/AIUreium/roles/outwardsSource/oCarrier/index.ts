import { resourceLimit } from "AI/AIUreium/mainControl/constants/roomResource";
import { runLayout } from "frame/construct";

import { getMyStructuresById, getStructureIdList } from "frame/construct/utils";
import { PosStr } from "utils/RoomPositionToStr";

export function oCarrier1(creep: Creep, args: string[]): void {
    const [originRoomName, sourceRoomName, sourceName] = args;
    const sourceRoomIdList = getStructureIdList(creep, sourceRoomName, {
        sourceContainer: {
            filter: ({ pos }) => {
                const { x, y } = PosStr.parseCoord(pos);
                return Game.flags[sourceName].pos.inRangeTo(x, y, 1);
            }
        }
    });

    if (creep.store.getFreeCapacity() !== 0) {
        const sourceContainerData = sourceRoomIdList.sourceContainer;
        if (!sourceContainerData || !sourceContainerData[0]) {
            // console.log(sourceRoomName);
            if (Game.rooms[sourceRoomName] && Game.time % 100 === 0) {
                // console.log(sourceRoomName);
                runLayout(Game.rooms[sourceRoomName]);
            }
            return;
        }
        const sourceContainerPos = PosStr.getPosFromStr(sourceContainerData[0].pos);
        if (!creep.pos.isNearTo(sourceContainerPos)) {
            creep.moveTo(sourceContainerPos, { range: 1 });
        } else {
            const container = Game.getObjectById(sourceContainerData[0].id);
            if (!container) return;
            const containerEnergy = container.store.energy;
            if (containerEnergy >= creep.store.getFreeCapacity() || containerEnergy > 2000) {
                creep.withdraw(container, "energy");
            }
        }
    } else {
        const originRoom = Game.rooms[originRoomName];
        if (!originRoom.storage) return;
        const maxEnergyNum = resourceLimit.storage.energy.max * 0.98;
        if (originRoom.storage.store.energy > maxEnergyNum) return;
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
    if (!roomSourcesMemory) return;
    roomSourcesMemory[sourceName].roomData[originRoomName].harvestedEnergyNum += energyNum;
}
