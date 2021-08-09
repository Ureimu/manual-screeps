import { registerFN } from "profiler";
import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectRunner } from "./engine";
import { ProjectNetworkDiagram } from "./storage";

export abstract class Project<TaskArgs extends unknown[], MemoryAddressArgs extends unknown[]> {
    public constructor(taskArgs: TaskArgs, memoryAddressArgs: MemoryAddressArgs) {
        this.memoryAddressArgs = memoryAddressArgs;
        this.taskArgs = taskArgs;
        console.log(this.taskArgs);
        this.diagram = new ProjectNetworkDiagram(this.getMemory());
        this.getMemory().diagram = this.diagram.diagramDict;
    }
    /**
     * 项目名称
     *
     * @abstract
     * @type {string}
     * @memberof Project
     */
    public abstract name: string;
    /**
     * 统计数据
     *
     * @memberof Project
     */
    public stats = { initTime: 0, runNum: 0, hasWrapped: false };
    /**
     * 项目网络图数据
     *
     * @type {ProjectNetworkDiagram}
     * @memberof Project
     */
    public diagram: ProjectNetworkDiagram;
    /**
     * 存储地址
     *
     * @abstract
     * @type {MemoryAddressArgs}
     * @memberof Project
     */
    public memoryAddressArgs: MemoryAddressArgs;
    /**
     * 任务参数
     *
     * @abstract
     * @type {TaskArgs}
     * @memberof Project
     */
    public taskArgs: TaskArgs;
    /**
     * 任务关系
     *
     * @abstract
     * @type {TaskRelation}
     * @memberof Project
     */
    public abstract taskRelation: TaskRelation;
    /**
     * 任务集合
     *
     * @abstract
     * @type {TaskCollection<TaskArgs>}
     * @memberof Project
     */
    public abstract taskCollection: TaskCollection<TaskArgs>;
    /**
     *  设置Project的存储位置
     *
     * @abstract
     * @returns {DiagramMemory}
     * @memberof Project
     */
    public abstract getMemory(): DiagramMemory;
    private run(): void {
        ProjectRunner.run<TaskArgs>(this.taskCollection, this.diagram, this.taskArgs);
        this.getMemory().diagram = this.diagram.diagramDict;
        this.stats.runNum++;
    }
    private init(): void {
        if (this.stats.initTime === 0) {
            this.stats.initTime = Game.time;
        }
        ProjectRunner.initTaskDiagram(this.taskRelation, this.diagram);
        this.getMemory().diagram = this.diagram.diagramDict;
    }
    /**
     * 运行项目
     *
     * @memberof Project
     */
    public runTasks(): void {
        if (this.stats.runNum <= 1) {
            this.init();
        }
        this.run();
    }
    /**
     * 在初始化时调用
     *
     * @memberof Project
     */
    public callOnStart(): void {
        if (this.getMemory()) {
            this.init();
        }
    }
    /**
     * 重置项目
     *
     * @memberof Project
     */
    public reset(): void {
        if (this.getMemory()) {
            ProjectRunner.resetTaskDiagram(this.taskRelation, this.diagram);
            this.getMemory().diagram = this.diagram.diagramDict;
        }
    }
    /**
     * 包装任务集合以方便获取性能数据
     *
     * @memberof Project
     */
    public wrapTaskCollection(): void {
        const stateList = ["start", "working", "justFinished"] as (keyof Pick<
            TaskObject<TaskArgs>,
            "start" | "working" | "justFinished"
        >)[];
        if (!this.stats.hasWrapped && this.taskCollection) {
            Object.entries(this.taskCollection).forEach(taskEntity => {
                const task = taskEntity[1];
                stateList.forEach(state => {
                    const stateFunction = task[state];
                    if (stateFunction && !(stateFunction as { profilerWrapped?: boolean }).profilerWrapped) {
                        task[state] = registerFN(stateFunction, `${this.name}:${task.name}:${state}`);
                    }
                });
            });
            this.stats.hasWrapped = true;
        }
    }
}
