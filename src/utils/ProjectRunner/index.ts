import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";

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
                const returnCode = taskFunction(...args);
                if (returnCode === "end") {
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
}

export interface TaskObject<T extends unknown[]> {
    name: string;
    description: string;
    start: (...args: T) => TaskState;
    working: (...args: T) => TaskState;
    justFinished: (...args: T) => TaskState;
}

export type TaskState = "running" | "end";

export const template: TaskObject<[Room]> = {
    name: "template",
    description: "A TaskObject template",
    start(room) {
        const controller = room.controller;
        console.log(controller?.level);
        return "end";
    },
    working() {
        return "end";
    },
    justFinished() {
        return "end";
    }
};
