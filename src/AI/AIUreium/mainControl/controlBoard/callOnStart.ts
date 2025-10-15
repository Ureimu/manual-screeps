import { SCREEPS_CODE_DEST } from "codeConstants";
import { ControlSetting } from "./settings/settings";
import { defaultRoomControlData } from "./type";

export function callOnStart() {
    console.log(`load ai config from ControlSetting/${SCREEPS_CODE_DEST}/${Game.shard.name}`);
    const controlData = ControlSetting[SCREEPS_CODE_DEST]?.[Game.shard.name];
    if (!global.roomMemory) global.roomMemory = {};
    _.forEach(Game.rooms, room => {
        if (!room.controller) return;
        if (!room.controller.my) return;
        if (!global.roomMemory[room.name]) global.roomMemory[room.name] = {};
        global.roomMemory[room.name].control = controlData?.[room.name] ?? defaultRoomControlData;
    });
}
