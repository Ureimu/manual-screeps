import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { SpawnPool } from "spawn/spawnPool";
import { TaskObject } from "utils/ProjectRunner";
import { RoomTaskArgs } from "../../taskRelation";

export const fillSpawn: TaskObject<RoomTaskArgs> = {
    name: "fillSpawn",
    description: "fillSpawn",
    start(room) {
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage"])
        });
        return "end";
    },
    working(room) {
        const routeName = `${room.name}fillSpawn`;
        const creepGroupName = `${room.name}fs`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.setCreepProperties({ creepName, roomName: room.name, priority: "13" });
        }); // 提高该creep的优先级

        RoutePlan.create({ routeName, ifLoop: "true" });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });

        RoutePlan.addCondition({
            routeName,
            condition: "creepTimeToLive",
            jumpTo: 3,
            conditionArgs: `<=,20`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "fillSpawnAndExtension"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `empty`
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `full`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "fillTower"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "pause"
        });
        RoutePlan.addCondition({
            routeName,
            condition: "creepTimeToLive",
            jumpTo: 2,
            conditionArgs: `<=,20`
        });
        RoutePlan.addCondition({
            routeName,
            condition: "alwaysJump",
            jumpTo: "front"
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "transferEnergy"
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
