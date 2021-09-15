import { assert } from "chai";
import { ProjectEngine } from "utils/Project/engine";
import { getSampleData, SampleProject } from "utils/Project/sample";
import { ProjectNetworkDiagram } from "utils/Project/storage";
import { DiagramMemory } from "utils/Project/type";
import { mockConstants } from "./mock";

mockConstants();

describe("Project", () => {
    const diagramTest: DiagramMemory = {};
    describe("storage: ProjectNetworkDiagram should work", () => {
        const diagram = new ProjectNetworkDiagram(diagramTest);
        it("should return right number of out", () => {
            diagram.addNode("first", [ProjectNetworkDiagram.startNodeName]);
            diagram.addNode("second", [ProjectNetworkDiagram.startNodeName]);
            diagram.addNode("third", [ProjectNetworkDiagram.startNodeName]);
            diagram.addNode("fourth", ["second", "third"]);
            assert.equal(diagram.diagramDict[ProjectNetworkDiagram.startNodeName].out.length, 3);
        });

        it("should get right NodeStateList", () => {
            assert.deepStrictEqual(diagram.NodeStateList, ["unplayed", "start", "working", "justFinished", "end"]);
        });

        it("should get right next state", () => {
            assert.equal(diagram.nextState("unplayed"), "start");
            assert.equal(diagram.nextState("start"), "working");
            assert.equal(diagram.nextState("working"), "justFinished");
            assert.equal(diagram.nextState("justFinished"), "end");
        });

        it("should get right num of state node ", () => {
            const nodeList = diagram.getStateNode(["unplayed", "start", "end"]);
            assert.deepStrictEqual(nodeList.end, [ProjectNetworkDiagram.startNodeName]);
            assert.deepStrictEqual(nodeList.unplayed, ["fourth"]);
            assert.isTrue(nodeList.start.length === 3);
        });

        it("should update node state properly ", () => {
            const nodeList = diagram.getStateNode(["unplayed", "start", "end"]);
            assert.deepStrictEqual(nodeList.end, [ProjectNetworkDiagram.startNodeName]);
            assert.deepStrictEqual(nodeList.unplayed, ["fourth"]);
            assert.isTrue(nodeList.start.length === 3);
        });

        describe("should get right node object after multiple time of reset", () => {
            it("first time to reset", () => {
                console.log(Game.time);
                Game.time += 1;
                console.log(Game.time);
                diagram.resetDiagram();
                assert.deepStrictEqual(diagram.diagramDict, {
                    startNode: {
                        in: [],
                        out: [],
                        name: ProjectNetworkDiagram.startNodeName,
                        state: "end",
                        time: {
                            start: Game.time,
                            end: Game.time
                        }
                    }
                });
            });
            it("second time to reset", () => {
                diagram.addNode("first", [ProjectNetworkDiagram.startNodeName]);
                Game.time += 1;
                diagram.resetDiagram();
                assert.deepStrictEqual(diagram.diagramDict, {
                    startNode: {
                        in: [],
                        out: [],
                        name: ProjectNetworkDiagram.startNodeName,
                        state: "end",
                        time: {
                            start: Game.time,
                            end: Game.time
                        }
                    }
                });
            });
        });
    });

    describe("engine: ProjectEngine should work", () => {
        delete diagramTest.diagram;
        const data = getSampleData();
        const diagram = new ProjectNetworkDiagram(diagramTest);
        const engine = new ProjectEngine(data.taskCollection, data.taskRelation, diagram, ["testRoom"]);
        engine.initTaskDiagram();
        assert.equal(Object.keys(data.taskRelation).length + 1, Object.keys(diagram.diagramDict).length);
        engine.run();
        engine.resetTaskDiagram();
    });

    describe("project: Project should work", () => {
        const data = getSampleData();
        const sample = new SampleProject(["testRoom"], ["testRoom"]);
        sample.run();
        assert.equal(Object.keys(data.taskRelation).length + 1, Object.keys(sample.diagram.diagramDict).length);
    });
});
