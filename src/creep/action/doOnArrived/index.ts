import { RouteDetail } from "creep/routePlan";
import { state } from "..";
import { harvestSource } from "./harvestSource";
import { signController } from "./signController";
import { upgradeController } from "./upgradeController";

export function switchDoWhenArrive(routeDetail: RouteDetail, creep: Creep): state {
    switch (routeDetail.doWhenArrive) {
        case "harvestSource":
            return harvestSource(creep);
        case "upgradeController":
            return upgradeController(creep);
        case "signController":
            return signController(creep);
        default:
            console.log(`${routeDetail.doWhenArrive} 不在doStuff预设值内`);
            return "arrived";
    }
}
