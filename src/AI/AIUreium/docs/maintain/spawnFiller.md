# spawnFiller

type c = spawn|extension

使用两个creep。creep自行预定空c。在global.roomMemory预定。

判定条件，只检测是否未满c，和自己的能量是否够填满c。

使用预定方式，可以修复之前不预定而直接获取最近c导致的，最近路径会改变最近c而反复横跳的问题。