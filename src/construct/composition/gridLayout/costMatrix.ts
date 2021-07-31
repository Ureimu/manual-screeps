import { PosStr } from "utils/RoomPositionToStr";

export function getCostMatrix(roomName: string): CostMatrix {
    const roomSearch = Game.rooms[roomName];
    // 在这个示例中，`room` 始终存在
    // 但是由于 PathFinder 支持跨多房间检索
    // 所以你要更加小心！
    const costs = new PathFinder.CostMatrix();
    const terrain = new Room.Terrain(roomName);
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++) {
            const tile = terrain.get(x, y);
            const weight =
                tile === TERRAIN_MASK_WALL
                    ? 255 // 墙壁 => 无法通行
                    : tile === TERRAIN_MASK_SWAMP
                    ? 10 // 沼泽
                    : 2; // 平原
            costs.set(x, y, weight);
        }
    }

    const notWalkableBuildingExpandList: BuildableStructureConstant[] = [
        "extension",
        "spawn",
        "link",
        "constructedWall",
        "storage",
        "tower",
        "observer",
        "powerSpawn",
        "extractor",
        "lab",
        "terminal",
        "nuker",
        "factory"
    ];
    setStructureCost(roomSearch, notWalkableBuildingExpandList, 0xff, costs);

    const roadExpandList: BuildableStructureConstant[] = ["road"];
    setStructureCost(roomSearch, roadExpandList, 1, costs);

    return costs;
}

function setStructureCost(
    room: Room,
    structureList: BuildableStructureConstant[],
    cost: number,
    costMatrix: CostMatrix
) {
    const layout = room.memory?.construct?.layout;
    if (!layout) return;
    structureList.forEach(name => {
        const specifiedList = layout[name];
        for (const specifiedName in specifiedList) {
            const buildingList = specifiedList[specifiedName as keyof typeof specifiedList] as {
                posStrList: string[];
                levelToBuild?: number | undefined;
            };
            // 在这里遍历所有建筑，并将costs设置为cost
            buildingList.posStrList.forEach(posStr => {
                const coord = PosStr.parseCoord(posStr);
                costMatrix.set(coord.x, coord.y, cost);
            });
        }
    });
}
