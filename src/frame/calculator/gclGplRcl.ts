/* eslint-disable @typescript-eslint/unbound-method */
export const gclProcessTotal = (gclLevel: number): number => GCL_MULTIPLY * Math.pow(gclLevel - 1, GCL_POW);
export const gplProcessTotal = (gplLevel: number): number => Math.pow(gplLevel, POWER_LEVEL_POW) * POWER_LEVEL_MULTIPLY;
export const rclProcessTotal = (rclLevel: number): number => CONTROLLER_LEVELS[rclLevel] ?? 0;
export const getGclSumProcessBeforeLevel = (gclLevel: number): number =>
    gclLevel <= 1
        ? 0
        : _.range(0, gclLevel - 1)
              .map(value => gclProcessTotal(value + 1))
              .reduce(_.add);
export const getGplSumProcessBeforeLevel = (gplLevel: number): number =>
    gplLevel <= 1
        ? 0
        : _.range(0, gplLevel - 1)
              .map(value => gplProcessTotal(value + 1))
              .reduce(_.add);
export const getRclSumProcessBeforeLevel = (rclLevel: number): number =>
    rclLevel <= 1
        ? 0
        : _.range(0, rclLevel - 1)
              .map(value => rclProcessTotal(value + 1))
              .reduce(_.add);
