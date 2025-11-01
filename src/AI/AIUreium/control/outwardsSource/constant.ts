// 在外矿选取任务开始后，需要等待的时间。
// 该逻辑是为了保证scouter先找完附近的外矿，以保证选取的外矿为最佳的。
// TODO OutwardsSourceCheckInterval放入配置表
// TODO （低优先级，因为只有当Memory重置时才会用上这个）加速启动，直接检测周围房间是否获取到了信息，如果都获取到了直接开始运行OutwardsSource。
export const OutwardsSourceCheckInterval = 5000;
