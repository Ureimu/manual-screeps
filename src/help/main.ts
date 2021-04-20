import colorful from "../utils/console/colorful";
import { createHelp } from "../utils/createConsoleHelp/createHelp";

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
                `\n半自动 AI，调用指定房间 help 方法来查看更详细的帮助信息 (如：${colorful(
                    "Game.rooms.W1N1.help",
                    "yellow"
                )}())。在 ${colorful(
                    "Link, Factory, Terminal, PowerSpawn, Observer",
                    "yellow"
                )} 对象实例上也包含对应的 help 方法。\n`,

                createHelp(
                    {
                        name: "全局指令",
                        describe: "直接输入就可以执行，不需要加 ()",
                        api: [
                            {
                                title: "查看资源常量",
                                commandType: true,
                                functionName: "res"
                            },
                            {
                                title: "查看 powerSpawn 状态汇总",
                                commandType: true,
                                functionName: "ps"
                            },
                            {
                                title: "查看 observer 状态汇总",
                                commandType: true,
                                functionName: "ob"
                            },
                            {
                                title: "查看商品生产线",
                                commandType: true,
                                functionName: "comm"
                            },
                            {
                                title: "列出所有路径缓存",
                                describe: "路径缓存是全局的，会在 global 重置时清空",
                                commandType: true,
                                functionName: "route"
                            },
                            {
                                title: "发射核弹",
                                describe: "向指定旗帜发射核弹，直接输入该命令来了解更多信息",
                                commandType: true,
                                functionName: "nuker"
                            }
                        ]
                    },
                    {
                        name: "全局方法",
                        describe: "定义在全局的函数，优化手操体验",
                        api: [
                            {
                                title: "获取游戏对象",
                                describe: "Game.getObjectById 方法的别名",
                                params: [{ name: "id", desc: "要查询的对象 id" }],
                                functionName: "get"
                            },
                            {
                                title: "追加订单容量",
                                describe: "Game.market.extendOrder 方法的别名",
                                params: [
                                    { name: "orderId", desc: "订单的 id" },
                                    { name: "amount", desc: "要追加的数量" }
                                ],
                                functionName: "orderExtend"
                            },
                            {
                                title: "查询指定资源",
                                describe: "全局搜索资源的数量以及所处房间",
                                params: [{ name: "resourceName", desc: "要查询的资源名" }],
                                functionName: "seeres"
                            },
                            {
                                title: "运行自动选址",
                                params: [{ name: "roomName", desc: "要搜索的房间" }],
                                functionName: "base"
                            },
                            {
                                title: "全局发送资源",
                                describe: "会遍历所有房间搜索资源并发送直到总量到达指定数量",
                                params: [
                                    { name: "roomName", desc: "要发送到的房间名" },
                                    { name: "resourceType", desc: "资源类型" },
                                    { name: "amount", desc: "发送数量" }
                                ],
                                functionName: "give"
                            },
                            {
                                title: "欢呼",
                                params: [
                                    { name: "content", desc: "欢呼内容" },
                                    { name: "toPublic", desc: "[可选] 其他人是否可见，默认为 true" }
                                ],
                                functionName: "hail"
                            }
                        ]
                    },
                    {
                        name: "全局模块",
                        describe: "可以全局访问的模块，访问其 help 方法来了解更多信息。",
                        api: [
                            {
                                title: "白名单",
                                describe: "查看白名单帮助信息",
                                functionName: "whitelist.help"
                            },
                            {
                                title: "房间绕过",
                                describe: "查看房间绕过帮助信息",
                                functionName: "bypass.help"
                            },
                            {
                                title: "掠夺配置",
                                describe: "查看掠夺配置帮助信息",
                                functionName: "reive.help"
                            }
                        ]
                    }
                )
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
