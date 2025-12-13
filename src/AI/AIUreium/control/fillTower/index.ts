import { logManager } from "utils/log4screeps";
import { getRoomConfig } from "../../config";
import { addCarryTask, getCarryTask } from "../roomCarry";

const logger = logManager.createLogger("debug", "fillTower");
export function fillTower(room: Room) {
    const taskName = `fillTower`;
    if (!room.storage) return;
    if (room.storage.store[RESOURCE_ENERGY] < 10e3) return;
    const towers: StructureTower[] = room
        .find(FIND_MY_STRUCTURES)
        .filter<StructureTower>((i): i is StructureTower => i.structureType === "tower" && i.store.energy < 200);
    if (towers.length === 0) return;
    logger.log(`${room.name} fill tower`);
    const task = getCarryTask(room.name, "carrier", taskName);
    if (!task || task.status === "end") {
        addCarryTask({
            roleName: "carrier",
            roomName: room.name,
            name: taskName,
            from: [room.storage.id],
            to: towers.map(i => i.id),
            resources: [RESOURCE_ENERGY],
            priority: 15,
            amounts: [_.sum(towers.map(i => i.store.getFreeCapacity("energy")))]
        });
    }
}
