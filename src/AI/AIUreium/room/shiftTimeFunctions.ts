import { addShiftTimeFunction } from "frame/spawn/spawning/readyCondition/spawnShiftCreep";
import { numData } from "frame/spawn/spawning/readyCondition/utils/numData";
import { getMaintainRoomProject } from "./maintain/taskRelation";
import { getCenterCarrierCreepName } from "./maintain/tasks/createCreepGroup/createCenterCarryGroup";
import { upgradeByLink } from "./maintain/tasks/upgrader/upgradeByLink";

// 把所有shift设置放在一个文件而不是分散在对应位置的原因是，
// 在对应位置进行函数编写很容易出现循环引用，不太好。
export function mountShiftTimeFunction() {
    addShiftTimeFunction("upgrader", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;

        const project = getMaintainRoomProject(roomName);
        if (project.diagram.diagramDict[upgradeByLink.name].state !== "end") {
            return true;
        }

        const centerCarrierMemory = Memory.creeps[getCenterCarrierCreepName(roomName, 0)];
        if (!centerCarrierMemory) return false;

        const centerCarrierLinkState = centerCarrierMemory.centerCarrierLinkState;
        if (!centerCarrierLinkState) return false;

        return true;
    });

    addShiftTimeFunction("mineralMiner", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        const roomName = detail.roomName;
        const room = Game.rooms[roomName];
        if (!room) return false;
        const flagName = `${roomName}mineral0`;
        const flag = Game.flags[flagName];
        if (!flag) return false;
        const mineral = flag.pos.lookFor(LOOK_MINERALS)[0];
        if (!mineral) return false;
        if (mineral.ticksToRegeneration > 0) return false;

        return true;
    });

    addShiftTimeFunction("gpWorker", detail => {
        const data = numData(detail);
        if (!(data.aliveNum === 0 && data.queueNum === 0 && data.deadNum === 1)) return false;

        if (detail.spawnCount > 0) return false;
        return true;
    });
}
