import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskArgs } from "../../type";

export const fillSpawn: TaskObject<maintainRoomTaskArgs> = {
    name: "fillSpawn",
    description: "fillSpawn",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        // const routeName = `${room.name}fillSpawn`;
        const creepGroupName = `${room.name}fs`;
        // const storageFlagName = FlagTools.getName(room.name, "storage", 0);
        // const storagePosStr = PosStr.setPosToStr(Game.flags[storageFlagName].pos);
        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.setCreepProperties({ creepName, roomName: room.name, priority: "13" });
        }); // 提高该creep的优先级

        // RoutePlan.create({ routeName, ifLoop: "true" });
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "spawnFiller",
            projectName: maintainRoomProjectName
        });

        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepTimeToLive",
        //     jumpTo: 3,
        //     conditionArgs: `<=,20`
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepStore",
        //     jumpTo: 2,
        //     conditionArgs: `full`
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 1,
        //     doWhenArrive: "withdrawEnergy"
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "spawnEnergy",
        //     jumpTo: 2,
        //     conditionArgs: `full`
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 1,
        //     doWhenArrive: "fillSpawnAndExtension"
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "store",
        //     jumpTo: 3,
        //     conditionArgs: `${storagePosStr},energy,>=,2000`
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepStore",
        //     jumpTo: 2,
        //     conditionArgs: `notFull`
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 50,
        //     doWhenArrive: "stayByRoad"
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepStore",
        //     jumpTo: 2,
        //     conditionArgs: `empty`
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepStore",
        //     jumpTo: 2,
        //     conditionArgs: `full`
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 50,
        //     doWhenArrive: "fillTower"
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 50,
        //     doWhenArrive: "stayByRoad"
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 50,
        //     doWhenArrive: "pause"
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepTimeToLive",
        //     jumpTo: 2,
        //     conditionArgs: `<=,20`
        // });
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "alwaysJump",
        //     jumpTo: "front"
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 1,
        //     doWhenArrive: "transferEnergy"
        // });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
