# manual-screeps

为手动操作优化过，开箱即用的 screeps 游戏代码框架。

## 介绍

该框架提供了一系列在游戏控制台的操作方法，以便于玩家在控制台完成从添加 creep 到使 creep 完成一系列任务的复杂操作。具体可见教程。

自动布局功能由[screeps-sideServer](https://github.com/Ureimu/screeps-sideServer)提供支持，数据统计页面由[manual-screeps-ui](https://github.com/Ureimu/manual-screeps-ui)提供支持。

## 教程

教你如何上手使用该框架。

[教程目录](tutorial/README.md)

## AI使用说明

在使用ai前，除了配置screeps.json，还需要先写自己的ai配置文件。参照[该文件](src\AI\AIUreium\config\config.example\index.ts)。该配置文件不会上传到代码库，请自行备份。

## api 文档

api 文档由 typedoc 自动生成。

[api 文档目录](docs/modules.md)

## 致谢

灵感来源于 openttd 的 ui 操作方式，感谢各位群友大佬的建议和提供的轮子。
