import { CreepBody } from "frame/creep/body";
import { bodyTools } from "frame/creep/body/tools";
import { ControllerLevels } from "frame/creep/body/type";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { MAX_ENERGY_PER_CONTROLLER_LEVEL } from "utils/constants";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
export const OCarryGroupCreepName = (roomName: string, sourceName: string): string => `${roomName}oc${sourceName}`;
export const createOCarryGroup: TaskObject<outwardsSourceTaskArgs> = {
    name: "createOCarryGroup",
    description: "createOCarryGroup",
    start() {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const sourceData = Memory.rooms[sourceRoomName].sources?.[sourceName]?.roomData[roomName];
        if (!sourceData) return "running";
        const pathLength = sourceData.pathLength;
        if (pathLength === 0) {
            console.log("sourceData.pathLength should not be zero");
            return "running";
        }

        const creepName = OCarryGroupCreepName(roomName, sourceName);
        const creepGroupName = OCarryGroupCreepName(roomName, sourceName);
        CreepBody.createConfig({ creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(false, false)}` });
        CreepBody.createConfig({ creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(false, true)}` });
        CreepBody.createConfig({ creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(true, false)}` });
        CreepBody.createConfig({ creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(true, true)}` });

        // 按照有无reserver，有无road分开考虑。

        const nRatios = getOCarrierBodyRatio(false, false);
        const rRatios = getOCarrierBodyRatio(false, true);
        const pRatios = getOCarrierBodyRatio(true, false);
        const rpRatios = getOCarrierBodyRatio(true, true);
        for (let index = 2; index <= 8; index++) {
            CreepBody.setConfig({
                creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(false, false)}`,
                controllerLevel: String(index) as ControllerLevels,
                creepBodyConfig: getOCarrierBody(pathLength, index, nRatios)
            });
            CreepBody.setConfig({
                creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(false, true)}`,
                controllerLevel: String(index) as ControllerLevels,
                creepBodyConfig: getOCarrierBody(pathLength, index, rRatios)
            });
            CreepBody.setConfig({
                creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(true, false)}`,
                controllerLevel: String(index) as ControllerLevels,
                creepBodyConfig: getOCarrierBody(pathLength, index, pRatios)
            });
            CreepBody.setConfig({
                creepBodyConfigName: `${creepName}-${getOCarrierBodySuffix(true, true)}`,
                controllerLevel: String(index) as ControllerLevels,
                creepBodyConfig: getOCarrierBody(pathLength, index, rpRatios)
            });
        }

        SpawnPool.addCreep({
            creepName,
            creepBody: `${creepName}-${getOCarrierBodySuffix(false, false)}`,
            priority: "2",
            roomName,
            readyCondition: "shift",
            subCond: "outwardsSourceWorker"
        });
        CreepGroup.create({
            creepGroupName,
            mode: "route",
            groupArguments: [roomName, sourceRoomName, sourceName].join(",")
        });
        CreepGroup.addCreep({ creepName, creepGroupName });

        return "end";
    },
    justFinished() {
        return "end";
    }
};

export function getOCarrierBodyRatio(useRoad: boolean, useReserver: boolean): { move: number; carry: number } {
    if (!useReserver && !useRoad) {
        // c 0.3 m 0.3
        return { carry: 0.3, move: 0.3 };
    } else if (useReserver && !useRoad) {
        // ratio is 0.4 for c&m
        return { carry: 0.4, move: 0.4 };
    } else if (!useReserver && useRoad) {
        // c 0.2 m 0.1
        return { carry: 0.2, move: 0.1 };
    } else if (useReserver && useRoad) {
        // c 0.4 m 0.2
        return { carry: 0.4, move: 0.2 };
    } else {
        throw new Error("how");
    }
}

export function getOCarrierBodySuffix(useRoad: boolean, useReserver: boolean): string {
    if (!useReserver && !useRoad) {
        return "n";
    } else if (useReserver && !useRoad) {
        return "r";
    } else if (!useReserver && useRoad) {
        return "p";
    } else if (useReserver && useRoad) {
        return "rp";
    } else {
        throw new Error("how");
    }
}

function getOCarrierBody(pathLength: number, controllerLevel: number, ratios: { move: number; carry: number }): string {
    let body: string;
    const biggestBody = `c${Math.ceil(pathLength * ratios.carry)}m${Math.ceil(pathLength * ratios.move)}`;
    const energy = bodyTools.getEnergyCost(biggestBody);
    const sumRatio = ratios.carry + ratios.move;
    if (energy > MAX_ENERGY_PER_CONTROLLER_LEVEL[controllerLevel]) {
        const bodySize = Math.floor(MAX_ENERGY_PER_CONTROLLER_LEVEL[controllerLevel] / 50);
        const movePartNum = Math.floor(bodySize * (ratios.move / sumRatio));
        const carryPartNum = Math.round(ratios.carry / ratios.move) * movePartNum;
        body = `c${carryPartNum}m${movePartNum}`;
    } else {
        body = biggestBody;
    }
    if (bodyTools.getNum(body) === 0) {
        return "";
    } else {
        return body;
    }
}
