import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomTaskObject } from "../../type";

export const MineGroupName = (roomName: string): string => `${roomName}mi`;
export const createMineGroup: maintainRoomTaskObject = {
    name: "createMineGroup",
    description: "createMineGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepName = MineGroupName(roomName);
        const creepGroupName = MineGroupName(roomName);
        SpawnPool.addCreep({
            creepName,
            creepBody: "miner",
            priority: 4,
            roomName: room.name,
            readyCondition: "shift",
            subCond: "mineralMiner"
        });
        CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
