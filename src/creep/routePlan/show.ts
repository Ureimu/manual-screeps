import { Coord, PosStr } from "utils/RoomPositionToStr";
import { isRouteMidpointDetail } from "./form";

export function showRoutes(routeName: string, roomName: string): string {
    const roomVisual = new RoomVisual(roomName);
    const coordList: Coord[] = [];
    const directionCoordList: [Coord, Coord][] = [];
    Memory.routes[routeName].routeDetailArray.forEach(routeDetail => {
        if (isRouteMidpointDetail(routeDetail)) {
            const coord = PosStr.parseCoord(routeDetail.pathMidpointPos);
            coordList.push(coord);
        }
    });
    const coordListLength = coordList.length;
    for (let index = 0; index < coordListLength; index++) {
        const element0 = coordList[index];
        const element1 = coordList[(index + 1) % coordListLength];
        directionCoordList.push([element0, element1]);
    }
    coordList.forEach(coord => {
        roomVisual.circle(coord.x, coord.y);
    });
    directionCoordList.forEach(directionCoord => {
        roomVisual.line(directionCoord[0].x, directionCoord[0].y, directionCoord[1].x, directionCoord[1].y);
    });
    return roomVisual.export();
}
