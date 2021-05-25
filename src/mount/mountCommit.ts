import { CreepGroup } from "creep/group";
import { RoutePlan } from "creep/routePlan";
import { CreepBody } from "creep/body";
import { SpawnPool } from "spawn/spawnPool";
import { FlagMaintainer } from "flagMaintainer";
import { pluginCommit } from "plugin/commit";
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
