import { creepGroupCommit } from "creep/group/commit";
import { routePlanCommit } from "creep/routePlan/commit";
import { creepBodyCommit } from "creep/body/commit";
import { spawnPoolCommit } from "spawn/spawnPool/commit";
import { posMaintainerCommit } from "posMaintainer/commit";
import { pluginCommit } from "plugin/commit";
// 挂载全局拓展
export default function mountCommit(): void {
    // 挂载没有别名的操作
    _.assign(global, {
        routePlanCommit,
        creepGroupCommit,
        creepBodyCommit,
        spawnPoolCommit,
        posMaintainerCommit,
        pluginCommit
    });
}
