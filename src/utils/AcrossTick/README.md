# AcrossTick模块

## 主要用途
这个模块主要是用来执行跨tick任务的，当然也可以执行本tick任务。

## 示例
先在main循环内部加上这条代码，注意不要忘了引入函数
```js
runAllAcrossTickTask();
```
然后比如现在你要一个50tick后每个tick执行一次的任务，可以这样设置任务：
```js
const acrossTickTask = new AcrossTick();
acrossTickTask.runAfterTicks({
    taskName: "manageOutwardsSource.getPathLength",//任务名称
    args: [roomName, sourceName, room.name],//传递的参数，要能够放在memory的类型
    executeTick: Game.time+50, //执行时间
    intervalTick: 1 //执行间隔
});
acrossTickTask.finish();
```
也可以使用newAcrossTickTask函数：
```js
newAcrossTickTask({
    taskName: "manageOutwardsSource.getPathLength",//任务名称
    args: [roomName, sourceName, room.name],//传递的参数，要能够放在memory的类型
    executeTick: Game.time+50, //执行时间
    intervalTick: 1 //执行间隔
});
```
然后在runTask.ts文件里在switch语句里添加对应的case：
```js
case "manageOutwardsSource.getPathLength": {
    //获取参数
    const [roomName, sourceName, spawnRoomName] = task.args as string[]
    //这里写你的逻辑代码，可以返回不同的字符串对应不同的状态
    //例如
    return "finish"
}
```
当然还可以在runAfterTask.ts文件设定在完成任务后的代码。

这个模块可以递归生成任务，可以达到任务链的效果。

