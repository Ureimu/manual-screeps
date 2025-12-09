import { CreepGroup } from "frame/creep/group";
import { FlagMaintainer } from "frame/flagMaintainer";
import { OCarryGroupCreepName } from "../createCreepGroup/createOCarryGroup";
import { outwardsSourceProjectName, outwardsSourceTaskObject } from "../../type";

export const oCarrySourceToStorage: outwardsSourceTaskObject = {
    name: "oCarrySourceToStorage",
    description: "oCarrySourceToStorage",
    start(roomName, sourceRoomName, sourceName) {
        const room = Game.rooms[roomName];
        const sourceRoom = Game.rooms[sourceRoomName];
        if (!room || !sourceRoom) return "running";
        FlagMaintainer.refresh({
            roomName,
            typeList: FlagMaintainer.getTypeList(["storage"])
        });
        FlagMaintainer.refresh({
            roomName: sourceRoomName,
            typeList: FlagMaintainer.getTypeList(["container"])
        });
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const room = Game.rooms[roomName];
        const creepGroupName = OCarryGroupCreepName(roomName, sourceName);
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "oCarrier1",
            projectName: outwardsSourceProjectName
        });

        // const routeName = `${roomName}oCarrySourceToStorage${sourceName}`;
        // const creepGroupName = OCarryGroupCreepName(roomName, sourceName);
        // const storageFlagName = FlagTools.getName(room.name, "storage", 0);

        // const creepBody = Memory.creepBodyConfig[creepGroupName][0]?.body;
        // if (!creepBody) throw new Error("creep body 不存在");
        // const carryNum = bodyTools.getNum(creepBody, ["carry"]);

        // RoutePlan.create({ routeName, ifLoop: "true" });
        // CreepGroup.setCreepGroupProperties({ creepGroupName, routeName, projectName: outwardsSourceProjectName });
        // const containerFlagName = Game.flags[sourceName].pos.findInRange(FIND_FLAGS, 1, {
        //     filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        // })[0].name;
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "creepStore",
        //     jumpTo: 3,
        //     conditionArgs: `full`
        // });

        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: containerFlagName,
        //     range: 1,
        //     doWhenArrive: "withdrawEnergy",
        //     actionArgs: "true"
        // });

        // const resourceLimit = getRoomResourceLimit(room.name);
        // const maxEnergyNum = resourceLimit.storage.energy.max * 0.98;
        // RoutePlan.addCondition({
        //     routeName,
        //     condition: "store",
        //     jumpTo: 2,
        //     conditionArgs: `${PosStr.setPosToStr(
        //         Game.flags[storageFlagName].pos
        //     )},${RESOURCE_ENERGY},>=,${maxEnergyNum}`
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 1,
        //     doWhenArrive: "transferEnergy"
        // });
        // RoutePlan.addMidpoint({
        //     routeName,
        //     pathMidpointPos: storageFlagName,
        //     range: 50,
        //     doWhenArrive: "pause"
        // });

        return "end";
    }
};
