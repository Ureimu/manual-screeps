import { RouteMidpointDetail } from "creep/routePlan/type";
import { RoutePlan } from "creep/routePlan";

export function createRoute(args: { routeName: string; ifLoop: string; midPointList: RouteMidpointDetail[] }): string {
    const { routeName, ifLoop, midPointList } = args;
    const logList: string[] = [];
    if (ifLoop !== "true" && ifLoop !== "false") {
        return "";
    }
    logList.push(RoutePlan.create({ routeName, ifLoop }));
    midPointList.forEach(midPointDetail => {
        logList.push(
            RoutePlan.addMidpoint({
                routeName,
                ...midPointDetail
            })
        );
    });
    return logList.join("\n");
}
