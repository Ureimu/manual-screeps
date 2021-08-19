import { runTerminal } from "../mainControl/market";

export const terminal = {
    run: (room: Room): void => {
        if (!room.terminal) return;
        runTerminal(room.terminal);
    }
};
