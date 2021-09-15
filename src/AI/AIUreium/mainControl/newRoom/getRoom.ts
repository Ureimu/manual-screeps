export function getNewRoom(): string | undefined {
    const newFlagName = Object.keys(Game.flags).find(flagName => flagName.includes("claimNew"));
    if (newFlagName) {
        return Game.flags[newFlagName].pos.roomName;
    } else {
        return;
    }
}
