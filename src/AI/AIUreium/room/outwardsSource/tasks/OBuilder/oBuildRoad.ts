import { CreepGroup } from "frame/creep/group";
import { outwardsSourceProjectName, outwardsSourceTaskObject } from "../../type";
import { OBuildGroupCreepName } from "../createCreepGroup/createOBuildGroup";

export const oBuildRoad: outwardsSourceTaskObject = {
    name: "oBuildRoad",
    description: "oBuildRoad",
    start(roomName, sourceRoomName, sourceName) {
        return "end";
    },
    working(roomName, sourceRoomName, sourceName) {
        const creepGroupName = OBuildGroupCreepName(roomName, sourceName);
        CreepGroup.setCreepGroupProperties({
            creepGroupName,
            mode: "role",
            roleName: "oBuilder",
            projectName: outwardsSourceProjectName
        });

        return "end";
    },
    justFinished() {
        return "end";
    }
};
