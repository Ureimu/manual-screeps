import { clearCreepRouteMemory } from "creep/action";
import { newAcrossTickTask } from "utils/AcrossTick/runAfterTask";
import { PosStr } from "utils/RoomPositionToStr";
import { RouteDetail } from "./index";
import { showRoutes } from "./showRoutes";

export const routePlanCommit = {
    create: (args: { routeName: string; ifLoop: string }): string => {
        const { routeName, ifLoop = "true" } = args;
        if (routeName === "") {
            return `路径名称不可以为空`;
        }
        Memory.routes[routeName] = { routeDetailArray: [], ifLoop: getBooleanFromString(ifLoop), ifShow: false };
        return `路径 ${routeName} 创建成功`;
    },
    addMidpoint: (
        args: {
            routeName: string;
        } & RouteDetail
    ): string => {
        const { routeName, range = 1, pathMidpointPos, doWhenArrive, doOnLoad, doOnUnload } = args;
        const flag = Game.flags[pathMidpointPos];
        if (!flag) {
            return `路径点位置 ${pathMidpointPos} 旗帜不存在，请先创建该路径旗帜`;
        }
        console.log(routeName, flag.pos, [doWhenArrive, doOnLoad, doOnUnload]);
        if (!Memory.routes[routeName]) {
            return `路径 ${routeName} 不存在，请先创建该路径`;
        } else {
            Memory.routes[routeName].routeDetailArray.push({
                pathMidpointPos: PosStr.setPosToStr(flag.pos),
                range,
                doWhenArrive,
                doOnLoad,
                doOnUnload
            });
        }
        return `为路径${routeName} 添加路径点位置 ${pathMidpointPos} : ${PosStr.setPosToStr(flag.pos)} 成功，现在有 ${
            Memory.routes[routeName].routeDetailArray.length
        } 个路径点`;
    },
    chooseRouteForCreep: (args: { creepName: string; routeName: string }): string => {
        const { creepName, routeName } = args;
        console.log(creepName);
        const creepMemory = Memory.creeps[creepName];
        if (creepMemory) {
            clearCreepRouteMemory(creepMemory);
            creepMemory.route.name = routeName;
        }
        return `为creep ${creepName} 选择路径 ${routeName} 完成`;
    },
    setRouteProperties: (args: { ifLoop: string; routeName: string }): string => {
        const { ifLoop, routeName } = args;
        console.log(routeName, ifLoop);
        Memory.routes[routeName].ifLoop = getBooleanFromString(ifLoop);
        return `修改路径 ${routeName} 设置完成`;
    },
    showRoutes: (args: { ifRun: string; routeName: string; roomName: string }): string => {
        const { ifRun, routeName, roomName } = args;
        console.log(routeName, ifRun);
        Memory.routes[routeName].ifShow = getBooleanFromString(ifRun);
        const visualExports = showRoutes(routeName, roomName);
        newAcrossTickTask({
            taskName: "routePlanCommit.showRoutes", // 任务名称
            args: [visualExports, roomName, routeName], // 传递的参数，要能够放在memory的类型
            executeTick: Game.time + 1,
            intervalTick: 1 // 在多久后执行
        });
        return `执行可视化 ${routeName} : ${roomName} : ${ifRun}`;
    }
};
export function getBooleanFromString(str: string): boolean {
    let boolIfLoop = true;
    if (str === "true") {
        boolIfLoop = true;
    } else if (str === "false") {
        boolIfLoop = false;
    } else {
        console.log(`boolean 类型str输入值错误: ${str} ，采用默认值true`);
    }
    return boolIfLoop;
}
