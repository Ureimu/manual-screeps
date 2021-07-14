import { RouteMidpointDetail } from "creep/routePlan/type";
import * as profiler from "../../../utils/profiler";
import { state } from "..";
import { build } from "./build";
import { buildInRange } from "./buildInRange";
import { fillSpawnAndExtension } from "./fillSpawnAndExtension";
import { fillTower } from "./fillTower";
import { goTo } from "./goTo";
import { harvestSource } from "./harvestSource";
import { keepOnHarvestingSource } from "./keepOnHarvestingSource";
import { pause } from "./pause";
import { repair } from "./repair";
import { scoutRoom } from "./scoutRoom";
import { signController } from "./signController";
import { stayByRoad } from "./stayByRoad";
import { transferEnergy } from "./transferEnergy";
import { upgradeController } from "./upgradeController";
import { withdrawEnergy } from "./withdrawEnergy";

export interface CreepAction {
    run: (creep: Creep, actionArgs?: string[]) => state;
    name: string;
    description: string;
    type: "move" | "stay";
}
const unwrappedActionIndexedList = {
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
    fillTower,
    pause,
    repair,
    scoutRoom,
    stayByRoad
};
for (const name in unwrappedActionIndexedList) {
    unwrappedActionIndexedList[name as keyof typeof unwrappedActionIndexedList].run = profiler.registerFN(
        unwrappedActionIndexedList[name as keyof typeof unwrappedActionIndexedList].run,
        `creepAction:${name}`
    );
}
export const creepAct = unwrappedActionIndexedList;
export function switchDoWhenArrive(routeDetail: RouteMidpointDetail, creep: Creep): state {
    if (creepAct[routeDetail.doWhenArrive]) {
        return creepAct[routeDetail.doWhenArrive].run(
            creep,
            routeDetail.actionArgs ? routeDetail.actionArgs.split(",") : undefined
        );
    } else {
        console.log(`${routeDetail.doWhenArrive} 不在doStuff预设值内`);
        return "arrived";
    }
}
