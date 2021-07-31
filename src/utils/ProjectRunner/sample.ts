import { ProjectNetworkDiagram } from "utils/ProjectNetworkDiagram";
import { ProjectRunner, TaskObject } from "utils/ProjectRunner";
import { registerFN } from "profiler";
import { DiagramMemory } from "utils/ProjectNetworkDiagram/type";

// taskProjectName用于计算cpu消耗
const taskProjectName = "taskProjectExample";

declare global {
    // Types defined in a global block are available globally
    namespace NodeJS {
        interface Global {
            example: DiagramMemory;
        }
    }
}

// 设置Project的存储位置
export type memoryAddressArgs = [string];
const memoryAddress = (...memoryAddressArgs: memoryAddressArgs) => global.example;
export type exampleTaskArgs = [string];
type args = [memoryAddressArgs, exampleTaskArgs];
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

export const taskRelation = {
    [taskExample.name]: [ProjectNetworkDiagram.startNodeName],
    [taskExampleCopy.name]: [ProjectNetworkDiagram.startNodeName, taskExample.name]
};
const unwrappedTaskCollection = {
    taskExample
};
for (const name in unwrappedTaskCollection) {
    const task = unwrappedTaskCollection[name as keyof typeof unwrappedTaskCollection];
    task.start = registerFN(task.start, `${taskProjectName}:${task.name}:start`);
    task.working = registerFN(task.working, `${taskProjectName}:${task.name}:working`);
    task.justFinished = registerFN(task.justFinished, `${taskProjectName}:${task.name}:justFinished`);
}
const taskCollection = unwrappedTaskCollection;

export function runTasks(...args: args): void {
    const [memoryAddressArgs, taskArgs] = args;
    const diagram = new ProjectNetworkDiagram(memoryAddress(...memoryAddressArgs));
    if (Game.time % 300 === 0) {
        // diagram.downloadDiagram();
        console.log(diagram.printDiagram());
    }
    if (diagram.nodeNum <= 1) {
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
    ProjectRunner.run<exampleTaskArgs>(taskCollection, diagram, taskArgs);
}

export function callOnStart(memoryAddressArgs: memoryAddressArgs): void {
    if (memoryAddress(...memoryAddressArgs)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(...memoryAddressArgs));
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
}

export function resetTaskProject(memoryAddressArgs: memoryAddressArgs): void {
    if (memoryAddress(...memoryAddressArgs)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(...memoryAddressArgs));
        ProjectRunner.resetTaskDiagram(taskRelation, diagram);
    }
}
