import { PosStr } from "utils/RoomPositionToStr";

export function gpHealer(creep: Creep, args: string[]) {
    const [originRoomName, powerBankRoomName, powerBankId] = args;
    const getPowerData = Memory.rooms[powerBankRoomName]?.powerBanks?.[powerBankId];
    if (!getPowerData) return;
    const powerBankPos = new RoomPosition(getPowerData.x, getPowerData.y, getPowerData.roomName);
    if (!creep.pos.inRangeTo(powerBankPos, 15)) {
        creep.moveTo(powerBankPos);
        return;
    }
    const powerBank = Game.getObjectById(powerBankId as Id<StructurePowerBank>);
    if (creep.room.name === getPowerData.roomName && !powerBank) {
        creep.suicide();
    }
    const nameSplit = creep.name.split("-");
    nameSplit[1] = "gpa";
    const gpAttackerName = nameSplit.join("-");
    // console.log(gpAttackerName);
    const gpAttacker = Game.creeps[gpAttackerName];
    if (!gpAttacker) return;
    if (gpAttacker.pos.isNearTo(powerBankPos)) {
        const healPosStr = PosStr.getSymmetricPosStr(
            PosStr.setPosToStr(powerBankPos),
            PosStr.setPosToStr(gpAttacker.pos)
        );
        if (healPosStr) {
            const healPos = PosStr.getPosFromStr(healPosStr);
            if (creep.room.lookForAt(LOOK_TERRAIN, healPos)[0] !== "wall") {
                if (!creep.pos.isEqualTo(healPos)) {
                    creep.moveTo(healPos, { range: 0 });
                    return;
                }
            }
        }
        if (!creep.pos.inRangeTo(gpAttacker, 1)) {
            creep.moveTo(gpAttacker, { range: 1 });
            return;
        }
    }
    creep.heal(gpAttacker);
}
// TODO 让creep移动时不经过敌人房间
