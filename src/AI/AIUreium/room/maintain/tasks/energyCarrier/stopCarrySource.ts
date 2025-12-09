import { FlagMaintainer } from "frame/flagMaintainer";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomTaskObject } from "../../type";
import { energyCarryGroupName } from "../createCreepGroup/createEnergyCarryGroup";

export const stopCarrySource: maintainRoomTaskObject = {
    name: "stopCarrySource",
    description: "stopCarrySource",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "container"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepGroupName = energyCarryGroupName(room.name);

        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.setCreepProperties({ creepName, roomName, readyCondition: "notLoop" });
        }); // 暂停所有CarrySource creep

        return "end";
    },
    justFinished() {
        return "end";
    }
};
