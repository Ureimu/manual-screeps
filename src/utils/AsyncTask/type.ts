declare global {
    interface Memory {
        AsyncTask: { [taskName: string]: AwaitedTask };
    }
    namespace NodeJS {
        interface Global {
            AsyncTaskFunction: {
                [taskName: string]: (task: AwaitedTask) => void;
            };
            AsyncTask: { [taskName: string]: AwaitedTask };
        }
    }
}

export interface AwaitedTask {
    /**
     * 任务名称，为任务的唯一标识符。
     */
    taskName: string;
    /**
     * 函数名称。
     */
    funcName: string;
    /**
     * 参数列表。
     */
    args: unknown[];
    /**
     * 是否将task存在global上。
     */
    useGlobal?: boolean;
    /**
     * 是否在执行完后删除task。
     */
    isPermanent?: boolean;
}
