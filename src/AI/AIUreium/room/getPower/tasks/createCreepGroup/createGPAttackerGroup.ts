import { calcGetPowerSpawnTime } from "AI/AIUreium/control/getPower/calcSpawnTime";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerProjectName, getPowerTaskArgs } from "../../type";

export const getGPAttackerGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gpa-${powerBankRoomName}-${powerBankId}`;

export const createGPAttackerGroup: TaskObject<getPowerTaskArgs> = {
    name: "createGPAttackerGroup",
    description: "createGPAttackerGroup",
    start(roomName, powerBankRoomName, powerBankId) {
        return "end";
    },
    working(roomName, powerBankRoomName, powerBankId) {
        const room = Game.rooms[roomName];
        const creepGroupName = getGPAttackerGroupName(roomName, powerBankRoomName, powerBankId);
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${roomName},${powerBankRoomName},${powerBankId},${Game.time},0`
        });

        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "gpAttacker",
            projectName: getPowerProjectName
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
