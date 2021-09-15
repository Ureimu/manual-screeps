import loader from "./loader";
import { mermaid } from "./mermaid";
import { Colors, DiagramDict, DiagramMemory, Node, NodeState } from "./type";

export const startNodeName = "startNode";
/**
 * 项目网络图，方便监控任务执行情况和下发任务。
 *
 * @export
 * @class ProjectNetworkDiagram
 */
export class ProjectNetworkDiagram {
    public readonly NodeStateList: NodeState[] = ["unplayed", "start", "working", "justFinished", "end"];
    public static readonly startNodeName = startNodeName;
    public readonly stateColor: Record<NodeState, Colors> = {
        start: "yellow",
        unplayed: "green",
        working: "blue",
        justFinished: "blue",
        end: "red"
    };
    public memoryPath: DiagramMemory;
    public diagramDict: DiagramDict;
    private readonly emptyNode: Node = {
        in: [],
        out: [],
        name: "",
        state: "unplayed",
        time: {
            start: -1,
            end: -1
        }
    };
    private getStartNode(time: number) {
        return {
            in: [],
            out: [],
            name: ProjectNetworkDiagram.startNodeName,
            state: "end",
            time: {
                start: time,
                end: time
            }
        } as Node;
    }
    private readonly Regex = /(?<=\s)([a-zA-Z0-9]+)(?=\s)/g;

    public constructor(memoryPath: DiagramMemory) {
        if (!memoryPath.diagram) {
            memoryPath.diagram = { startNode: this.getStartNode(Game.time) };
        }
        this.memoryPath = memoryPath;
        this.diagramDict = memoryPath.diagram;
    }

    public get nodeNum(): number {
        return Object.keys(this.diagramDict).length;
    }

    public nextState(state: NodeState): NodeState {
        const index = this.NodeStateList.findIndex(nowState => nowState === state);
        if (index + 1 < this.NodeStateList.length) return this.NodeStateList[index + 1];
        else return state;
    }

    /**
     * 添加节点。
     *
     * @param {string} nodeName
     * @param {string[]} preNodeNameList 前置节点列表
     * @memberof ProjectNetworkDiagram
     */
    public addNode(nodeName: string, preNodeNameList: string[]): void {
        if (nodeName === ProjectNetworkDiagram.startNodeName)
            throw Error(`起始节点不需要初始化，请不要对起始节点调用addNode方法`);
        if (nodeName in this.diagramDict) return; // 如果已经有该节点，则不重复添加
        const newNode = _.cloneDeep(this.emptyNode); // 一定要clone
        newNode.name = nodeName;
        preNodeNameList.forEach(name => {
            if (name === nodeName) {
                throw Error(`节点： ${nodeName} 的前置节点 ${name} 重名`);
            }
            if (!this.diagramDict[name])
                throw Error(`节点： ${nodeName} 的前置节点 ${name} 不存在，请先初始化该前置节点`);
            const outSet = new Set<string>(this.diagramDict[name].out);
            outSet.add(nodeName);
            this.diagramDict[name].out = Array.from(outSet);
        });
        const inSet = new Set<string>(preNodeNameList);
        inSet.delete(nodeName);
        newNode.in = Array.from(inSet);
        if (newNode.in.every(inNodeName => this.diagramDict[inNodeName].state === "end")) {
            newNode.state = "start";
            newNode.time.start = Game.time;
        }
        this.diagramDict[newNode.name] = newNode;
    }

    /**
     * 更新节点状态。unplayed=>start的状态在该函数内部自动触发，不应主动更改节点状态，而其他状态转换直接调用该函数即可触发。
     * 每次调用会自动转换到下一个状态并返回这个状态的字符串。
     * 当该节点的所有前置节点都进入end状态后，该节点状态会由unplayed=>start。
     *
     * @param {string} nodeName
     * @param {NodeState} state
     * @memberof ProjectNetworkDiagram
     */
    public updateNodeState(nodeName: string): NodeState {
        const nodeState = this.diagramDict[nodeName].state;
        const newState = this.nextState(nodeState);
        if (newState === "start" && nodeState === "unplayed") {
            throw new Error(`${nodeName} 状态更新错误：${nodeState}-->${newState}不应手动更新`);
        }
        return this.changeNodeState(nodeName, newState);
    }

    private changeNodeState(nodeName: string, state: NodeState): NodeState {
        this.diagramDict[nodeName].state = state;
        switch (state) {
            case "start":
                if (this.diagramDict[nodeName].time.start === -1) this.diagramDict[nodeName].time.start = Game.time;
                break;
            case "end":
                if (this.diagramDict[nodeName].time.end === -1) this.diagramDict[nodeName].time.end = Game.time;
                this.diagramDict[nodeName].out.forEach(outNodeName => {
                    if (
                        this.diagramDict[outNodeName].in.every(
                            inNodeName => this.diagramDict[inNodeName].state === "end"
                        )
                    ) {
                        this.changeNodeState(outNodeName, "start");
                    }
                });
                break;
            default:
                break;
        }
        return state;
    }

    public getStateNode<T extends NodeState>(requireStateList: T[]): Record<T, string[]> {
        const returnObject: Partial<Record<T, string[]>> = {};
        for (const state of requireStateList) {
            const workingNodeList: string[] = [];
            for (const nodeName in this.diagramDict) {
                if (this.diagramDict[nodeName].state === state) workingNodeList.push(this.diagramDict[nodeName].name);
            }
            returnObject[state] = workingNodeList;
        }
        return returnObject as Record<T, string[]>;
    }

    public resetDiagram(): void {
        this.memoryPath.diagram = { startNode: this.getStartNode(Game.time) };
        this.diagramDict = this.memoryPath.diagram;
    }

    private getNodeContent(nodeName: string): string {
        const nodeContentList: string[] = [];
        const node = this.diagramDict[nodeName];
        nodeContentList.push(`${nodeName}`);
        nodeContentList.push(`state:${node.state}`);
        if (node.time.start !== -1) nodeContentList.push(`start:${node.time.start}`);
        if (node.time.end !== -1) nodeContentList.push(`end:${node.time.end}`);
        if (node.time.start !== -1 && node.time.end !== -1)
            nodeContentList.push(`time of duration:${node.time.end - node.time.start}`);
        return nodeContentList.join("<br/>"); // mermaid需要使用html换行符
    }

    public getDiagramCode(markdown: boolean): string {
        const mermaidDiagram = new mermaid();
        mermaidDiagram.chooseDirection("top bottom");
        for (const nodeName in this.diagramDict) {
            mermaidDiagram.setNodeText(nodeName, this.getNodeContent(nodeName), { boxStyle: "rounded rectangle" });
            mermaidDiagram.setNodeStyle(nodeName, {
                fill: this.stateColor[this.diagramDict[nodeName].state],
                stroke: "#333",
                strokeWidth: "2px"
            });
        }
        for (const nodeName in this.diagramDict) {
            this.diagramDict[nodeName].out.forEach(outNodeName => mermaidDiagram.addEdge(nodeName, outNodeName));
        }
        if (markdown) {
            return mermaidDiagram.printMarkdownCode();
        }
        return mermaidDiagram.printCode();
    }

    public printDiagram(): string {
        return mermaid.showInBrowser(this.getDiagramCode(false));
    }

    public downloadDiagram(): void {
        loader.download(this.getDiagramCode(true), `diagram${Game.time}.md`);
    }
}
