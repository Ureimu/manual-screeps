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
const memoryAddress = (originRoom: Room, sourceRoomName: string) => global.example;
export type outwardsSourceTaskArgs = [Room, string];
// task的示例
const taskExample: TaskObject<outwardsSourceTaskArgs> = {
    name: "taskExample",
    description: "taskExample",
    start() {
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

export function runTasks(originRoom: Room, sourceRoomName: string): void {
    const diagram = new ProjectNetworkDiagram(memoryAddress(originRoom, sourceRoomName));
    if (Game.time % 300 === 0) {
        // diagram.downloadDiagram();
        console.log(diagram.printDiagram());
    }
    if (diagram.nodeNum <= 1) {
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
    ProjectRunner.run<outwardsSourceTaskArgs>(taskCollection, diagram, [originRoom, sourceRoomName]);
}

export function callOnStart(originRoom: Room, sourceRoomName: string): void {
    if (memoryAddress(originRoom, sourceRoomName)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(originRoom, sourceRoomName));
        ProjectRunner.initTaskDiagram(taskRelation, diagram);
    }
}

export function resetTaskProject(originRoom: Room, sourceRoomName: string): void {
    if (memoryAddress(originRoom, sourceRoomName)) {
        const diagram = new ProjectNetworkDiagram(memoryAddress(originRoom, sourceRoomName));
        ProjectRunner.resetTaskDiagram(taskRelation, diagram);
    }
}
