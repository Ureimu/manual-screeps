import { PosStr } from "utils/RoomPositionToStr";
import { state } from "..";

export function harvestSource(creep: Creep): state {
    const routeInfo = creep.memory.route;
    const routeDetail = Memory.routes[routeInfo.name].routeDetailArray[routeInfo.index];
    const sourcePos = PosStr.getPosFromStr(routeDetail.pathMidpointPos);
    const source = sourcePos.lookFor(LOOK_SOURCES)[0];

    const ifHarvesting = creep.store.getFreeCapacity() === 0;
    if (ifHarvesting) {
        creep.harvest(source);
        return "arrived";
    } else {
        return "moving";
    }
}
