import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { DiagramMemory } from "utils/ProjectNetworkDiagram/type";

export function maintainRoom(): void {
    _.forEach(Game.rooms, room => {
        if (room.controller?.my && room.find(FIND_MY_SPAWNS).length !== 0) {
            if (!room.memory.AIUreium || !room.memory.AIUreium.maintainRoom)
                room.memory.AIUreium = { maintainRoom: {} };
            const diagram = new ProjectNetworkDiagram(room.memory.AIUreium.maintainRoom);
            if (Game.time % 15 === 0) {
                diagram.addNode("first", [diagram.startNodeName]);
                diagram.addNode("second", [diagram.startNodeName]);
                diagram.addNode("third", ["second"]);
                console.log(diagram.printDiagram());
                console.log(diagram.downloadDiagram());
            }

            const stateNodes = diagram.getStateNode(["start", "working"]);
        }
    });
}

declare global {
    // Types defined in a global block are available globally
    interface RoomMemory {
        AIUreium: {
            maintainRoom: DiagramMemory;
        };
    }
}
