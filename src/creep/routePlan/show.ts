import { Coord, PosStr } from "utils/RoomPositionToStr";

export function showRoutes(routeName: string, roomName: string): string {
    const roomVisual = new RoomVisual(roomName);
    const coordList: Coord[] = [];
    const directionCoordList: [Coord, Coord][] = [];
    Memory.routes[routeName].routeDetailArray.forEach(routeDetail => {
        const coord = PosStr.parseCoord(routeDetail.pathMidpointPos);
        coordList.push(coord);
    });
    const coordListLength = coordList.length;
    for (let index = 0; index < coordListLength; index++) {
        const element0 = coordList[index];
        const element1 = coordList[(index + 1) % coordListLength];
        directionCoordList.push([element0, element1]);
    }
    coordList.forEach(coord => {
        roomVisual.circle(coord.x + 0.5, coord.y + 0.5);
    });
    directionCoordList.forEach(directionCoord => {
        roomVisual.line(
            directionCoord[0].x + 0.5,
            directionCoord[0].y + 0.5,
            directionCoord[1].x + 0.5,
            directionCoord[1].y + 0.5
        );
    });
    return roomVisual.export();
}
