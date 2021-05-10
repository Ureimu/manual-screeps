import { RouteMidpointDetail } from "creep/routePlan/form";
import { routePlan } from "creep/routePlan";

export function createRoute(args: { routeName: string; ifLoop: string; midPointList: RouteMidpointDetail[] }): string {
    const { routeName, ifLoop, midPointList } = args;
    const logList: string[] = [];
    logList.push(routePlan.create({ routeName, ifLoop }));
    midPointList.forEach(midPointDetail => {
        logList.push(
            routePlan.addMidpoint({
                routeName,
                ...midPointDetail
            })
        );
    });
    return logList.join("\n");
}
