import { PosStr } from "utils/RoomPositionToStr";

export function getCostMatrix(roomName: string): CostMatrix {
    const roomSearch = Game.rooms[roomName];
    // 在这个示例中，`room` 始终存在
    // 但是由于 PathFinder 支持跨多房间检索
    // 所以你要更加小心！
    const costs = new PathFinder.CostMatrix();
    const buildingExpandSet = new Set<string>();
    const allRoadSet = new Set<string>();
    // 在这里遍历所有建筑，并将cost设置为最高
    buildingExpandSet.forEach(posStr => {
        const coord = PosStr.parseCoord(posStr);
        costs.set(coord.x, coord.y, 0xff);
    });
    // 在这里遍历所有路，并将cost设置为1
    allRoadSet.forEach(posStr => {
        const coord = PosStr.parseCoord(posStr);
        costs.set(coord.x, coord.y, 1);
    });

    return costs;
}
