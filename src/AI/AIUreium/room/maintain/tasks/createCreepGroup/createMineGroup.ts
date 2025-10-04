import { CreepGroup } from "frame/creep/group";
import { addShiftTimeFunction } from "frame/spawn/spawning/readyCondition/spawnShiftCreep";
import { numData } from "frame/spawn/spawning/readyCondition/utils/numData";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const MineGroupName = (roomName: string): string => `${roomName}mi`;
export const createMineGroup: TaskObject<maintainRoomTaskArgs> = {
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
            priority: "4",
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

addShiftTimeFunction("mineralMiner", detail => {
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
