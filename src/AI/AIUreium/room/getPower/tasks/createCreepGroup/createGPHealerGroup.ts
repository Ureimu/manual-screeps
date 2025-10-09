import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../../taskRelation";

export const getGPHealerGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gph-${powerBankRoomName}-${powerBankId}`;

export const createGPHealerGroup: TaskObject<getPowerTaskArgs> = {
    name: "createGPHealerGroup",
    description: "createGPHealerGroup",
    start() {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const creepGroupName = getGPHealerGroupName(roomName, powerBankRoomName, powerBankId);
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${roomName},${powerBankRoomName},${powerBankId}`
        });
        for (let index = 0; index < 4; index++) {
            createNewCreep(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "gpHealer" });
        return "end";
    },
    justFinished() {
        return "end";
    }
};

function createNewCreep(room: Room, creepGroupName: string, index: number) {
    const creepName = `${creepGroupName}-${index}`;
    SpawnPool.addCreep({
        creepName,
        creepBody: "gpHealer",
        priority: `${4.95 - index * 0.1}`,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "gpWorker"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
