import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { maintainRoomTaskObject } from "../../type";

export const createHarvestGroup: maintainRoomTaskObject = {
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
                priority: 10,
                roomName: room.name,
                readyCondition: "shift",
                subCond: "worker"
            });
            CreepGroup.create({ creepGroupName, mode: "route", groupArguments: "" });
            CreepGroup.addCreep({ creepName, creepGroupName });
        }
        return "end";
    },
    justFinished() {
        return "end";
    }
};
