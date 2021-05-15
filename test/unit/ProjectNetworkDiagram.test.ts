import { assert } from "chai";
import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { DiagramMemory } from "utils/ProjectNetworkDiagram/type";

describe("ProjectNetworkDiagram", () => {
    global.diagramTest = {};
    global.cliEnv = true;
    const diagram = new ProjectNetworkDiagram(global.diagramTest);
    it("should return right number of out", () => {
        diagram.addNode("first", [diagram.startNodeName]);
        diagram.addNode("second", [diagram.startNodeName]);
        diagram.addNode("third", [diagram.startNodeName]);
        diagram.addNode("fourth", ["second", "third"]);
        assert.isTrue(diagram.diagram[diagram.startNodeName].out.length === 3);
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
