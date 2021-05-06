import { consoleStyle } from "console/style";
import { routePlanCommit } from "creep/routePlan/commit";
import { newAcrossTickTask } from "utils/AcrossTick";
import { showCreepGroups } from "./show";

const style = consoleStyle("creepGroup");

export const creepGroupCommit = {
    create: (args: { routeName: string; creepGroupName: string }): string => {
        const { routeName, creepGroupName } = args;
        if (routeName === "") {
            return style(`路径名称不可以为空`, "error");
        }
        if (creepGroupName === "") {
            return style(`creep组名称不可以为空`, "error");
        }
        Memory.creepGroups[creepGroupName] = {
            creepNameList: [],
            routeName,
            ifShow: false
        };
        return style(`creep组 ${creepGroupName} 创建成功，分配路径 ${routeName}`, "log");
    },
    addCreep: (args: { creepName: string; creepGroupName: string }): string => {
        const { creepName, creepGroupName } = args;
        // console.log(creepName, creepGroupName);
        if (!Memory.creepGroups[creepGroupName]) {
            return style(`creep组 ${creepGroupName} 不存在，请先创建该路径`, "error");
        } else {
            const creepNameSet = new Set<string>(Memory.creepGroups[creepGroupName].creepNameList);
            creepNameSet.add(creepName);
            Memory.creepGroups[creepGroupName].creepNameList = Array.from(creepNameSet);
        }
        if (!Memory.creeps[creepName]) {
            (Memory.creeps[creepName] as Partial<CreepMemory>) = {};
        }
        const routeName = Memory.creepGroups[creepGroupName].routeName;
        routePlanCommit.chooseRouteForCreep({ creepName, routeName });
        Memory.creeps[creepName].groupName = creepGroupName;
        return style(
            `为creep组 ${creepGroupName} 添加creep ${creepName} 成功，现在有 ${Memory.creepGroups[creepGroupName].creepNameList.length} 个creep`,
            "log"
        );
    },
    moveCreep: (args: { creepName: string; currentCreepGroupName: string; newCreepGroupName: string }): string => {
        const { creepName, currentCreepGroupName, newCreepGroupName } = args;
        // console.log(creepName, creepGroupName);
        if (!Memory.creepGroups[newCreepGroupName] || !Memory.creepGroups[currentCreepGroupName]) {
            return style(`creep组 ${newCreepGroupName} 或 ${currentCreepGroupName} 不存在，请先创建该路径`, "error");
        } else {
            const creepNameSet = new Set<string>(Memory.creepGroups[newCreepGroupName].creepNameList);
            creepNameSet.add(creepName);
            Memory.creepGroups[newCreepGroupName].creepNameList = Array.from(creepNameSet);
            const oldCreepNameSet = new Set<string>(Memory.creepGroups[currentCreepGroupName].creepNameList);
            creepNameSet.delete(creepName);
            Memory.creepGroups[currentCreepGroupName].creepNameList = Array.from(oldCreepNameSet);
        }
        if (!Memory.creeps[creepName]) {
            (Memory.creeps[creepName] as Partial<CreepMemory>) = {};
        }
        const routeName = Memory.creepGroups[newCreepGroupName].routeName;
        routePlanCommit.chooseRouteForCreep({ creepName, routeName });
        Memory.creeps[creepName].groupName = newCreepGroupName;
        return style(
            `为creep组 ${currentCreepGroupName} 删除creep ${creepName} 成功，${currentCreepGroupName} 现在有 ${Memory.creepGroups[currentCreepGroupName].creepNameList.length} 个creep;` +
                "\n" +
                `为creep组 ${newCreepGroupName} 添加creep ${creepName} 成功，${newCreepGroupName} 现在有 ${Memory.creepGroups[newCreepGroupName].creepNameList.length} 个creep`,
            "log"
        );
    },
    setCreepGroupProperties: (args: { creepGroupName: string; routeName: string }): string => {
        const { creepGroupName, routeName } = args;
        // console.log(creepGroupName, routeName);
        Memory.creepGroups[creepGroupName].routeName = routeName;
        Memory.creepGroups[creepGroupName].creepNameList.forEach(creepName => {
            routePlanCommit.chooseRouteForCreep({ creepName, routeName });
        });
        return style(`将creep组 ${creepGroupName} 的路径修改为 ${routeName} 设置完成`, "log");
    },
    showCreepGroups: (args: { creepGroupName: string; roomName: string; ifRun: string }): string => {
        const { creepGroupName, roomName, ifRun } = args;
        // console.log(creepGroupName, roomName);
        Memory.creepGroups[creepGroupName].ifShow = Boolean(ifRun);
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
        return style(`执行可视化 ${creepGroupName} : ${roomName} : ${ifRun}`, "log");
    },
    deleteCreepGroup: (args: { creepGroupName: string }): string => {
        const { creepGroupName } = args;
        // console.log(creepGroupName);
        delete Memory.routes[creepGroupName];
        return style(`删除creep组 ${creepGroupName} 设置完成`, "log");
    }
};