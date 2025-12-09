import { DiagramMemory, TaskCollection, TaskObject, TaskRelation } from "./type";
import { ProjectEngine } from "./engine";
import { ProjectNetworkDiagram } from "./storage";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("info", "Project");

export abstract class Project<TaskArgs extends unknown[], MemoryAddressArgs extends unknown[]> {
    public constructor(
        /**
         * 项目名称
         *
         * @abstract
         * @type {string}
         * @memberof Project
         */
        public name: string,
        taskArgs: TaskArgs,
        memoryAddressArgs: MemoryAddressArgs
    ) {
        this.memoryAddressArgs = memoryAddressArgs;
        this.taskArgs = taskArgs;
        logger.log(`init project: ${name}, args: ${String(this.taskArgs)}`);
        this.diagram = new ProjectNetworkDiagram(this.getMemory());
        this.getMemory().diagram = this.diagram.diagramDict;
    }

    private engineCache?: ProjectEngine<TaskArgs, MemoryAddressArgs>;
    /**
     * 项目运行的引擎代码。所有节点的状态变化在这里进行
     *
     * @readonly
     * @type {ProjectEngine<TaskArgs>}
     * @memberof Project
     */
    public get engine(): ProjectEngine<TaskArgs, MemoryAddressArgs> {
        if (!this.engineCache)
            this.engineCache = new ProjectEngine(
                this.taskCollection,
                this.taskRelation,
                this.diagram,
                this.taskArgs,
                this
            );
        return this.engineCache;
    }
    /**
     * 统计数据
     *
     * @memberof Project
     */
    public stats = { initTime: 0, runNum: 0 };
    /**
     * 标识是否在这次运行完成之后删除该项目。
     *
     * @type {boolean}
     * @memberof Project
     */
    public hasStopped: boolean = false;
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
    public abstract taskCollection: TaskCollection<TaskArgs, MemoryAddressArgs>;
    /**
     *  设置Project的存储位置
     *
     * @abstract
     * @returns {DiagramMemory}
     * @memberof Project
     */
    public abstract getMemory(): DiagramMemory;
    /**
     *  设置Project的存储位置移除方式
     *
     * @abstract
     * @returns {DiagramMemory}
     * @memberof Project
     */
    public abstract deleteMemory(): void;
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
        if (this.engine.isStopped) {
            this.stop();
        }
        if (!this.hasStopped) {
            this.getMemory().diagram = this.diagram.diagramDict;
        } else {
            this.deleteMemory();
        }
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

    /**
     * 在该次运行完成后，停止项目并调用deleteMemory。
     *
     * @memberof Project
     */
    public stop(): void {
        this.hasStopped = true;
    }
}
