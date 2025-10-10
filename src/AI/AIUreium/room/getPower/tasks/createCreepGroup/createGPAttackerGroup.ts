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
        // TODO 按顺序间隔150tick孵化creep，且孵化完当波次就暂停等待下个波次再继续孵化。
        // TODO 挖取时，healer移动到以attacker为中心的对称powerBank的位置，如果该位置不是空地，则回退到之前的逻辑。
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
