# AcrossTick模块

## 主要用途
这个模块主要是用来执行跨tick任务的，当然也可以执行本tick任务。

## 示例
先在main循环内部加上这条代码，注意不要忘了引入函数
```ts
runAllAcrossTickTask();
```
然后比如现在你要一个50tick后每个tick执行一次的任务，可以使用newAcrossTickTask函数：
```ts
newAcrossTickTask(
    {
        taskName: "routePlanCommit.showRoutes", // 任务名称
        args: [visualExports, roomName, routeName], // 传递的参数，要能够放在memory的类型
        executeTick: Game.time + 1, // 在多久后执行
        intervalTick: 1 // 运行间隔
    },
    task => {
        const [visualExportsArg, roomNameArg, routeNameArg] = task.args as string[]; // 注意这边的参数不要和上面的args重名
        if (Memory.routes[routeNameArg].ifShow) {
            const roomVisual = new RoomVisual(roomNameArg);
            roomVisual.import(visualExportsArg);
            return "runAgain";
        } else {
            return "finish";
        }
    }
);
```

当然还可以在runAfterTask.ts文件设定在完成任务后的代码。

这个模块可以递归生成任务，可以达到任务链的效果。

