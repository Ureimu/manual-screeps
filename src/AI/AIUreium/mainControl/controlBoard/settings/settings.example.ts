// 房间设置文件。
// 将该文件修改为自己的设置后，将该文件重命名为settings.ts。
// destName指的是你在screeps.json的第一层键名。
// settings.ts文件不会上传到github（因为会暴露一些自己的房间策略）
// 如果意外丢失设置文件，可以通过把自己所有房间的global.roomMemory[roomName].control的内容下载为文本来恢复。

/**
 * 设置的配置项请参考controlBoard/type.ts下的RoomControlData类型。
 * 可以复制controlBoard/type.ts下的defaultRoomControlData为自己的初始设定，然后再自己更改。
 */

import { RoomControlData } from "../type";

const shard3ControlSettings: { [roomName: string]: RoomControlData } = {};

export const FullControlSetting: {
    [destName: string]: {
        [shardName: string]: {
            [roomName: string]: RoomControlData;
        };
    };
} = {
    official_server: {
        shard3: shard3ControlSettings
    }
};
