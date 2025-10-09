import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerTaskArgs } from "../../taskRelation";

export const getGPAttackerGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gpa-${powerBankRoomName}-${powerBankId}`;

export const createGPAttackerGroup: TaskObject<getPowerTaskArgs> = {
    name: "createGPAttackerGroup",
    description: "createGPAttackerGroup",
    start() {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const creepGroupName = getGPAttackerGroupName(roomName, powerBankRoomName, powerBankId);
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${roomName},${powerBankRoomName},${powerBankId}`
        });
        for (let index = 0; index < 4; index++) {
            createNewCreep(room, creepGroupName, index);
        }
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "gpAttacker" });
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
        creepBody: "gpAttacker",
        priority: `${5 - index * 0.1}`,
        roomName: room.name,
        readyCondition: "shift",
        subCond: "gpWorker"
    });
    CreepGroup.addCreep({ creepName, creepGroupName });
}
