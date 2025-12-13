/**
 * 房间设置文件。
 *
 * 将该文件修改为自己的设置后，将该文件所在文件夹重命名为config。
 * destName指的是你在screeps.json的第一层键名。
 * settings.ts文件不会上传到github（因为会暴露一些自己的房间策略）
 * 如果意外丢失设置文件，可以通过把自己所有房间的global.roomMemory[roomName].control的内容下载为文本来恢复。
 *
 * 设置的配置项请参考controlBoard/type.ts下的RoomControlData类型。
 * 可以复制controlBoard/type.ts下的defaultRoomControlData为自己的初始设定，然后再自己更改。
 */

import { ScreepsConfig, PartialScreepsConfig } from "../type";
import { ConfigTools } from "../utils/configTools";

const shard3Config: PartialScreepsConfig = {
    rooms: {
        default: {}
    }
};

export const FullConfig: {
    [destName: string]: {
        [shardName: string]: ScreepsConfig;
    };
} = {
    // destName字段应与screeps.json中的配置键名一致
    official_server: {
        shard3: ConfigTools.fromPartialSetting(shard3Config)
    }
};
