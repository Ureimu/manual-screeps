import { TaskObject } from "utils/Project";
import { maintainRoomTaskArgs } from "../../type";

export function controllerLevelUpgradedTo(level: number): TaskObject<maintainRoomTaskArgs> {
    return {
        name: `controllerLevelUpgradedTo${level}`,
        description: `controllerLevelUpgradedTo${level}`,
        working(roomName) {
            const room = Game.rooms[roomName];
            if ((room.controller?.level ?? 0) >= level) {
                return "end";
            }
            return "running";
        }
    };
}
