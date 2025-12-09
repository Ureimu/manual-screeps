import { Project } from "./project";
import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectNetworkDiagram } from "./storage";

// 设置Project的存储位置
type memoryAddressArgs = Parameters<(roomName: string) => void>;
type exampleTaskArgs = Parameters<(roomName: string) => void>;
type memoryType = { a: number };
// task的示例
const taskExample: TaskObject<exampleTaskArgs, memoryAddressArgs, memoryType> = {
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
const anotherTaskExample: TaskObject<exampleTaskArgs, memoryAddressArgs, memoryType> = {
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
    taskCollection: TaskCollection<exampleTaskArgs, memoryAddressArgs, memoryType>;
} {
    return {
        name: "sample",
        taskRelation,
        taskCollection
    };
}
export const sampleDiagramMemory: DiagramMemory<memoryType> = {};
export class SampleProject extends Project<exampleTaskArgs, memoryAddressArgs, memoryType> {
    public constructor(taskArgs: exampleTaskArgs, memoryAddressArgs: memoryAddressArgs) {
        super("sample", taskArgs, memoryAddressArgs);
        // this.wrapTaskCollection(); // 注册所有task到profiler模块，可选
    }
    public taskRelation: TaskRelation = taskRelation;
    public taskCollection: TaskCollection<exampleTaskArgs, memoryAddressArgs, memoryType> = taskCollection;
    /**
     *  设置Project的存储位置
     *
     * @returns {DiagramMemory}
     * @memberof SampleProject
     */
    public getMemoryStorage(): DiagramMemory<memoryType> {
        return sampleDiagramMemory;
    }
    public deleteMemoryStorage() {
        const [originRoomName] = this.taskArgs;
        if (typeof sampleDiagramMemory === "object") {
            // should write delete logic here.
            // delete sampleDiagramMemory;
        }
    }
}
