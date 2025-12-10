import { logManager } from "utils/log4screeps";
import { addCarryTask, getCarryTask } from "../roomCarry";

const logger = logManager.createLogger("debug", "fillLabEnergy");
export function fillLabEnergy(room: Room) {
    const taskName = `fillLabEnergy`;
    if (!room.storage) return;
    if (room.storage.store[RESOURCE_ENERGY] < 10e3) return;
    const labs: StructureLab[] = room
        .find(FIND_MY_STRUCTURES)
        .filter<StructureLab>((i): i is StructureLab => i.structureType === "lab" && i.store.energy < 1500);
    if (labs.length === 0) return;
    logger.log(`${room.name} fill lab energy`);
    const task = getCarryTask(room.name, "carrier", taskName);
    if (!task || task.status === "end") {
        addCarryTask(room.name, "carrier", {
            name: taskName,
            from: [room.storage.id],
            to: labs.map(i => i.id),
            resources: [RESOURCE_ENERGY],
            priority: 8,
            amounts: [_.sum(labs.map(i => i.store.getFreeCapacity("energy")))]
        });
    }
}
