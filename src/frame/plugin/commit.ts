import { newAcrossTickTask } from "utils/AcrossTick";
import loader from "utils/Project/loader";
import { loadPlugin } from "./tools/loader";
import { consoleStyle } from "frame/console/style";
import { SegmentManager } from "utils/SegmentManager/SegmentManager";

const style = consoleStyle("plugin");

export const pluginCommit = {
    loadPlugin: (args: { segmentName: string }): string => {
        const { segmentName } = args;
        SegmentManager.addId([Number(segmentName)]);
        newAcrossTickTask(
            {
                taskName: "loadPlugin",
                executeTick: Game.time + 1,
                intervalTick: 1,
                args: [segmentName],
                log: true
            },
            task => {
                loadPlugin(RawMemory.segments[Number(task.args[0])]);
                return "finish";
            }
        );
        return style(`尝试从 segment：${segmentName} 加载插件`, "log");
    },
    exportPlugin: (args: { pluginVersion: string; pluginName: string }): string => {
        const { pluginVersion, pluginName } = args;
        loader.download(pluginVersion, `${pluginName}-${pluginVersion}-${global.version}.json`);
        return style(`导出插件： ${pluginName} : ${pluginVersion} 成功`, "log");
    }
};
