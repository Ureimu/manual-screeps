export function getNewRoom(): string | undefined {
    const newFlagNames = Object.keys(Game.flags).filter(flagName => flagName.includes("claim"));
    for (const name of newFlagNames) {
        const flagRoomName = Game.flags[name].pos.roomName;
        if (Game.rooms[flagRoomName]?.controller?.my) continue;
        else return flagRoomName;
    }
    return;
}
