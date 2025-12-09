import { calcGetPowerSpawnTime } from "AI/AIUreium/control/getPower/calcSpawnTime";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { getPowerProjectName, getPowerTaskArgs } from "../../type";

export const getGPHealerGroupName = (roomName: string, powerBankRoomName: string, powerBankId: string) =>
    `${roomName}-gph-${powerBankRoomName}-${powerBankId}`;

export const createGPHealerGroup: TaskObject<getPowerTaskArgs, getPowerTaskArgs> = {
    name: "createGPHealerGroup",
    description: "createGPHealerGroup",
    start(roomName, powerBankRoomName, powerBankId) {
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
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "gpHealer",
            projectName: getPowerProjectName
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
