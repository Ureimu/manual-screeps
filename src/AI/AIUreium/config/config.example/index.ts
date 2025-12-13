// 房间设置文件。
// 将该文件修改为自己的设置后，将该文件所在文件夹重命名为config。
// destName指的是你在screeps.json的第一层键名。
// settings.ts文件不会上传到github（因为会暴露一些自己的房间策略）
// 如果意外丢失设置文件，可以通过把自己所有房间的global.roomMemory[roomName].control的内容下载为文本来恢复。

/**
 * 设置的配置项请参考controlBoard/type.ts下的RoomControlData类型。
 * 可以复制controlBoard/type.ts下的defaultRoomControlData为自己的初始设定，然后再自己更改。
 */

import { defaultMainControlData, defaultRoomConfig } from "../defaultConfig";
import { ScreepsConfigType, MainConfig, PartialConfigType } from "../type";

const shard3Config: PartialConfigType = { rooms: {} };

export const FullConfig: {
    [destName: string]: {
        [shardName: string]: ScreepsConfigType;
    };
} = {
    official_server: {
        shard3: fromPartialSetting(shard3Config)
    }
};

function fromPartialSetting(partialSetting: PartialConfigType): ScreepsConfigType {
    const newSetting: ScreepsConfigType = {
        main: _.merge(_.cloneDeep(defaultMainControlData), partialSetting.main) as MainConfig,
        rooms: {}
    };
    for (const roomName in partialSetting.rooms) {
        newSetting.rooms[roomName] = _.merge(_.cloneDeep(defaultRoomConfig), partialSetting.rooms[roomName]);
    }

    return newSetting;
}
