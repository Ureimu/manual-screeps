import { routePlanCommit } from "creep/routePlan/commit";
import { newAcrossTickTask } from "utils/AcrossTick";
import { getBooleanFromString } from "utils/typeTransfer";
import { showCreepGroups } from "./show";

export const creepGroupCommit = {
    create: (args: { routeName: string; creepGroupName: string; ifLoop: string }): string => {
        const { routeName, creepGroupName } = args;
        if (routeName === "") {
            return `路径名称不可以为空`;
        }
        if (creepGroupName === "") {
            return `creep组名称不可以为空`;
        }
        Memory.creepGroups[creepGroupName] = {
            creepNameList: [],
            routeName,
            ifShow: false
        };
        return `creep组 ${creepGroupName} 创建成功，分配路径 ${routeName}`;
    },
    addCreep: (args: { creepName: string; creepGroupName: string }): string => {
        const { creepName, creepGroupName } = args;
        console.log(creepName, creepGroupName);
        if (!Memory.creepGroups[creepGroupName]) {
            return `creep组 ${creepGroupName} 不存在，请先创建该路径`;
        } else {
            Memory.creepGroups[creepGroupName].creepNameList.push(creepName);
        }
        const routeName = Memory.creepGroups[creepGroupName].routeName;
        routePlanCommit.chooseRouteForCreep({ creepName, routeName });
        return `为creep组 ${creepGroupName} 添加creep ${creepName} 成功，现在有 ${Memory.creepGroups[creepGroupName].creepNameList.length} 个creep`;
    },
    setCreepGroupProperties: (args: { creepGroupName: string; routeName: string }): string => {
        const { creepGroupName, routeName } = args;
        console.log(creepGroupName, routeName);
        Memory.creepGroups[creepGroupName].routeName = routeName;
        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            routePlanCommit.chooseRouteForCreep({ creepName, routeName });
        });
        return `将creep组 ${creepGroupName} 的路径修改为 ${routeName} 设置完成`;
    },
    showCreepGroups: (args: { creepGroupName: string; roomName: string; ifRun: string }): string => {
        const { creepGroupName, roomName, ifRun } = args;
        console.log(creepGroupName, roomName);
        Memory.creepGroups[creepGroupName].ifShow = getBooleanFromString(ifRun);
        newAcrossTickTask(
            {
                taskName: "routePlanCommit.showCreepGroups", // 任务名称
                args: [roomName, creepGroupName], // 传递的参数，要能够放在memory的类型
                executeTick: Game.time + 1,
                intervalTick: 1 // 在多久后执行
            },
            task => {
                const [roomNameArg, creepGroupNameArg] = task.args as string[];
                if (Memory.creepGroups[creepGroupNameArg].ifShow) {
                    showCreepGroups(creepGroupNameArg, roomNameArg);
                    return "runAgain";
                } else {
                    return "finish";
                }
            }
        );
        return `执行可视化 ${creepGroupName} : ${roomName} : ${ifRun}`;
    }
};
