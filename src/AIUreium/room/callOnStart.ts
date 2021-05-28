import { callOnStart as updateTaskRelation } from "./maintain/taskRelation";

const functionList: ((room: Room) => void)[] = [updateTaskRelation];

export function callOnStart(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            functionList.forEach(func => func(room));
        }
    });
}
