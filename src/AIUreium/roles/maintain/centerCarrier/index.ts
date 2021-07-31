import { FlagMaintainer } from "flagMaintainer";
import { FlagTools } from "flagMaintainer/tools";
import { PosStr } from "utils/RoomPositionToStr";

export function centerCarrier(creep: Creep): void {
    const storageFlagName = FlagTools.getName(creep.room.name, "storage", 0);
    if (!Game.flags[storageFlagName]) {
        FlagMaintainer.refresh({
            roomName: creep.room.name,
            typeList: FlagMaintainer.getTypeList(["storage", "terminal", "factory", "link"])
        });
        return;
    }
    const storageFlag = Game.flags[storageFlagName];
    const storage = creep.room.storage;
    const terminal = creep.room.terminal;

    const centerPosStr = creep.room.memory.construct.centerPos;
    if (!storage || !centerPosStr || !creep.room.memory.construct.construction.link?.centerLink.hasBuilt) return;
    const centerPos = PosStr.getPosFromStr(centerPosStr);
    const centerLink = creep.pos
        .findInRange(FIND_STRUCTURES, 1)
        .filter(i => i.structureType === "link")[0] as StructureLink;
    if (!creep.pos.isEqualTo(centerPos)) {
        creep.moveTo(centerPos);
    } else {
        if (creep.store.getUsedCapacity() === 0) {
            if (centerLink.store.getFreeCapacity("energy") > 100) {
                creep.withdraw(storage, "energy");
                creep.transfer(centerLink, "energy");
            }
        }
    }
}
