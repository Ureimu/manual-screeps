import { AIRoomSetting } from "../control/room";

// 挂载全局拓展
export default function mountCommit(): void {
    // 挂载没有别名的操作
    _.assign(global, {
        AIRoomSetting
    });
}
