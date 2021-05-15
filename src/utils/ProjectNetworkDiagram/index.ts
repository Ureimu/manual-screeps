import { Colors } from "utils/console/colorful";
import loader from "utils/loader";
import { mermaid } from "utils/mermaid";
import { DiagramDict, DiagramMemory, Node, NodeState } from "./type";

/**
 * 项目网络图，方便监控任务执行情况和下发任务。
 *
 * @export
 * @class ProjectNetworkDiagram
 */
export class ProjectNetworkDiagram {
    public readonly startNodeName = "startNode";
    public readonly stateColor: Record<NodeState, Colors> = {
        start: "yellow",
        unplayed: "green",
        working: "blue",
        end: "red"
    };
    public memoryPath: DiagramMemory;
    public diagram: DiagramDict;
    private readonly emptyNode: Node = {
        in: [],
        out: [],
        name: "",
        state: "unplayed"
    };
    private startNode: Node = {
        in: [],
        out: [],
        name: this.startNodeName,
        state: "end"
    };
    private readonly Regex = /(?<=\s)([a-zA-Z0-9]+)(?=\s)/g;

    public constructor(memoryPath: DiagramMemory) {
        if (!memoryPath.diagram) {
            memoryPath.diagram = { startNode: this.startNode };
        }
        this.memoryPath = memoryPath;
        this.diagram = memoryPath.diagram;
    }

    /**
     * 添加节点。
     *
     * @param {string} nodeName
     * @param {string[]} preNodeNameList 前置节点列表
     * @memberof ProjectNetworkDiagram
     */
    public addNode(nodeName: string, preNodeNameList: string[]): void {
        const newNode = _.cloneDeep(this.emptyNode); // 一定要clone
        newNode.name = nodeName;
        preNodeNameList.forEach(name => {
            const outSet = new Set<string>(this.diagram[name].out);
            outSet.add(nodeName);
            this.diagram[name].out = Array.from(outSet);
        });
        const inSet = new Set<string>(preNodeNameList);
        inSet.delete(nodeName);
        if (nodeName === "4") console.log(nodeName, JSON.stringify(this.diagram, undefined, 4));
        newNode.in = Array.from(inSet);
        if (nodeName === "4") console.log(nodeName, JSON.stringify(this.diagram, undefined, 4));
        if (newNode.in.every(inNodeName => this.diagram[inNodeName].state === "end")) {
            newNode.state = "start";
        }
        this.diagram[newNode.name] = newNode;
    }

    /**
     * 更新节点状态。unplayed=>start的状态由该函数处理，而其他状态转换由使用者使用该函数自行实现。
     * 当该节点的所有前置节点都进入end状态后，该节点状态会由unplayed=>start。
     *
     * @param {string} nodeName
     * @param {NodeState} state
     * @memberof ProjectNetworkDiagram
     */
    public updateNodeState(nodeName: string, state: NodeState): void {
        this.diagram[nodeName].state = state;
        if (state === "end") {
            this.diagram[nodeName].out.forEach(outNodeName => {
                return this.diagram[outNodeName].in.every(inNodeName => this.diagram[inNodeName].state === "end")
                    ? (this.diagram[outNodeName].state = "start")
                    : undefined;
            });
        }
    }

    public getStateNode<T extends NodeState>(requireStateList: T[]): Record<T, string[]> {
        const returnObject: Partial<Record<T, string[]>> = {};
        for (const state of requireStateList) {
            const workingNodeList: string[] = [];
            for (const nodeName in this.diagram) {
                if (this.diagram[nodeName].state === state) workingNodeList.push(this.diagram[nodeName].name);
            }
            returnObject[state] = workingNodeList;
        }
        return returnObject as Record<T, string[]>;
    }

    private getNodeContent(nodeName: string): string {
        return `${nodeName}(${this.diagram[nodeName].state})`;
    }

    public printDiagram(): void {
        const mermaidDiagram = new mermaid();
        mermaidDiagram.chooseDirection("top bottom");
        for (const nodeName in this.diagram) {
            this.diagram[nodeName].out.forEach(outNodeName =>
                mermaidDiagram.addEdge(
                    nodeName,
                    this.getNodeContent(nodeName),
                    outNodeName,
                    this.getNodeContent(outNodeName)
                )
            );
            mermaidDiagram.setNodeStyle(nodeName, {
                fill: this.stateColor[this.diagram[nodeName].state],
                stroke: "#333",
                strokeWidth: "2px"
            });
        }
        return loader.download(mermaidDiagram.draw(), "mermaidDiagram.md");
    }
}
