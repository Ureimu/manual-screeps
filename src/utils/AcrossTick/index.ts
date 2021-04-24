import { AcrossTickMemory } from "./type";

export class AcrossTick {
    public task: AcrossTickMemory;
    public constructor() {
        if (!Memory.AcrossTick) Memory.AcrossTick = {}; // 可以自己放在扩展挂载的地方
        this.task = {
            taskName: "",
            args: [],
            executeTick: Game.time,
            taskCreateTick: Game.time,
            intervalTick: 1
        };
    }

    public runAfterTicks(task: AcrossTickMemory): void {
        if (task.executeTick < 0) throw new Error("task.executeTick不应小于0");
        task.executeTick += task.intervalTick;
        this.task = Object.assign(this.task, task);
    }

    public runNow(): void {
        this.task.executeTick = Game.time;
    }

    public finish(): void {
        if (!Memory.AcrossTick[this.task.executeTick]) Memory.AcrossTick[this.task.executeTick] = [];
        Memory.AcrossTick[this.task.executeTick].push(this.task);
    }
}
