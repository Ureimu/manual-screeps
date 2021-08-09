import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const createHarvestGroup: TaskObject<maintainRoomTaskArgs> = {
    name: "createHarvestGroup",
    description: "createHarvestGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const sources = room.find(FIND_SOURCES);
        for (let index = 0; index < sources.length; index++) {
            const creepName = `${room.name}h${index}`;
            const creepGroupName = `${room.name}h${index}`;
            SpawnPool.addCreep({
                creepName,
                creepBody: "harvester",
                priority: "10",
                roomName: room.name,
                readyCondition: "loop"
            });
            CreepGroup.create({ creepGroupName, mode: "route" });
            CreepGroup.addCreep({ creepName, creepGroupName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
