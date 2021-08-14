import { CreepGroup } from "frame/creep/group";
import { RoutePlan } from "frame/creep/routePlan";
import { CreepBody } from "frame/creep/body";
import { SpawnPool } from "frame/spawn/spawnPool";
import { FlagMaintainer } from "frame/flagMaintainer";
import { pluginCommit } from "frame/plugin/commit";
// 挂载全局拓展
export default function mountCommit(): void {
    // 挂载没有别名的操作
    _.assign(global, {
        RoutePlan,
        CreepGroup,
        CreepBody,
        SpawnPool,
        FlagMaintainer,
        pluginCommit
    });
}
