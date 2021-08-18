import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const startCarryMineral: TaskObject<maintainRoomTaskArgs> = {
    name: "startCarryMineral",
    description: "startCarryMineral",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "container"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const mineral = room.find(FIND_MINERALS)[0];
        const routeName = `${room.name}startCarryMineral`;
        const creepGroupName = `${room.name}c`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            SpawnPool.setCreepProperties({ creepName, roomName, readyCondition: "loop" });
        }); // 开始所有CarrySource creep
        RoutePlan.create({ routeName, ifLoop: "true" });

        const mineralFlagName = FlagTools.getName(room.name, "mineral", 0);
        const containerFlagName = Game.flags[mineralFlagName].pos.findInRange(FIND_FLAGS, 1, {
            filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        })[0].name;
        RoutePlan.addCondition({
            routeName,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `full`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 1,
            doWhenArrive: "withdraw",
            actionArgs: `${mineral.mineralType},true`
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "transfer",
            actionArgs: mineral.mineralType
        });
        RoutePlan.addMidpoint({
            routeName,
            pathMidpointPos: containerFlagName,
            range: 50,
            doWhenArrive: "pause"
        });
        CreepGroup.setCreepGroupProperties({ creepGroupName, routeName });
        return "end";
    },
    justFinished() {
        return "end";
    }
};
