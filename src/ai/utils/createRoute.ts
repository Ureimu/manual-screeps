import { RouteMidpointDetail } from "creep/routePlan";
import { routePlanCommit } from "creep/routePlan/commit";

export function createRoute(args: { routeName: string; ifLoop: string; midPointList: RouteMidpointDetail[] }): string {
    const { routeName, ifLoop, midPointList } = args;
    const logList: string[] = [];
    logList.push(routePlanCommit.create({ routeName, ifLoop }));
    midPointList.forEach(midPointDetail => {
        logList.push(
            routePlanCommit.addMidpoint({
                routeName,
                ...midPointDetail
            })
        );
    });
    return logList.join("\n");
}
