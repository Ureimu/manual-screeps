import { getFlagList } from "frame/flagMaintainer/maintainer";

export const CostMatrixOpts = {
    plainCost: 2,
    swampCost: 10,
    costCallback, // Room.find
    roomCallback // PathFinder
};

function costCallback(roomName: string, CostMatrix: CostMatrix): void {
    const room = Game.rooms[roomName];
    if (!room) return;
    callback(roomName, CostMatrix);
}

function roomCallback(roomName: string): void {
    const room = Game.rooms[roomName];
    if (!room) return;
    const CostMatrix = new PathFinder.CostMatrix();
    callback(roomName, CostMatrix);
}

function callback(roomName: string, CostMatrix: CostMatrix): void {
    const room = Game.rooms[roomName];
    if (!room) return;
    room.find(FIND_STRUCTURES).forEach(function (structure) {
        if (structure.structureType === STRUCTURE_ROAD) {
            // 相对于平原，寻路时将更倾向于道路
            CostMatrix.set(structure.pos.x, structure.pos.y, 1);
        } else if (
            structure.structureType !== STRUCTURE_CONTAINER &&
            (structure.structureType !== STRUCTURE_RAMPART || !structure.my)
        ) {
            // 不能穿过无法行走的建筑
            CostMatrix.set(structure.pos.x, structure.pos.y, 0xff);
        }
    });
    // 把source的Container移动值设置高一点，减少不必要的对穿
    const flagList = getFlagList(room, ["container"]).container;
    flagList.forEach(value => {
        CostMatrix.set(Game.flags[value].pos.x, Game.flags[value].pos.y, 20);
    });
}
