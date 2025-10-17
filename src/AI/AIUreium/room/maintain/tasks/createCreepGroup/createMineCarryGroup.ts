import { CreepGroup } from "frame/creep/group";
import { FlagMaintainer } from "frame/flagMaintainer";
import { FlagTools } from "frame/flagMaintainer/tools";
import { SpawnPool } from "frame/spawn/spawnPool";
import { TaskObject } from "utils/Project";
import { PosStr } from "utils/RoomPositionToStr";
import { maintainRoomTaskArgs } from "../../taskRelation";

export const MineCarryGroupName = (roomName: string): string => `${roomName}cm`;
export const createMineCarryGroup: TaskObject<maintainRoomTaskArgs> = {
    name: "createMineCarryGroup",
    description: "createMineCarryGroup",
    start() {
        return "end";
    },
    working(roomName) {
        const room = Game.rooms[roomName];
        const creepName = MineCarryGroupName(roomName);
        const creepGroupName = MineCarryGroupName(roomName);
        SpawnPool.addCreep({
            creepName,
            creepBody: "carrier",
            priority: "3",
            roomName: room.name,
            readyCondition: "shift",
            subCond: "mineralMiner"
        });

        FlagMaintainer.refresh({
            roomName: room.name,
            typeList: FlagMaintainer.getTypeList(["container", "containerConstructionSite", "mineral"])
        });
        const mineralFlagName = FlagTools.getName(roomName, "mineral", 0);

        const containerFlagName = Game.flags[mineralFlagName].pos.findInRange(FIND_FLAGS, 1, {
            filter: i => i.name.indexOf("container") !== -1 && i.name.indexOf("ConstructionSite") === -1
        })[0]?.name;
        if (!containerFlagName) return "running";
        CreepGroup.create({
            creepGroupName,
            mode: "role",
            groupArguments: `${PosStr.setPosToStr(Game.flags[containerFlagName].pos)}`
        });
        CreepGroup.addCreep({ creepName, creepGroupName });
        CreepGroup.setCreepGroupProperties({ creepGroupName, mode: "role", roleName: "mineralCarrier" });
        return "end";
    },
    justFinished() {
        return "end";
    }
};
