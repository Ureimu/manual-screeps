import { readyCondition } from "spawn/spawning/readyCondition";
import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.spawns) Memory.spawns = {};
    for (const spawnName in Game.spawns) {
        if (!Memory.spawns[spawnName]) {
            Memory.spawns[spawnName] = {
                spawnQueue: [],
                isSpawning: false
            };
        }
    }
}

export class spawnPoolForm {
    public static addCreep(): string {
        const commitFunctionName = "SpawnPool.addCreep";
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
                    label: "spawn的room名称",
                    type: "select",
                    options: Object.values(Game.rooms)
                        .filter(room => room.controller?.my)
                        .map(room => {
                            return { value: room.name, label: room.name };
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
        const commitFunctionName = "SpawnPool.deleteCreep";
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
                    label: "room名称",
                    type: "select",
                    options: Object.values(Game.rooms)
                        .filter(room => room.controller?.my)
                        .map(room => {
                            return { value: room.name, label: room.name };
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
        const commitFunctionName = "SpawnPool.setCreepProperties";
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
