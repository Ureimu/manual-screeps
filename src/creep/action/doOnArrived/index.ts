import { RouteMidpointDetail } from "creep/routePlan/type";
import { state } from "..";
import { build } from "./build";
import { buildInRange } from "./buildInRange";
import { fillSpawnAndExtension } from "./fillSpawnAndExtension";
import { fillTower } from "./fillTower";
import { goTo } from "./goTo";
import { harvestSource } from "./harvestSource";
import { keepOnHarvestingSource } from "./keepOnHarvestingSource";
import { signController } from "./signController";
import { transferEnergy } from "./transferEnergy";
import { upgradeController } from "./upgradeController";
import { withdrawEnergy } from "./withdrawEnergy";

export interface CreepAction {
    run: (creep: Creep, actionArgs?: string[]) => state;
    name: string;
    description: string;
    type: "move" | "stay";
}
export const actionIndexedList = {
    goTo,
    harvestSource,
    upgradeController,
    signController,
    transferEnergy,
    withdrawEnergy,
    build,
    keepOnHarvestingSource,
    buildInRange,
    fillSpawnAndExtension,
    fillTower
};

export function switchDoWhenArrive(routeDetail: RouteMidpointDetail, creep: Creep): state {
    if (actionIndexedList[routeDetail.doWhenArrive]) {
        return actionIndexedList[routeDetail.doWhenArrive].run(
            creep,
            routeDetail.actionArgs ? routeDetail.actionArgs.split(",") : undefined
        );
    } else {
        console.log(`${routeDetail.doWhenArrive} 不在doStuff预设值内`);
        return "arrived";
    }
}
