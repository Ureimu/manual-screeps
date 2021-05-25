import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../taskRelation";

export const createHarvestGroup: TaskObject<RoomTaskArgs> = {
    name: "createHarvestGroup",
    description: "createHarvestGroup",
    start() {
        return "end";
    },
    working(room) {
        const sources = room.find(FIND_SOURCES);
        for (let index = 0; index < sources.length; index++) {
            const creepName = `${room.name}h${index}`;
            const routeName = `${room.name}h${index}`;
            SpawnPool.addCreep({
                creepName,
                creepBody: "harvester",
                priority: "10",
                roomName: room.name,
                readyCondition: "loop"
            });
            CreepGroup.create({ routeName, creepGroupName: routeName });
            CreepGroup.addCreep({ creepName, creepGroupName: routeName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
