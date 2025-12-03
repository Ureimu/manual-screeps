import { wrapFunction } from "utils/profiler/wrap/function";
import { PosStr } from "utils/RoomPositionToStr";
import { LayoutDataNode } from "../type";

export const getCostMatrix = wrapFunction(
    "getCostMatrix",
    (
        roomName: string,
        opts?: { swampCost: number; plainCost: number; wallCost: number; roadCost: number }
    ): CostMatrix => {
        // 在这个示例中，`room` 始终存在
        // 但是由于 PathFinder 支持跨多房间检索
        // 所以你要更加小心！
        const { swampCost, plainCost, wallCost, roadCost } = opts ?? {
            swampCost: 10,
            plainCost: 2,
            wallCost: 0xff,
            roadCost: 1
        };
        const costs = new PathFinder.CostMatrix();
        const terrain = new Room.Terrain(roomName);
        for (let y = 0; y < 50; y++) {
            for (let x = 0; x < 50; x++) {
                const tile = terrain.get(x, y);
                const weight =
                    tile === TERRAIN_MASK_WALL
                        ? wallCost // 墙壁 => 无法通行
                        : tile === TERRAIN_MASK_SWAMP
                        ? swampCost // 沼泽
                        : plainCost; // 平原
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

        setStructureCost(roomName, notWalkableBuildingExpandList, 0xff, costs);

        const roadExpandList: BuildableStructureConstant[] = ["road"];
        setStructureCost(roomName, roadExpandList, roadCost, costs);

        return costs;
    }
);

function setStructureCost(
    roomName: string,
    structureList: BuildableStructureConstant[],
    cost: number,
    costMatrix: CostMatrix
) {
    const layout = Memory.rooms?.[roomName]?.construct?.layout;
    if (!layout) return;
    structureList.forEach(name => {
        const specifiedList = layout[name];
        for (const specifiedName in specifiedList) {
            const buildingList = specifiedList[specifiedName as keyof typeof specifiedList] as LayoutDataNode;
            // 在这里遍历所有建筑，并将costs设置为cost
            buildingList.requireList.forEach(([posStr]) => {
                const coord = PosStr.parseCoord(posStr);
                costMatrix.set(coord.x, coord.y, cost);
            });
        }
    });
}

export function avoidEnemyRooms(
    roomName: string,
    opts?: { swampCost: number; plainCost: number; wallCost: number; roadCost: number }
): boolean | CostMatrix {
    if (Memory.rooms[roomName]?.owner) {
        const owner = Memory.rooms[roomName].owner;
        if (owner !== global.gameUserName) return false;
    }
    return getCostMatrix(roomName, opts);
}

export function isEnemyRoom(roomName: string): boolean {
    if (Memory.rooms[roomName]?.owner) {
        const owner = Memory.rooms[roomName].owner;
        if (owner !== global.gameUserName) return true;
    }
    return false;
}
