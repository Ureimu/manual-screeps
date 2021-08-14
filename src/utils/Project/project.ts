import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectEngine } from "./engine";
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
    private engineCache?: ProjectEngine<TaskArgs>;
    /**
     * 项目运行的引擎代码。所有节点的状态变化在这里进行
     *
     * @readonly
     * @type {ProjectEngine<TaskArgs>}
     * @memberof Project
     */
    public get engine(): ProjectEngine<TaskArgs> {
        if (!this.engineCache)
            this.engineCache = new ProjectEngine(this.taskCollection, this.taskRelation, this.diagram, this.taskArgs);
        return this.engineCache;
    }
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
    private init(): void {
        if (this.stats.initTime === 0) {
            this.stats.initTime = Game.time;
        }
        this.engine.initTaskDiagram();
        this.getMemory().diagram = this.diagram.diagramDict;
    }
    /**
     * 运行项目
     *
     * @memberof Project
     */
    public run(): void {
        if (this.stats.runNum <= 1) {
            this.init();
        }
        this.engine.run();
        this.getMemory().diagram = this.diagram.diagramDict;
        this.stats.runNum++;
    }
    /**
     * 重置项目
     *
     * @memberof Project
     */
    public reset(): void {
        if (this.getMemory()) {
            this.engine.resetTaskDiagram();
            this.getMemory().diagram = this.diagram.diagramDict;
        }
    }
}
