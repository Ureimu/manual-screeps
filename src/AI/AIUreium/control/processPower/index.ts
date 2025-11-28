import { logManager } from "utils/log4screeps";
import { getRoomControlData } from "..";
import { addCarryTask, getCarryTask } from "../roomCarry";

const logger = logManager.createLogger("debug", "processPower");
export function processPower(room: Room) {
    const control = getRoomControlData(room.name).processPower;
    if (!control.run) return;
    const taskName = `processPower`;
    if (!room.storage) return;
    const powerSpawn: StructurePowerSpawn = room
        .find(FIND_MY_STRUCTURES)
        .filter<StructurePowerSpawn>((i): i is StructurePowerSpawn => i.structureType === "powerSpawn")?.[0];
    if (!powerSpawn) return;
    if (
        room.storage.store[RESOURCE_ENERGY] < control.energyLimit ||
        room.storage.store[RESOURCE_POWER] < control.powerLimit
    )
        return;
    if (powerSpawn.store[RESOURCE_ENERGY] > 1e3 && powerSpawn.store[RESOURCE_POWER] > 20) return;
    logger.log(`${room.name} process power`);
    const task = getCarryTask(room.name, "carrier", taskName);
    if (!task || task.status === "end") {
        addCarryTask(room.name, "carrier", {
            name: taskName,
            from: [room.storage.id],
            to: [powerSpawn.id],
            resources: [RESOURCE_ENERGY, RESOURCE_POWER],
            priority: 10,
            amounts: [
                powerSpawn.store.getFreeCapacity(RESOURCE_ENERGY),
                powerSpawn.store.getFreeCapacity(RESOURCE_POWER)
            ]
        });
    }
}
