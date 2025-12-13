import { defaultMainConfig, defaultRoomConfig } from "../defaultConfig";
import { PartialScreepsConfig, ScreepsConfig, MainConfig } from "../type";

export class ConfigTools {
    public static fromPartialSetting(partialSetting: PartialScreepsConfig): ScreepsConfig {
        const shardDefaultRoomConfig = _.merge(_.cloneDeep(defaultRoomConfig), partialSetting.rooms.default);
        const newSetting: ScreepsConfig = {
            main: _.merge(_.cloneDeep(defaultMainConfig), partialSetting.main) as MainConfig,
            rooms: { default: shardDefaultRoomConfig }
        };

        for (const roomName in partialSetting.rooms) {
            newSetting.rooms[roomName] = _.merge(_.cloneDeep(shardDefaultRoomConfig), partialSetting.rooms[roomName]);
        }

        return newSetting;
    }
}
