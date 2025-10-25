import { newAcrossTickTask } from "utils/AcrossTick";
import loader from "utils/Project/loader";
import { loadPlugin } from "./tools/loader";
import { logManager } from "utils/log4screeps";
import { SegmentManager } from "utils/SegmentManager/SegmentManager";

const logger = logManager.createLogger("debug", "PluginCommit");

export const pluginCommit = {
    loadPlugin: (args: { segmentName: string }): void => {
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
                loadPlugin(SegmentManager.readSegment(Number(task.args[0])));
                return "finish";
            }
        );
        const message = `尝试从 segment：${segmentName} 加载插件`;
        logger.info(message);
    },
    exportPlugin: (args: { pluginVersion: string; pluginName: string }): void => {
        const { pluginVersion, pluginName } = args;
        loader.download(pluginVersion, `${pluginName}-${pluginVersion}-${global.version}.json`);
        const message = `导出插件： ${pluginName} : ${pluginVersion} 成功`;
        logger.info(message);
    }
};
