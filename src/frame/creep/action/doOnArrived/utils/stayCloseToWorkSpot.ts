export function stayCloseToWorkSpot(creep: Creep, pos: RoomPosition, range: number) {
    if (Game.time % 5 != 0) return;
    if (creep.pos.getRangeTo(pos) > range) {
        creep.moveTo(pos, {
            range
        });
    }
}
