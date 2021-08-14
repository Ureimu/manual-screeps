import { clearCreepRouteMemory } from "frame/creep/action";
import { readyConditionKey } from "./type";
import { consoleStyle } from "frame/console/style";

const style = consoleStyle("spawnPool");

export class SpawnPool {
    /**
     * 添加creep。
     *
     * @static
     * @param {{
     *         creepName: string;
     *         creepBody: string;
     *         priority: string;
     *         roomName: string;
     *         readyCondition: readyConditionKey;
     *     }} args
     * @returns {string}
     * @memberof spawnPool
     */
    public static addCreep(args: {
        creepName: string;
        creepBody: string;
        priority: string;
        roomName: string;
        readyCondition: readyConditionKey;
    }): string {
        const { creepName, creepBody: creepBodyConfigName, priority, roomName, readyCondition } = args;
        if (!Game.rooms[roomName]?.memory) {
            console.log(style(`请检查房间是否存在可用spawn，如果存在则请忽略`, "warning"));
        }
        const roomMemory = Game.rooms[roomName].memory;
        if (!roomMemory?.spawnPool) {
            roomMemory.spawnPool = {};
        }
        roomMemory.spawnPool[creepName] = {
            creepName,
            creepBody: creepBodyConfigName,
            priority: Number(priority),
            readyCondition,
            state: "ready",
            roomName
        };
        if (!Memory.creeps) {
            Memory.creeps = {};
        }
        if (!Memory.creeps[creepName]) {
            (Memory.creeps[creepName] as Partial<CreepMemory>) = {};
            clearCreepRouteMemory(Memory.creeps[creepName]);
        }
        return style(
            `添加creep ${creepName} creepBody: ${creepBodyConfigName} priority: ${priority} 到roomName: ${roomName} , readyCondition: ${readyCondition} 成功`,
            "log"
        );
    }
    /**
     * 删除creep。
     *
     * @static
     * @param {{ creepName: string; roomName: string }} args
     * @returns {string}
     * @memberof spawnPool
     */
    public static deleteCreep(args: { creepName: string; roomName: string }): string {
        const { creepName, roomName } = args;
        // console.log(creepName);
        delete Memory.rooms[roomName].spawnPool[creepName];
        return style(`删除在 ${roomName} 的creep ${creepName} 完成`, "log");
    }
    /**
     * 设置creep参数。
     *
     * @static
     * @param {{
     *         creepName: string;
     *         roomName: string;
     *         creepBody: string;
     *         priority: string;
     *         readyCondition: readyConditionKey;
     *     }} args
     * @returns {string}
     * @memberof spawnPool
     */
    public static setCreepProperties(args: {
        creepName: string;
        roomName: string;
        creepBody?: string;
        priority?: string;
        readyCondition?: readyConditionKey;
    }): string {
        const { creepName, roomName, creepBody, priority, readyCondition } = args;
        const memCopy = Object.assign({}, Memory.rooms[roomName].spawnPool[creepName]);
        Memory.rooms[roomName].spawnPool[creepName] = {
            creepName: memCopy.creepName,
            creepBody: creepBody || memCopy.creepBody,
            priority: Number(priority) || memCopy.priority,
            readyCondition: readyCondition || memCopy.readyCondition,
            state: "ready",
            roomName
        };
        return style(`修改creepSpawn信息 ${creepName} 设置完成`, "log");
    }
}
