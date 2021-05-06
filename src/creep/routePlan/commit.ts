import { clearCreepRouteMemory } from "creep/action";
import { newAcrossTickTask } from "utils/AcrossTick";
import { PosStr } from "utils/RoomPositionToStr";
import { isRouteMidpointDetail, RouteConditionDetail, RouteMidpointDetail } from "./index";
import { showRoutes } from "./show";
import { consoleStyle } from "console/style";

const style = consoleStyle("routePlan");

export const routePlanCommit = {
    create: (args: { routeName: string; ifLoop: string }): string => {
        const { routeName, ifLoop = "true" } = args;
        if (routeName === "") {
            return style(`路径名称不可以为空`, "error");
        }
        Memory.routes[routeName] = { routeDetailArray: [], ifLoop: Boolean(ifLoop), ifShow: false };
        return style(`路径 ${routeName} 创建成功`, "log");
    },
    addMidpoint: (
        args: {
            routeName: string;
        } & RouteMidpointDetail
    ): string => {
        const { routeName, range = 1, pathMidpointPos, doWhenArrive, actionArgs } = args;
        const flag = Game.flags[pathMidpointPos];
        if (!flag) {
            return style(`路径点位置 ${pathMidpointPos} 旗帜不存在，请先创建该路径旗帜`, "error");
        }
        // console.log(routeName, flag.pos, [doWhenArrive]);
        if (!Memory.routes[routeName]) {
            return style(`路径 ${routeName} 不存在，请先创建该路径`, "error");
        } else {
            Memory.routes[routeName].routeDetailArray.push({
                pathMidpointPos: PosStr.setPosToStr(flag.pos),
                range,
                doWhenArrive,
                actionArgs
            });
        }
        return style(
            `为路径${routeName} 添加路径点位置 ${pathMidpointPos} : ${PosStr.setPosToStr(flag.pos)} 成功，现在有 ${
                Memory.routes[routeName].routeDetailArray.length
            } 个路径点`,
            "log"
        );
    },
    addCondition: (
        args: {
            routeName: string;
        } & RouteConditionDetail
    ): string => {
        const { routeName, condition, jumpTo } = args;
        // console.log(routeName);
        if (!Memory.routes[routeName]) {
            return style(`路径 ${routeName} 不存在，请先创建该路径`, "error");
        } else {
            Memory.routes[routeName].routeDetailArray.push({ condition, jumpTo });
        }
        return style(`添加条件 ${condition} jumpTo ${jumpTo} 成功`, "log");
    },
    chooseRouteForCreep: (args: { creepName: string; routeName: string }): string => {
        const { creepName, routeName } = args;
        // console.log(creepName);
        const creepMemory = Memory.creeps[creepName];
        if (!creepMemory) {
            (Memory.creeps[creepName] as Partial<CreepMemory>) = {};
            clearCreepRouteMemory(Memory.creeps[creepName]);
        } else {
            clearCreepRouteMemory(creepMemory);
        }
        creepMemory.route.name = routeName;
        return style(`为creep ${creepName} 选择路径 ${routeName} 完成`, "log");
    },
    setRouteProperties: (args: { ifLoop: string; routeName: string }): string => {
        const { ifLoop, routeName } = args;
        // console.log(routeName, ifLoop);
        Memory.routes[routeName].ifLoop = Boolean(ifLoop);
        return style(`修改路径 ${routeName} 设置完成`, "log");
    },
    showRoutes: (args: { ifRun: string; routeName: string; roomName: string }): string => {
        const { ifRun, routeName, roomName } = args;
        // console.log(routeName, ifRun);
        Memory.routes[routeName].ifShow = Boolean(ifRun);
        newAcrossTickTask(
            {
                taskName: "routePlanCommit.showRoutes", // 任务名称
                args: [roomName, routeName], // 传递的参数，要能够放在memory的类型
                executeTick: Game.time + 1,
                intervalTick: 1 // 在多久后执行
            },
            task => {
                const [roomNameArg, routeNameArg] = task.args as string[];
                if (Memory.routes[routeNameArg].ifShow) {
                    showRoutes(routeNameArg, roomNameArg);
                    return "runAgain";
                } else {
                    return "finish";
                }
            }
        );
        return style(`执行可视化 ${routeName} : ${roomName} : ${ifRun}`, "log");
    },
    deleteRoute: (args: { routeName: string }): string => {
        const { routeName } = args;
        // console.log(routeName);
        delete Memory.routes[routeName];
        return style(`删除路径 ${routeName} 设置完成`, "log");
    },
    printRouteDetail: (args: { routeName: string }): string => {
        const { routeName } = args;
        const routeDetail = Memory.routes[routeName];
        let log = "";
        let index = 0;
        routeDetail.routeDetailArray.forEach(detail => {
            if (isRouteMidpointDetail(detail)) {
                log = log.concat(`${index} ${detail.pathMidpointPos} ${detail.range} ${detail.doWhenArrive}` + "\n");
            } else {
                log = log.concat(`${index} ${detail.condition} ${detail.jumpTo}` + "\n");
            }
            index++;
        });
        return style(`${log}`, "log");
    }
};
