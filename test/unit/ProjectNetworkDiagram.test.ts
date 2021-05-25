import { assert } from "chai";
import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { DiagramMemory } from "utils/ProjectNetworkDiagram/type";
import { Game, mockConstants } from "./mock";
mockConstants();
describe("ProjectNetworkDiagram", () => {
    global.diagramTest = {};
    global.cliEnv = true;
    (global.Game as unknown as Partial<typeof Game>) = Game;
    const diagram = new ProjectNetworkDiagram(global.diagramTest);
    it("should return right number of out", () => {
        diagram.addNode("first", [ProjectNetworkDiagram.startNodeName]);
        diagram.addNode("second", [ProjectNetworkDiagram.startNodeName]);
        diagram.addNode("third", [ProjectNetworkDiagram.startNodeName]);
        diagram.addNode("fourth", ["second", "third"]);
        assert.isTrue(diagram.diagram[ProjectNetworkDiagram.startNodeName].out.length === 3);
        console.log(diagram.printDiagram());
    });
});

declare global {
    namespace NodeJS {
        interface Global {
            diagramTest: DiagramMemory;
        }
    }
}
