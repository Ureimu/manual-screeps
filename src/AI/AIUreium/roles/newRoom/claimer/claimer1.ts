export function claimer1(creep: Creep, args: string[]): void {
    const [spawnRoomName, claimRoomName] = args;
    if (creep.room.name !== claimRoomName) {
        creep.moveTo(new RoomPosition(25, 25, claimRoomName));
        return;
    }
    const claimRoom = Game.rooms[claimRoomName];
    if (!claimRoom.controller) throw Error("no controller");
    if (creep.pos.isNearTo(claimRoom.controller)) {
        creep.claimController(claimRoom.controller);
    } else {
        creep.moveTo(claimRoom.controller, { range: 1 });
    }
}
