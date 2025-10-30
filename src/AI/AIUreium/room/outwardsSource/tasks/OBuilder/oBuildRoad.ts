import { CreepGroup } from "frame/creep/group";
import { TaskObject } from "utils/Project";
import { outwardsSourceTaskArgs } from "../../taskRelation";
import { OBuildGroupCreepName } from "../createCreepGroup/createOBuildGroup";

export const oBuildRoad: TaskObject<outwardsSourceTaskArgs> = {
    name: "oBuildRoad",
    description: "oBuildRoad",
    start(roomName, sourceRoomName, sourceName) {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const creepGroupName = OBuildGroupCreepName(roomName, sourceName);
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "oBuilder" });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
