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
export type NodeState = "unplayed" | "start" | "working" | "end";
export interface DiagramDict {
    [name: string]: Node;
}
export interface DiagramMemory {
    diagram?: DiagramDict;
}
declare global {
    namespace NodeJS {
        interface Global {
            cliEnv: boolean;
        }
    }
}
