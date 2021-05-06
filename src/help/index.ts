import GlobalAlias from "./main";
import profilerHelpAlias from "./profiler";
import routePlanAlias from "../creep/routePlan/help";
import creepGroupAlias from "../creep/group/help";
import creepBodyAlias from "../creep/body/help";
import spawnQueueAlias from "../spawn/spawnPool/help";
import posMaintainerAlias from "../posMaintainer/help";
import pluginAlias from "../plugin/help";

export default _.flatten([
    GlobalAlias,
    profilerHelpAlias,
    routePlanAlias,
    creepGroupAlias,
    creepBodyAlias,
    spawnQueueAlias,
    posMaintainerAlias,
    pluginAlias
]);
