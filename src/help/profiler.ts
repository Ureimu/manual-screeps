import colorful from "../utils/console/colorful";
import { createHelp } from "../utils/createConsoleHelp/createHelp";

const profilerParams = [
    { name: "ticks", desc: "持续的tick数" },
    { name: "functionFilter", desc: "[可选] 选择要检测哪些函数及其调用。" }
];

export default [
    {
        alias: "profiler",
        exec(): string {
            return [
                createHelp({
                    name: "profiler API",
                    describe: "挂载在Game对象上的cpu消耗检测分析函数。",
                    api: [
                        {
                            title: "指定tick数输出分析",
                            describe: "运行指定tick数之后将cpu消耗分析输出到console。",
                            params: profilerParams,
                            functionName: "Game.profiler.profile"
                        },
                        {
                            title: "每tick输出分析",
                            describe:
                                "每tick输出当前tick的cpu消耗分析到console,\n这个功能在cpu消耗有偶尔的剧烈波动时很有用。",
                            params: profilerParams,
                            functionName: "Game.profiler.stream"
                        },
                        {
                            title: "输出分析到email",
                            describe: "运行指定tick数之后将cpu消耗分析输出到email。对于分析较长时间的cpu消耗很有用。",
                            params: profilerParams,
                            functionName: "Game.profiler.email"
                        },
                        {
                            title: "后台持续运行profiler",
                            describe: "在后台持续运行profiler。对于分析较长时间的cpu消耗很有用。",
                            params: [profilerParams[1]],
                            functionName: "Game.profiler.background"
                        },
                        {
                            title: "输出本tick的分析",
                            describe: "输出当前tick的cpu消耗分析到console。不影响profiler的其他在进行的活动",
                            params: [{ name: "lineCount", desc: "[可选] 输出的最大行数" }],
                            functionName: "Game.profiler.output"
                        },
                        {
                            title: "下载callgrind文件",
                            describe: "生成当前profiler的callgrind下载链接。在群里有相关软件用来查看该数据文件。",
                            params: [],
                            functionName: "Game.profiler.callgrind"
                        },
                        {
                            title: "重启profiler",
                            describe: "重启profiler并清空memory缓存。这是目前唯一的停止background任务的办法。",
                            params: [],
                            functionName: "Game.profiler.reset"
                        },
                        {
                            title: "再次开始profiler",
                            describe: "使用和上一次使用的profiler函数一样的参数再次执行上一次的函数",
                            params: [],
                            functionName: "Game.profiler.restart"
                        }
                    ]
                })
            ].join("\n");
        }
    }
];
