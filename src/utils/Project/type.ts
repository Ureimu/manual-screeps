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
export interface DiagramMemory {
    diagram?: DiagramDict;
}

/**
 * 任务对象
 *
 * @export
 * @interface TaskObject
 * @template T
 */
export interface TaskObject<T extends unknown[]> {
    name: string;
    description: string;
    start?: (...args: T) => TaskState;
    working?: (...args: T) => TaskState;
    justFinished?: (...args: T) => TaskState;
}

export type TaskState = "running" | "end";

export interface TaskRelation {
    [x: string]: string[];
}

export interface TaskCollection<T extends unknown[]> {
    [x: string]: TaskObject<T>;
}

export type Colors = "red" | "green" | "yellow" | "blue";
