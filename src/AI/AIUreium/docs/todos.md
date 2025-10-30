x 1. 加一个levelKeeper，用于防止controller降级，也可用于比较激进的节省cpu的房间。
x 2. builder改为仅在有建筑工地或需要修理container时孵化（container血量下降到50k孵化一次）。
x 3. mineral carrier改为只在container快满时才去搬运，平时停在parking spot。
4. 外矿路径长度计算在没有修路时应考虑地形疲劳。
x 5. 外矿reserver在预定tick较高时应停止孵化（比如高于1500）。预计可省1/tick的能量。
x 6. upgrader应当根据能量消耗动态生成数量。如storage能量高时多生成或者使用更高的身体部件配置。
7. 给所有非常驻任务的启动control加一个上次运行的结果缓存，用于查看运行结果和debug。
8. 给所有非常驻任务添加状态查看方法，如当前是否在运行，若未运行原因是什么。
x 9. 外矿出现invader时，暂停所有外矿creep的孵化。（出现invader时记录其寿命，等到寿命完了再孵化。）
10. 加一个oBuilder专门维护外矿的路。