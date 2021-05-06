import { readyCondition, ReadyCondition } from "spawn/spawning/readyCondition";
import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.spawns) Memory.spawns = {};
    for (const spawnName in Game.spawns) {
        if (!Memory.spawns[spawnName]) {
            Memory.spawns[spawnName] = {
                spawnQueue: []
            };
        }
    }
}

export class spawnPool {
    public static addCreep(): string {
        const commitFunctionName = "spawnPoolCommit.addCreep";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepName",
                    label: "creep名称",
                    type: "input",
                    placeholder: "creep名称"
                },
                {
                    name: "creepBody",
                    label: "creep身体部件",
                    type: "select",
                    options: Object.keys(Memory.creepBodyConfig).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "priority", label: "优先级", type: "input", placeholder: "priority（数字）" },
                {
                    name: "roomName",
                    label: "spawn名称",
                    type: "select",
                    options: Object.keys(Game.spawns).map(value => {
                        return { value, label: value };
                    })
                },
                {
                    name: "readyCondition",
                    label: "执行条件",
                    type: "select",
                    options: Object.keys(readyCondition).map(value => {
                        return { value, label: value };
                    })
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time)
            }
        );
    }

    public static deleteCreep(): string {
        const commitFunctionName = "spawnPoolCommit.deleteCreep";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepName",
                    label: "creep名称",
                    type: "input",
                    placeholder: "creep名称"
                },
                {
                    name: "roomName",
                    label: "spawn名称",
                    type: "select",
                    options: Object.keys(Game.spawns).map(value => {
                        return { value, label: value };
                    })
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time)
            }
        );
    }

    public static setCreepProperties(): string {
        const commitFunctionName = "spawnPoolCommit.setCreepProperties";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "creepName",
                    label: "creep名称",
                    type: "input",
                    placeholder: "creep名称"
                },
                {
                    name: "roomName",
                    label: "房间名称",
                    type: "select",
                    options: Object.keys(Game.spawns).map(value => {
                        return { value, label: value };
                    })
                },
                {
                    name: "creepBody",
                    label: "creep身体部件",
                    type: "select",
                    options: Object.keys(Memory.creepBodyConfig).map(value => {
                        return { value, label: value };
                    })
                },
                { name: "priority", label: "优先级", type: "input", placeholder: "priority（数字）" },
                {
                    name: "readyCondition",
                    label: "执行条件",
                    type: "select",
                    options: Object.keys(readyCondition).map(value => {
                        return { value, label: value };
                    })
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time)
            }
        );
    }
}

declare global {
    interface SpawnMemory {
        spawnQueue: SpawnCreepDetail[];
    }

    interface RoomMemory {
        diedCreepList: string[];
        spawnPool: {
            [creepName: string]: SpawnCreepDetail;
        };
    }
}

export interface SpawnCreepDetail {
    creepName: string;
    creepBody: string;
    priority: number;
    readyCondition: readyConditionKey;
    state: runningState;
    spawnName?: string;
}

export type runningState = "running" | "ready" | "notReady";
export type readyConditionKey = keyof ReadyCondition;
