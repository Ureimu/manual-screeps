# AcrossTick模块

版本：0.0.2
## 主要用途
这个模块主要是用来执行跨tick任务的，当然也可以执行本tick任务。

**注意：该版本的任务会在global重置时一同重置，所以除非你在重置的tick开头就手动挂载你的任务函数（而不是在执行到newAcrossTickTask函数位置再自动挂载），否则请不要放过于重要的任务。**

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

当然还可以在index内的runAfterTask函数设定在完成任务后的代码。

这个模块可以递归生成任务，可以达到任务链的效果。

该模块默认情况下会在global清空时中断所有任务。

**如果需要保证任务持续执行，请在重置global时在global.AcrossTickTaskFunction上挂载自己的task函数。**
