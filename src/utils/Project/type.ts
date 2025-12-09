import { Project } from ".";

/**
 * 任务节点
 *
 * @export
 * @interface Node
 */
export interface Node {
    in: string[];
    out: string[];
    name: string;
    state: NodeState;
    time: TimeState;
}

export interface TimeState {
    start: number;
    end: number;
}
export type NodeState = "unplayed" | "start" | "working" | "justFinished" | "end";
export interface DiagramDict {
    [name: string]: Node;
}
export interface DiagramMemory<ProjectMemoryType extends unknown> {
    diagram?: DiagramDict;
    memory?: ProjectMemoryType;
}

/**
 * 任务对象
 *
 * @export
 * @interface TaskObject
 * @template T
 */
export interface TaskObject<
    TaskArgs extends unknown[],
    MemoryAddressArgs extends unknown[],
    ProjectMemoryType extends unknown
> {
    /**
     * 和对象名称应一致
     *
     * @type {string}
     * @memberof TaskObject
     */
    name: string;
    description: string;
    start?: (this: Project<TaskArgs, MemoryAddressArgs, ProjectMemoryType>, ...args: TaskArgs) => TaskState;
    working?: (this: Project<TaskArgs, MemoryAddressArgs, ProjectMemoryType>, ...args: TaskArgs) => TaskState;
    justFinished?: (this: Project<TaskArgs, MemoryAddressArgs, ProjectMemoryType>, ...args: TaskArgs) => TaskState;
}

export type TaskState = "running" | "end" | "stopProject";

export interface TaskRelation {
    [x: string]: string[];
}

export interface TaskCollection<
    TaskArgs extends unknown[],
    MemoryAddressArgs extends unknown[],
    ProjectMemoryType extends unknown
> {
    [x: string]: TaskObject<TaskArgs, MemoryAddressArgs, ProjectMemoryType>;
}

export type Colors = "red" | "green" | "yellow" | "blue";
