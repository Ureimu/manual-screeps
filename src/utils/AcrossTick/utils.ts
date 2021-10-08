import { AcrossTick, newAcrossTickTask } from ".";

AcrossTick.mountTaskFunction({ taskName: "log" }, ({ args }) => {
    console.log(...args);
    return "finish";
});

export function waitThenLog(time: number, ...messages: string[]): void {
    newAcrossTickTask({ taskName: "log", args: messages, executeTick: Game.time + time, intervalTick: 1, log: false });
}
