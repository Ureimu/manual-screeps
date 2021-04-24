import { AcrossTickMemory } from "./type";

export function runTask(task: AcrossTickMemory): string {
    switch (task.taskName) {
        case "": {
            console.log(`An empty task was detected`);
            return "emptyTask";
        }
        case "test": {
            console.log(
                `${Game.time} Running TickTask: ${task.taskName},args:${JSON.stringify(task.args)} created in ${
                    task.taskCreateTick as number
                } succeed`
            );
            return "finish";
        }
        case "routePlanCommit.showRoutes": {
            // console.log(
            //     `${Game.time} Running TickTask: ${task.taskName},args:${JSON.stringify(task.args)} created in ${
            //         task.taskCreateTick as number
            //     } succeed`
            // );
            const [visualExports, roomName, routeName] = task.args as string[];
            if (Memory.routes[routeName].ifShow) {
                const roomVisual = new RoomVisual(roomName);
                roomVisual.import(visualExports);
                return "runAgain";
            } else {
                return "finish";
            }
        }
        default:
            return "finish";
    }
}
