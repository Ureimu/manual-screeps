import { Project } from "./project";
import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectNetworkDiagram } from "./storage";

// 设置Project的存储位置
type memoryAddressArgs = Parameters<(roomName: string) => void>;
type exampleTaskArgs = Parameters<(roomName: string) => void>;
// task的示例
const taskExample: TaskObject<exampleTaskArgs> = {
    name: "taskExample",
    description: "taskExample",
    start(arg0: string) {
        console.log(arg0);
        return "end";
    },
    working() {
        return "end";
    },
    justFinished() {
        return "end";
    }
};
const anotherTaskExample: TaskObject<exampleTaskArgs> = {
    name: "anotherTaskExample",
    description: "anotherTaskExample"
};

const taskRelation = {
    [taskExample.name]: [ProjectNetworkDiagram.startNodeName],
    [anotherTaskExample.name]: [ProjectNetworkDiagram.startNodeName, taskExample.name]
};
const taskCollection = {
    taskExample,
    anotherTaskExample
};
export function getSampleData(): {
    name: string;
    taskRelation: TaskRelation;
    taskCollection: TaskCollection<exampleTaskArgs>;
} {
    return {
        name: "sample",
        taskRelation,
        taskCollection
    };
}
export const sampleDiagramMemory: DiagramMemory = {};
export class SampleProject extends Project<exampleTaskArgs, memoryAddressArgs> {
    public name = "sample";
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<exampleTaskArgs> = taskCollection;
    /**
     *  设置Project的存储位置
     *
     * @returns {DiagramMemory}
     * @memberof SampleProject
     */
    public getMemory(): DiagramMemory {
        return sampleDiagramMemory;
    }
}
