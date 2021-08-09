import { Project } from "./project";
import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectNetworkDiagram } from "./storage";

declare global {
    // Types defined in a global block are available globally
    namespace NodeJS {
        interface Global {
            example: DiagramMemory;
        }
    }
}

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
const taskExampleCopy = taskExample;

const taskRelation = {
    [taskExample.name]: [ProjectNetworkDiagram.startNodeName],
    [taskExampleCopy.name]: [ProjectNetworkDiagram.startNodeName, taskExample.name]
};
const unwrappedTaskCollection = {
    taskExample
};
export class SampleProject extends Project<exampleTaskArgs, memoryAddressArgs> {
    public name = "sample";
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<exampleTaskArgs> = unwrappedTaskCollection;
    /**
     *  设置Project的存储位置
     *
     * @returns {DiagramMemory}
     * @memberof SampleProject
     */
    public getMemory(): DiagramMemory {
        return global.example;
    }
}

export const projects = ["E24N56", "E22N55"].map(roomName => new SampleProject([roomName], [roomName]));
projects.forEach(project => project.runTasks());
