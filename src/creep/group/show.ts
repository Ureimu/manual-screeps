import { isRouteMidpointDetail } from "creep/routePlan/type";
import { Coord, PosStr } from "utils/RoomPositionToStr";

export function showCreepGroups(creepGroupName: string, roomName: string): string {
    const roomVisual = new RoomVisual(roomName);
    const creepCoordList: Coord[] = [];
    const creepList: Creep[] = [];
    Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
        const creep = Game.creeps[creepName];
        if (creep) creepList.push(creep);
    });
    creepList.forEach(creep => {
        const coord = PosStr.parseCoord(PosStr.setPosToStr(creep.pos));
        creepCoordList.push(coord);
    });
    // 将creep圈起来
    creepCoordList.forEach(coord => {
        roomVisual.circle(coord.x, coord.y, { fill: "#transparent", stroke: "#ffffff", radius: 0.6 });
    });

    // 将路径点之间链接
    const midpointCoordList: Coord[] = [];
    const midpointDirectionCoordList: [Coord, Coord][] = [];
    const routeName = Memory.creepGroups[creepGroupName].routeName;
    if (!routeName) {
        return style(`路径名称不可以为空`, "error");
    }
    Memory.routes[routeName].routeDetailArray.forEach(routeDetail => {
        if (isRouteMidpointDetail(routeDetail)) {
            const coord = PosStr.parseCoord(routeDetail.pathMidpointPos);
            midpointCoordList.push(coord);
        }
    });
    const midpointCoordListLength = midpointCoordList.length;
    for (let index = 0; index < midpointCoordListLength; index++) {
        const element0 = midpointCoordList[index];
        const element1 = midpointCoordList[(index + 1) % midpointCoordListLength];
        midpointDirectionCoordList.push([element0, element1]);
    }
    midpointCoordList.forEach(coord => {
        roomVisual.circle(coord.x, coord.y);
    });
    midpointDirectionCoordList.forEach(directionCoord => {
        roomVisual.line(directionCoord[0].x, directionCoord[0].y, directionCoord[1].x, directionCoord[1].y);
    });

    // 将creep与对应路径点链接
    const creepDestinationList: Coord[] = [];
    const creepDirectionCoordList: [Coord, Coord][] = [];
    creepList.forEach(creep => {
        const creepRouteDetail = Memory.routes[routeName].routeDetailArray[creep.memory.route.index];
        if (isRouteMidpointDetail(creepRouteDetail)) {
            const destinationCoord = PosStr.parseCoord(creepRouteDetail.pathMidpointPos);
            creepDestinationList.push(destinationCoord);
        } else {
            creepDestinationList.push({ x: creep.pos.x, y: creep.pos.y });
        }
    });
    const creepDestinationListLength = creepDestinationList.length;
    for (let index = 0; index < creepDestinationListLength; index++) {
        const element0 = creepCoordList[index];
        const element1 = creepDestinationList[index];
        creepDirectionCoordList.push([element0, element1]);
    }
    creepDirectionCoordList.forEach(directionCoord => {
        roomVisual.line(directionCoord[0].x, directionCoord[0].y, directionCoord[1].x, directionCoord[1].y, {
            color: "#ffbb44"
        });
    });
    return roomVisual.export();
}
function style(arg0: string, arg1: string): string {
    throw new Error("Function not implemented.");
}
