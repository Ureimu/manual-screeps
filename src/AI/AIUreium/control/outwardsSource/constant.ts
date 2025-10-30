// 在外矿选取任务开始后，需要等待的时间。
// 该逻辑是为了保证scouter先找完附近的外矿，以保证选取的外矿为最佳的。
// TODO OutwardsSourceCheckInterval放入配置表
export const OutwardsSourceCheckInterval = 5000;
