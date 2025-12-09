import { profile } from "utils/profiler/decorator";
import type { Project } from ".";
import { ProjectNetworkDiagram } from "./storage";
import { NodeState, TaskCollection, TaskRelation } from "./type";
export interface NodeUpdateData {
    [nodeName: string]: { stateList: NodeState[] };
}
export interface ProjectEngineStats {
    initTime: number;
    runNum: number;
}

export class ProjectEngine<TaskArgs extends unknown[], MemoryAddressArgs extends unknown[]> {
    public project: Project<TaskArgs, MemoryAddressArgs>;
    public taskCollection: TaskCollection<TaskArgs, MemoryAddressArgs>;
    public taskDiagram: ProjectNetworkDiagram;
    public taskRelation: TaskRelation;
    public taskArgs: TaskArgs;
    public stats: ProjectEngineStats = { initTime: Game.time, runNum: 0 };
    private stateList: ["start", "working", "justFinished"] = ["start", "working", "justFinished"];
    public isStopped: boolean = false;

    public constructor(
        taskCollection: TaskCollection<TaskArgs, MemoryAddressArgs>,
        taskRelation: TaskRelation,
        taskDiagram: ProjectNetworkDiagram,
        taskArgs: TaskArgs,
        project: Project<TaskArgs, MemoryAddressArgs>
    ) {
        this.taskArgs = taskArgs;
        this.taskDiagram = taskDiagram;
        this.taskRelation = taskRelation;
        this.taskCollection = taskCollection;
        this.project = project;
    }

    public run(): NodeUpdateData {
        const nodeUpdateData: NodeUpdateData = {};

        while (this.runOnce(nodeUpdateData)) {
            this.stats.runNum++;
        }
        return nodeUpdateData;
    }

    private runOnce(nodeUpdateData: NodeUpdateData): boolean {
        const stateNodeGroup = this.taskDiagram.getStateNode(this.stateList);
        let ifRunOnceMore = false;
        this.stateList.forEach(stateName => {
            stateNodeGroup[stateName].forEach(nodeName => {
                if (!this.taskCollection[nodeName]) throw new Error(`${nodeName}不存在于taskCollection内`);
                const taskFunction = this.taskCollection[nodeName][stateName];
                if (taskFunction) {
                    const returnTaskStateCode = taskFunction.apply(this.project, this.taskArgs);
                    if (returnTaskStateCode === "end") {
                        if (!nodeUpdateData[nodeName]) {
                            nodeUpdateData[nodeName] = {
                                stateList: [
                                    this.taskDiagram.diagramDict[nodeName].state,
                                    this.taskDiagram.updateNodeState(nodeName)
                                ]
                            };
                        } else {
                            nodeUpdateData[nodeName].stateList.push(this.taskDiagram.updateNodeState(nodeName));
                        }
                        ifRunOnceMore = true;
                    }
                    if (returnTaskStateCode === "stopProject") {
                        this.isStopped = true;
                    }
                } else {
                    this.taskDiagram.updateNodeState(nodeName);
                    ifRunOnceMore = true;
                }
            });
        });
        return ifRunOnceMore;
    }

    public initTaskDiagram(): void {
        for (const taskNodeName in this.taskRelation) {
            this.taskDiagram.addNode(taskNodeName, this.taskRelation[taskNodeName]);
        }
    }

    public resetTaskDiagram(): void {
        this.taskDiagram.resetDiagram();
        this.initTaskDiagram();
    }
}
