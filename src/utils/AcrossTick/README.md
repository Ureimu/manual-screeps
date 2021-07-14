# AcrossTick 模块

版本：0.0.2

## 主要用途

这个模块主要是用来执行跨 tick 任务的，当然也可以执行本 tick 任务。

**注意：该版本的任务会在 global 重置时一同重置，所以除非你在重置的 tick 开头就手动挂载你的任务函数（而不是在执行到 newAcrossTickTask 函数位置再自动挂载），否则请不要放过于重要的任务。**

## 示例

先在 main 循环内部加上这条代码，注意不要忘了引入函数

```ts
runAllAcrossTickTask();
```

然后比如现在你要一个 50tick 后每个 tick 执行一次的任务，可以使用 newAcrossTickTask 函数：

```ts
newAcrossTickTask(
    {
        taskName: "routePlan.showRoutes", // 任务名称
        args: [visualExports, roomName, routeName], // 传递的参数，要能够放在memory的类型
        executeTick: Game.time + 1, // 在多久后执行
        intervalTick: 1, // 运行间隔
        log: true // 运行完时是否在控制台输出
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

当然还可以在 index 内的 runAfterTask 函数设定在完成任务后的代码。

这个模块可以递归生成任务，可以达到任务链的效果。

该模块默认情况下会在 global 清空时中断所有任务。

**如果需要保证任务持续执行，请在重置 global 时在 global.AcrossTickTaskFunction 上挂载自己的 task 函数。**
