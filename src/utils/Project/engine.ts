import { ProjectNetworkDiagram } from "./storage";
import { TaskObject } from "./type";

export class ProjectRunner {
    public static run<T extends unknown[]>(
        taskCollection: { [name: string]: TaskObject<T> },
        taskDiagram: ProjectNetworkDiagram,
        args: T
    ): void {
        const stateList: ("start" | "working" | "justFinished")[] = ["start", "working", "justFinished"];
        const stateNodeGroup = taskDiagram.getStateNode(["start", "working", "justFinished"]);
        stateList.forEach(stateName => {
            stateNodeGroup[stateName].forEach(nodeName => {
                if (!taskCollection[nodeName]) throw new Error(`${nodeName}不存在于taskCollection内`);
                const taskFunction = taskCollection[nodeName][stateName];
                if (taskFunction) {
                    const returnCode = taskFunction(...args);
                    if (returnCode === "end") {
                        taskDiagram.updateNodeState(nodeName, taskDiagram.nextState(stateName));
                    }
                } else {
                    taskDiagram.updateNodeState(nodeName, taskDiagram.nextState(stateName));
                }
            });
        });
    }

    public static initTaskDiagram(
        taskNodeCollection: { [name: string]: string[] },
        taskDiagram: ProjectNetworkDiagram
    ): void {
        for (const taskNodeName in taskNodeCollection) {
            taskDiagram.addNode(taskNodeName, taskNodeCollection[taskNodeName]);
        }
    }

    public static resetTaskDiagram(
        taskNodeCollection: { [name: string]: string[] },
        taskDiagram: ProjectNetworkDiagram
    ): void {
        taskDiagram.resetDiagram();
        this.initTaskDiagram(taskNodeCollection, taskDiagram);
    }
}
