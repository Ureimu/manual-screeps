import { AwaitedTask } from "./type";

export class AsyncTask {
    public static runAsyncTask(taskName: string) {
        const task = Memory.AsyncTask?.[taskName] ?? global.AsyncTask?.[taskName];
        if (!task) throw new Error(`no task:${taskName} in AsyncTask list`);
        global.AsyncTaskFunction[task.funcName](task);
        if (!task.isPermanent) {
            if (task.useGlobal) delete global.AsyncTask[task.taskName];
            else delete Memory.AsyncTask[task.taskName];
        }
    }

    public static mountAsyncFunction(funcName: string, func: (task: AwaitedTask) => void) {
        if (!global.AsyncTaskFunction) global.AsyncTaskFunction = {};
        global.AsyncTaskFunction[funcName] = func;
    }

    public static registerAsyncTask(task: AwaitedTask) {
        if (task.useGlobal) {
            if (!global.AsyncTask) global.AsyncTask = {};
            global.AsyncTask[task.taskName] = task;
        } else {
            if (!Memory.AsyncTask) Memory.AsyncTask = {};
            Memory.AsyncTask[task.taskName] = task;
        }
    }
}
