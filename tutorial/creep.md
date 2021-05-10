# manual-screeps 操作 creep 教程

如何使用 api 操作 creep 呢?

## 手操方法

在游戏的 console 输入 help 并发送，可调出总帮助。

1. 创建路径。
   点击 routePlan 按钮，在返回的 routePlan 帮助下选择 routePlan.create，填写返回的表单并点击提交。名称填你想要的名称，是否循环这里选 true。(具体作用请参考 api)
2. 添加路径点。
   点击 routePlan.addMidpoint 按钮，填写表单并提交。路径名称选你刚才创建的名称，路径点位置需要你自己创建一个 flag，并把 flag 名称填入。范围是 creep 的路径点范围，一般由你选择的 creep 执行动作决定。传递参数取决于你选择的动作是否需要参数。作为示例，这里选前往，范围填 1，参数不填。
3. 添加新的 creep 的 body 设置。点击 creepBody 按钮，在返回的 creepBody 帮助下选择 creepBody.create 填写表单并提交。写你想要的名称就好。
4. 填写 body 设置。点击 creepBody.setConfig，填写表单并提交。配置项名称选择刚才创建的，控制器等级选择 0。在执行时会按照当前控制器等级按顺序依次判断 body 设置是否可用。配置项填 m2c2 (缩写)。
5. 向 spawnPool 添加 creep。点击 spawnPool 按钮，在返回的 spawnPool 的帮助下选择 spawnPool.addCreep，填写表单并提交。creep 名称写你喜欢的，身体部件选刚才创建的，优先级根据大小影响出生顺序，可以写你喜欢的。roomName(房间名称)写你有 spawn 的房间名称。执行条件影响 creep 的孵化策略，这里选 loop(死了就重新孵化)
6. 创建 creep 组。点击 creepGroup 按钮，在返回的 creepGroup 的帮助下选择 creepGroup.create，填写表单并提交。名称填你喜欢的，路径选刚才创建的。
7. 添加 creep 到 creep 组。点击 creepGroup.addCreep，creep 名称填你刚才向 spawnPool 添加的，creep 组选你刚才创建的。

至此，你已经创建了一条路径，并有了一组在路径上运行的 creep 组了。
