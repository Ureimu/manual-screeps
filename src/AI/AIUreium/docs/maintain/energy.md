房间能量消耗估算。

房间的常规能量消耗主要为

1. creep生成 spawn.spawnCreep()
2. 各种建筑的维护 creep.repair()
3. 升级controller creep.upgradeController()
4. tower的消耗 tower.repair() tower.attack() tower.heal()
5. link发送能量时的损耗 link.transferEnergy()
6. terminal买卖时的消耗 terminal.send() terminal.deal()
7. power处理时的消耗 power.processPower()
8. factory的消耗 factory.produce()
9. lab的消耗 lab.boostCreep() 
10. nuker的消耗 nuker.launchNuke()

而能量来源主要为

1. 自己挖的source，固定10e/tick每个source。creep.harvest()
2. 外矿 creep.harvest()
3. terminal买的、寄的能量。 terminal.send() terminal.deal()

现在尝试写代码来统计这些能量，方便控制能量。

## 记录所有能量相关api调用的方案

考虑到目前的代码中，creep不会同一时间进行withdraw和消耗energy的操作，且同时只会进行一个消耗energy的操作，可以使用本tick和下一tick creep energy的差值来记录消耗的能量。

对于大部分的消耗自己的store.energy的 方法，貌似可以通过修改原型的方法，方便的达到该目的。只要在本tick执行消耗能量的操作返回OK时，就创建一个acrossTick函数，让其在下一tick执行，并传入本tick的store.energy参数和id参数，即可在下一tick，计算差值，并将该差值记录到Memory对应位置。

可以将该方法放到框架中。提供一个开关。还可以将这个添加到统计数据网页中。

该功能有助于加强能量循环，并开辟房间间的能量传递，同时作为能量循环统计工具， 对于节省能量的实现有着促进作用。

## 只记录creep的能量相关api调用的方案

其实可以只记录creep的。

## 常规建筑维护能量消耗

road: plain 0.001/tick swamp 0.005/tick wall 0.15/tick
考虑到creep损耗，按翻倍估计。

rampant: 0.03/tick

container: 0.1/tick