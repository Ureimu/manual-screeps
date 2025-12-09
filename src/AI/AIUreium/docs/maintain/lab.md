处理lab。

提供一个函数，添加labTask到本房间

每个tick，执行runLabTaskPool函数。
该函数使用优先队列，依次处理任务。根据任务类型，如果存在相应空闲的lab，则执行任务。
执行任务时，发布相应的roomCarryTask，并将carryTask的回调设置。

对于boostCreep任务，将carryTask的回调设置为，将labTask的memory设置为搬运完成；

creep根据其获取的labTask列表的memory，如果存在搬运完成的，就向lab移动。移动到了，再设置labTask的memory为creep已就位。

lab根据条件判定，执行boostCreep。如果返回OK，就结束任务，调用回调函数并清理数据。creep检测任务是否存在，如果不存在就弹出该任务。