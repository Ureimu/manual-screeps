import { consoleStyle } from "frame/console/style";
import { setRoleForCreep } from "frame/creep/action/runCreepByRole";
import { RoutePlan } from "frame/creep/routePlan";
import { newAcrossTickTask } from "utils/AcrossTick";
import { showCreepGroups } from "./show";
import { CreepGroupMemory, CreepGroupMode, creepGroupModeIsRoute } from "./type";

const style = consoleStyle("CreepGroup");

export class CreepGroup {
    /**
     * 创建creep组。
     *
     * @static
     * @param {{ routeName: string; creepGroupName: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static create(args: { creepGroupName: string; mode: CreepGroupMode }): string {
        const { creepGroupName } = args;
        const { mode } = args;
        if (creepGroupName === "") {
            return style(`creep组名称不可以为空`, "error");
        }
        if (mode !== "route" && mode !== "role") {
            throw new Error("mode输入错误，请检查");
        }
        Memory.creepGroups[creepGroupName] = {
            mode,
            creepNameList: [],
            ifShow: false
        };
        return style(`creep组 ${creepGroupName} 创建成功`, "log");
    }
    /**
     * 为creep组添加creep
     *
     * @static
     * @param {{ creepName: string; creepGroupName: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static addCreep(args: { creepName: string; creepGroupName: string }): string {
        const { creepName, creepGroupName } = args;
        // console.log(creepName, creepGroupName);
        if (!Memory.creepGroups[creepGroupName]) {
            return style(`creep组 ${creepGroupName} 不存在，请先创建该creep组`, "error");
        } else {
            const creepNameSet = new Set<string>(Memory.creepGroups[creepGroupName].creepNameList);
            creepNameSet.add(creepName);
            Memory.creepGroups[creepGroupName].creepNameList = Array.from(creepNameSet);
        }
        if (!Memory.creeps[creepName]) {
            (Memory.creeps[creepName] as Partial<CreepMemory>) = {};
        }
        const creepGroupMemory = Memory.creepGroups[creepGroupName];
        if (creepGroupModeIsRoute(creepGroupMemory)) {
            const routeName = creepGroupMemory.routeName;
            if (routeName && routeName !== "") RoutePlan.chooseRouteForCreep({ creepName, routeName });
        } else {
            const roleName = creepGroupMemory.roleName;
            if (roleName && roleName !== "") {
                setRoleForCreep({ roleName, creepName });
            }
        }

        Memory.creeps[creepName].groupName = creepGroupName;
        return style(
            `为creep组 ${creepGroupName} 添加creep ${creepName} 成功，现在有 ${Memory.creepGroups[creepGroupName].creepNameList.length} 个creep`,
            "log"
        );
    }
    /**
     * 将一个creep从原creep组移动到一个新creep组
     *
     * @static
     * @param {{
     *         creepName: string;
     *         currentCreepGroupName: string;
     *         newCreepGroupName: string;
     *     }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static moveCreep(args: {
        creepName: string;
        currentCreepGroupName: string;
        newCreepGroupName: string;
    }): string {
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

        const newCreepGroupMemory = Memory.creepGroups[newCreepGroupName];
        if (creepGroupModeIsRoute(newCreepGroupMemory)) {
            const routeName = newCreepGroupMemory.routeName;
            if (routeName && routeName !== "") RoutePlan.chooseRouteForCreep({ creepName, routeName });
        } else {
            const roleName = newCreepGroupMemory.roleName;
            if (roleName && roleName !== "") {
                setRoleForCreep({ roleName, creepName });
            }
        }
        Memory.creeps[creepName].groupName = newCreepGroupName;
        return style(
            `为creep组 ${currentCreepGroupName} 删除creep ${creepName} 成功，${currentCreepGroupName} 现在有 ${Memory.creepGroups[currentCreepGroupName].creepNameList.length} 个creep;` +
                "\n" +
                `为creep组 ${newCreepGroupName} 添加creep ${creepName} 成功，${newCreepGroupName} 现在有 ${Memory.creepGroups[newCreepGroupName].creepNameList.length} 个creep`,
            "log"
        );
    }
    /**
     * 设定creep组参数。
     *
     * @static
     * @param {{ creepGroupName: string; routeName: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static setCreepGroupProperties(args: {
        creepGroupName: string;
        mode?: CreepGroupMode;
        roleName?: string;
        /**
         * 路径名称
         *
         * @type {string}
         */
        routeName?: string;
    }): string {
        const { creepGroupName, routeName, roleName } = args;
        // console.log(creepGroupName, routeName);
        const creepGroupMemory = Memory.creepGroups[creepGroupName];
        const { mode = creepGroupMemory.mode } = args;
        console.log(`设定${creepGroupName}`);
        if (mode === creepGroupMemory.mode) {
            if (creepGroupModeIsRoute(creepGroupMemory)) {
                if (!routeName) throw new Error("没有给定路径名称");
                creepGroupMemory.routeName = routeName;
                creepGroupMemory.creepNameList.forEach(creepName => {
                    RoutePlan.chooseRouteForCreep({ creepName, routeName });
                });
                return style(`将creep组 ${creepGroupName} 的路径修改为 ${routeName} 设置完成`, "log");
            } else {
                if (!roleName) throw new Error("没有给定角色名称");
                creepGroupMemory.roleName = roleName;
                creepGroupMemory.creepNameList.forEach(creepName => {
                    {
                        setRoleForCreep({ roleName, creepName });
                    }
                });
                console.log(style(`将creep组 ${creepGroupName} 的角色修改为 ${roleName} 设置完成`, "log"));
                return style(`将creep组 ${creepGroupName} 的角色修改为 ${roleName} 设置完成`, "log");
            }
        } else {
            if (creepGroupModeIsRoute(creepGroupMemory)) {
                if (!roleName) throw new Error("没有给定角色名称");
                creepGroupMemory.routeName = undefined;
                Memory.creepGroups[creepGroupName].mode = "role";
                const newCreepGroupMemory = Memory.creepGroups[creepGroupName] as CreepGroupMemory<"role">;
                newCreepGroupMemory.roleName = roleName;
                return style(`更改mode为role并将creep组 ${creepGroupName} 的角色修改为 ${roleName} 设置完成`, "log");
            } else {
                if (!routeName) throw new Error("没有给定路径名称");
                creepGroupMemory.roleName = undefined;
                Memory.creepGroups[creepGroupName].mode = "route";
                const newCreepGroupMemory = Memory.creepGroups[creepGroupName] as CreepGroupMemory<"route">;
                newCreepGroupMemory.routeName = routeName;
                return style(`更改mode为route并将creep组 ${creepGroupName} 的路径修改为 ${routeName} 设置完成`, "log");
            }
        }
    }
    /**
     * 在房间中显示creep组。
     *
     * @static
     * @param {{ creepGroupName: string; roomName: string; ifRun: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static showCreepGroups(args: { creepGroupName: string; roomName: string; ifRun: string }): string {
        const { creepGroupName, roomName, ifRun } = args;
        // console.log(creepGroupName, roomName);
        const booleanIfRun = ifRun === "true" ? true : false;
        Memory.creepGroups[creepGroupName].ifShow = booleanIfRun;
        const creepGroupMemory = Memory.creepGroups[creepGroupName];
        if (creepGroupModeIsRoute(creepGroupMemory)) {
            const routeName = creepGroupMemory.routeName;
            if (!routeName || routeName === "") {
                return style(`路径名称不可以为空`, "error");
            }
            if (booleanIfRun) {
                newAcrossTickTask(
                    {
                        taskName: "routePlan.showCreepGroups", // 任务名称
                        args: [roomName, creepGroupName], // 传递的参数，要能够放在memory的类型
                        executeTick: Game.time + 1,
                        intervalTick: 1, // 在多久后执行,
                        log: true
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
            }
        } else {
            throw new Error("showCreepGroups暂时不支持mode为role的可视化。");
        }
        return style(`执行可视化 ${creepGroupName} : ${roomName} : ${ifRun}`, "log");
    }
    /**
     * 删除creep组。
     *
     * @static
     * @param {{ creepGroupName: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static deleteCreepGroup(args: { creepGroupName: string }): string {
        const { creepGroupName } = args;
        // console.log(creepGroupName);
        delete Memory.creepGroups[creepGroupName];
        return style(`删除creep组 ${creepGroupName} 设置完成`, "log");
    }

    /**
     * 从creep组删除creep。
     *
     * @static
     * @param {{ creepGroupName: string }} args
     * @returns {string}
     * @memberof creepGroup
     */
    public static deleteCreep(args: { creepGroupName: string; creepName: string }): string {
        const { creepGroupName, creepName } = args;
        // console.log(creepGroupName);
        const index = Memory.creepGroups[creepGroupName].creepNameList.findIndex(name => name === creepName);
        if (index !== -1) {
            Memory.creepGroups[creepGroupName].creepNameList.splice(index, 1);
            return style(`删除creep组 ${creepGroupName} 设置完成`, "log");
        } else {
            return style(`在creep组${creepGroupName}中不存在creep${creepName}`, "error");
        }
    }
}
