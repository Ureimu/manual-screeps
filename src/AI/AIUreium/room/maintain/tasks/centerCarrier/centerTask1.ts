import { resourceLimit } from "AI/AIUreium/mainControl/constants/roomResource";
import { getLink } from "AI/AIUreium/structure/link";
import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { newAcrossTickTask } from "utils/AcrossTick";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomTaskArgs } from "../../taskRelation";
if (!global.AcrossTickTaskFunction) global.AcrossTickTaskFunction = {};
global.AcrossTickTaskFunction.centerTask1 = task => {
    const [roomNameArg, creepGroupNameArg, route1NameArg, route2NameArg] = task.args as string[];
    const roomArg = Game.rooms[roomNameArg];
    if (!roomArg.storage) return "finish";
    const creepGroupMemory = Memory.creepGroups[creepGroupNameArg];
    if (creepGroupMemory.mode === "route") {
        if (creepGroupMemory.routeName !== route1NameArg && creepGroupMemory.routeName !== route2NameArg) {
            CreepGroup.setCreepGroupProperties({ creepGroupName: creepGroupNameArg, routeName: route2NameArg });
        }

        if (
            roomArg.storage.store.energy > resourceLimit.storage.energy.max &&
            creepGroupMemory.routeName !== route1NameArg
        ) {
            CreepGroup.setCreepGroupProperties({ creepGroupName: creepGroupNameArg, routeName: route1NameArg });
        } else if (
            roomArg.storage.store.energy < resourceLimit.storage.energy.min &&
            creepGroupMemory.routeName !== route2NameArg
        ) {
            CreepGroup.setCreepGroupProperties({ creepGroupName: creepGroupNameArg, routeName: route2NameArg });
        }
    }

    return "runAgain";
};

export const centerTask1: TaskObject<maintainRoomTaskArgs> = {
    name: "centerTask1",
    description: "center creep carry source from storage to link",
    start(roomName) {
        const room = Game.rooms[roomName];
        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "link"])
        });
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        if (!room.memory.construct.centerPos) throw new Error("没有centerPos!");
        const centerPos = PosStr.getPosFromStr(room.memory.construct.centerPos);

        const route1Name = `${room.name}centerTask1ToLink`;
        const creepGroupName = `${room.name}CenterCarry`;
        const storageFlagName = FlagTools.getName(room.name, "storage", 0);
        const centerLinkFlagName = centerPos.findInRange(FIND_FLAGS, 1).filter(i => i.name.includes("link"))[0]?.name;
        if (!centerLinkFlagName) return "running";
        const sourceLinks = getLink(room, "sourceLink");
        const sourceLinkFlagNameList = sourceLinks.map(sourceLink => {
            return sourceLink.pos.lookFor(LOOK_FLAGS)[0].name;
        });
        RoutePlan.create({ routeName: route1Name, ifLoop: "true" });
        RoutePlan.addCondition({
            routeName: route1Name,
            condition: "creepStore",
            jumpTo: 3,
            conditionArgs: `full`
        });
        RoutePlan.addCondition({
            routeName: route1Name,
            condition: "store",
            jumpTo: 2,
            conditionArgs: `${PosStr.setPosToStr(Game.flags[storageFlagName].pos)},${RESOURCE_ENERGY},<=,${
                resourceLimit.storage.energy.min
            }`
        });
        sourceLinkFlagNameList.forEach(flagName => {
            RoutePlan.addCondition({
                routeName: route1Name,
                condition: "store",
                jumpTo: "end",
                conditionArgs: `${PosStr.setPosToStr(Game.flags[flagName].pos)},${RESOURCE_ENERGY},>=,${700}`
            });
        });
        RoutePlan.addMidpoint({
            routeName: route1Name,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy",
            actionArgs: "true"
        });
        const maxEnergyNum = 750;
        RoutePlan.addCondition({
            routeName: route1Name,
            condition: "store",
            jumpTo: 2,
            conditionArgs: `${PosStr.setPosToStr(
                Game.flags[centerLinkFlagName].pos
            )},${RESOURCE_ENERGY},>=,${maxEnergyNum}`
        });
        RoutePlan.addMidpoint({
            routeName: route1Name,
            pathMidpointPos: centerLinkFlagName,
            range: 1,
            doWhenArrive: "transferEnergy"
        });
        RoutePlan.addMidpoint({
            routeName: route1Name,
            pathMidpointPos: centerLinkFlagName,
            range: 50,
            doWhenArrive: "pause"
        });

        const route2Name = `${room.name}centerTask1ToStorage`;
        RoutePlan.create({ routeName: route2Name, ifLoop: "true" });
        RoutePlan.addCondition({
            routeName: route2Name,
            condition: "creepStore",
            jumpTo: 2,
            conditionArgs: `full`
        });
        RoutePlan.addMidpoint({
            routeName: route2Name,
            pathMidpointPos: centerLinkFlagName,
            range: 1,
            doWhenArrive: "withdrawEnergy",
            actionArgs: "true"
        });
        RoutePlan.addMidpoint({
            routeName: route2Name,
            pathMidpointPos: storageFlagName,
            range: 1,
            doWhenArrive: "transferEnergy"
        });
        RoutePlan.addMidpoint({
            routeName: route2Name,
            pathMidpointPos: storageFlagName,
            range: 50,
            doWhenArrive: "pause"
        });

        newAcrossTickTask(
            {
                taskName: "centerTask1",
                args: [room.name, creepGroupName, route1Name, route2Name],
                executeTick: Game.time + 1,
                intervalTick: 5,
                log: false
            },
            global.AcrossTickTaskFunction.centerTask1
        );

        return "end";
    },
    justFinished() {
        return "end";
    }
};
