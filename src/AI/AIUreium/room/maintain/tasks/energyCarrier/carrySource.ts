import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomProjectName, maintainRoomTaskArgs } from "../../type";
import { energyCarryGroupName } from "../createCreepGroup/createEnergyCarryGroup";

export const carrySource: TaskObject<maintainRoomTaskArgs, maintainRoomTaskArgs> = {
    name: "carrySource",
    description: "carrySource",
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
        const sources = room.find(FIND_SOURCES);

        const routeName = `${room.name}carrySource`;
        const creepGroupName = energyCarryGroupName(room.name);
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        Memory.creepGroups[creepGroupName].creepNameList.forEach((creepName, index) => {
            if (index > 0) {
                CreepGroup.deleteCreep({ creepName, creepGroupName });
                SpawnPool.deleteCreep({ creepName, roomName: room.name });
            }
        }); // 只留一个creep

        RoutePlan.create({ routeName, ifLoop: "true" });
        for (let index = 0; index < sources.length; index++) {
            const sourceFlagName = FlagTools.getName(room.name, "source", index);
            const containerFlagName = Game.flags[sourceFlagName].pos.findInRange(FIND_FLAGS, 1, {
                filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
            })[0].name;
            RoutePlan.addCondition({
                routeName,
                condition: "creepStore",
                jumpTo: 3,
                conditionArgs: `full`
            });
            RoutePlan.addCondition({
                routeName,
                condition: "store",
                jumpTo: 2,
                conditionArgs: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)},${RESOURCE_ENERGY},<=,700`
            });
            RoutePlan.addMidpoint({
                routeName,
                pathMidpointPos: containerFlagName,
                range: 1,
                doWhenArrive: "withdrawEnergy",
                actionArgs: "true"
            });
            CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: maintainRoomProjectName });
            if (index === sources.length - 1) {
                const maxEnergyNum = 5e5;
                RoutePlan.addCondition({
                    routeName,
                    condition: "store",
                    jumpTo: 2,
                    conditionArgs: `${PosStr.setPosToStr(
                        Game.flags[containerFlagName].pos
                    )},${RESOURCE_ENERGY},>=,${maxEnergyNum}`
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: storageFlagName,
                    range: 1,
                    doWhenArrive: "transferEnergy"
                });
                RoutePlan.addMidpoint({
                    routeName,
                    pathMidpointPos: containerFlagName,
                    range: 50,
                    doWhenArrive: "pause"
                });
            }
        }

        return "end";
    },
    justFinished() {
        return "end";
    }
};
