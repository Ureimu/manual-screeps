import GlobalAlias from "./main";
import profilerHelpAlias from "./profiler";
import routePlanAlias from "frame/creep/routePlan/help";
import creepGroupAlias from "frame/creep/group/help";
import creepBodyAlias from "frame/creep/body/help";
import spawnQueueAlias from "frame/spawn/spawnPool/help";
import posMaintainerAlias from "frame/flagMaintainer/help";
import pluginAlias from "frame/plugin/help";
import uiAlias from "utils/ui/help";

export default _.flatten([
    GlobalAlias,
    profilerHelpAlias,
    routePlanAlias,
    creepGroupAlias,
    creepBodyAlias,
    spawnQueueAlias,
    posMaintainerAlias,
    pluginAlias,
    uiAlias
]);
