import { creepAct } from "creep/action/doOnArrived";
import { conditionIndexedList } from "creep/action/doOnJudgeCondition";

declare global {
    interface Memory {
        routes: {
            [name: string]: {
                routeDetailArray: RouteSingleDetail[];
                ifLoop: boolean;
                ifShow: boolean;
            };
        };
    }
}

export type RouteSingleDetail = RouteMidpointDetail | RouteConditionDetail;
/**
 * 路径点的详细信息
 *
 * @export
 * @interface RouteMidpointDetail
 */

export interface RouteMidpointDetail {
    /**
     * 路径点位置字符串。
     *
     * @type {string}
     * @memberof RouteMidpointDetail
     */
    pathMidpointPos: string;
    /**
     * 范围大小，为大于0的整数
     *
     * @type {number}
     * @memberof RouteMidpointDetail
     */
    range: number;
    /**
     * 当到达位置时执行的动作。
     *
     * @type {keyof typeof creepAct}
     * @memberof RouteMidpointDetail
     */
    doWhenArrive: keyof typeof creepAct;
    /**
     * 动作参数。
     *
     * @type {string}
     * @memberof RouteMidpointDetail
     */
    actionArgs?: string;
}

export interface RouteConditionDetail {
    condition: keyof typeof conditionIndexedList;
    jumpTo: number | "front" | "end";
    conditionArgs?: string;
}

/**
 * 判断RouteSingleDetail的具体类型。
 *
 * @export
 * @param {RouteSingleDetail} detail
 * @returns {detail is RouteMidpointDetail}
 */
export function isRouteMidpointDetail(detail: RouteSingleDetail): detail is RouteMidpointDetail {
    return Boolean((detail as RouteMidpointDetail).pathMidpointPos);
}
