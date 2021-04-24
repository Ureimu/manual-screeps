import { Coord, PosStr } from "utils/RoomPositionToStr";

export function showCreepGroups(creepGroupName: string, roomName: string): string {
    const roomVisual = new RoomVisual(roomName);
    const creepCoordList: Coord[] = [];
    const creepList: Creep[] = [];
    Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
        creepList.push(Game.creeps[creepName]);
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
    Memory.routes[routeName].routeDetailArray.forEach(routeDetail => {
        const coord = PosStr.parseCoord(routeDetail.pathMidpointPos);
        midpointCoordList.push(coord);
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
        const destinationCoord = PosStr.parseCoord(
            Memory.routes[routeName].routeDetailArray[creep.memory.route.index].pathMidpointPos
        );
        creepDestinationList.push(destinationCoord);
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
