import { creepGroup } from "creep/group";
import { routePlan } from "creep/routePlan";
import { creepBody } from "creep/body";
import { spawnPool } from "spawn/spawnPool";
import { posMaintainerCommit } from "flagMaintainer/commit";
import { pluginCommit } from "plugin/commit";
// 挂载全局拓展
export default function mountCommit(): void {
    // 挂载没有别名的操作
    _.assign(global, {
        routePlan,
        creepGroup,
        creepBody,
        spawnPool,
        posMaintainerCommit,
        pluginCommit
    });
}
