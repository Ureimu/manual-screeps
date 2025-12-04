import { stopProjectCreeps } from "frame/utils";
import { getOutwardsHarvestProject } from "./taskRelation";
import { outwardsSourceProjectName, outwardsSourceTaskArgs } from "./type";

export function stopOutwardsSource(...args: outwardsSourceTaskArgs): void {
    const [originRoomName, sourceRoomName, sourceName] = args;

    const projectName = outwardsSourceProjectName;
    stopProjectCreeps(originRoomName, projectName);

    getOutwardsHarvestProject(originRoomName, sourceRoomName, sourceName).stop();
}
