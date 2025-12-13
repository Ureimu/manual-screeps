import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { logManager } from "utils/log4screeps";
import { getRoomControlData } from "../../settings";
import { addCarryTask, getCarryTask } from "../roomCarry";

const containerIdList: { [roomName: string]: Id<StructureContainer> } = {};

const logger = logManager.createLogger("debug", "carryMineral");
export function carryMineral(room: Room) {
    if (!getRoomControlData(room.name).harvestMineral) {
        return;
    }
    if (!containerIdList[room.name] || !Game.getObjectById(containerIdList[room.name])) {
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "mineral"])
        });
        const mineralFlagName = FlagTools.getName(room.name, "mineral", 0);

        const containerFlagName = Game.flags[mineralFlagName].pos.findInRange(FIND_FLAGS, 1, {
            filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        })[0]?.name;
        const flag = Game.flags[containerFlagName];
        if (!flag) return;
        const container = flag.pos
            .lookFor(LOOK_STRUCTURES)
            .filter((i): i is StructureContainer => i.structureType === "container")[0];
        if (!container) return;
        containerIdList[room.name] = container.id;
    }

    const mineralContainer = Game.getObjectById(containerIdList[room.name]);
    if (!mineralContainer) return;
    if (!room.storage) return;
    if (mineralContainer.store.getFreeCapacity() < 600) {
        const taskName = "carryMineral";
        const task = getCarryTask(room.name, "carrier", taskName);
        if (!task || task.status === "end") {
            logger.debug(`${room.name} carry minerals`);
            const validResources = Object.entries(mineralContainer.store).filter(i => i[1] > 0);
            const resources: ResourceConstant[] = validResources.map(i => i[0]) as ResourceConstant[];
            const amounts: number[] = validResources.map(i => i[1]);
            addCarryTask({
                roleName: "carrier",
                roomName: room.name,
                name: taskName,
                from: [mineralContainer.id],
                to: [room.storage.id],
                resources: resources,
                priority: 6,
                amounts: amounts
            });
        }
    }
}
