import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";
import colorful from "../utils/console/colorful";
const getButton = (alias: string) => {
    return creators.button({
        command: `() => ${alias}`,
        content: `${alias}`,
        type: "button",
        name: alias
    });
};
/**
 * 全局拓展的别名
 * 使用别名来方便在控制台执行方法
 *
 * @property {string} alias 别名
 * @property {function} exec 执行别名时触发的操作
 */
export default [
    // 常用的资源常量
    {
        alias: "res",
        exec(): string {
            return "resourcesHelp(undefined)";
        }
    },
    {
        alias: "help",
        exec(): string {
            return [
                `\n偏手动操作型ai，所有行动都可以通过console进行操作\n`,

                createFlattenHelp({
                    name: "help API",
                    describe: "总帮助",
                    api: [
                        {
                            title: "routePlan",
                            describe: "规划creep路线。",
                            functionName: getButton("routePlan"),
                            commandType: true
                        },
                        {
                            title: "creepGroup",
                            describe: "规划creep组",
                            functionName: getButton("creepGroup"),
                            commandType: true
                        },
                        {
                            title: "creepBody",
                            describe: "规划creep身体部件",
                            functionName: getButton("creepBody"),
                            commandType: true
                        },
                        {
                            title: "spawnPool",
                            describe: "规划creep的孵化",
                            functionName: getButton("spawnPool"),
                            commandType: true
                        },
                        {
                            title: "posMaintainer",
                            describe: "创建各个对象的pos",
                            functionName: getButton("posMaintainer"),
                            commandType: true
                        },
                        {
                            title: "plugin",
                            describe: "插件管理",
                            functionName: getButton("plugin"),
                            commandType: true
                        },
                        {
                            title: "stats",
                            describe: "查看统计数据",
                            functionName: getButton("mf.stats()"),
                            commandType: true
                        }
                    ]
                })
            ].join("\n");
        }
    },
    // 统计当前所有房间的存储状态
    {
        alias: "storage",
        exec(): string {
            // 建筑容量在小于如下值时将会变色
            const colorLevel = {
                [STRUCTURE_TERMINAL]: { warning: 60000, danger: 30000 },
                [STRUCTURE_STORAGE]: { warning: 150000, danger: 50000 }
            };

            /**
             * 给数值添加颜色
             *
             * @param capacity 要添加颜色的容量数值
             * @param structureType 建筑类型
             */
            const addColor = (capacity: number, structureType: STRUCTURE_TERMINAL | STRUCTURE_STORAGE): string => {
                if (!capacity) return colorful("无法访问", "red");
                return capacity > colorLevel[structureType].warning
                    ? colorful(capacity.toString(), "green")
                    : capacity > colorLevel[structureType].danger
                    ? colorful(capacity.toString(), "yellow")
                    : colorful(capacity.toString(), "red");
            };

            const logs = [
                `剩余容量/总容量 [storage 报警限制] ${colorful(
                    colorLevel[STRUCTURE_STORAGE].warning.toString(),
                    "yellow"
                )} ${colorful(colorLevel[STRUCTURE_STORAGE].danger.toString(), "red")} [terminal 报警限制] ${colorful(
                    colorLevel[STRUCTURE_TERMINAL].warning.toString(),
                    "yellow"
                )} ${colorful(colorLevel[STRUCTURE_TERMINAL].danger.toString(), "red")}`,
                "",
                ...Object.values(Game.rooms)
                    .map(room => {
                        // 如果两者都没有或者房间无法被控制就不显示
                        if ((!room.storage && !room.terminal) || !room.controller) return false;

                        let log = `[${room.name}] `;
                        if (room.storage)
                            log += `STORAGE: ${addColor(room.storage.store.getFreeCapacity(), STRUCTURE_STORAGE)}/${
                                room.storage.store.getCapacity() || "无法访问"
                            } `;
                        else log += "STORAGE: X ";

                        if (room.terminal)
                            log += `TERMINAL: ${addColor(room.terminal.store.getFreeCapacity(), STRUCTURE_TERMINAL)}/${
                                room.terminal.store.getCapacity() || "无法访问"
                            } `;
                        else log += "TERMINAL: X ";

                        return log;
                    })
                    .filter(Boolean)
            ];

            return logs.join("\n");
        }
    },

    /**
     * 把房间挂载到全局
     * 来方便控制台操作，在访问时会实时的获取房间对象
     * 注意：仅会挂载 Memory.rooms 里有的房间
     */
    ...Object.keys(Memory.rooms || {}).map(roomName => ({
        alias: roomName,
        exec: (): Room => Game.rooms[roomName]
    }))
];
