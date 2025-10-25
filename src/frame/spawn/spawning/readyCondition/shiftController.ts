import { consoleStyle } from "frame/console/style";
import { CreepGroup } from "frame/creep/group";
import { SpawnPool } from "frame/spawn/spawnPool";
import { spawnEnqueue } from "frame/spawn/spawnPool/spawnEnqueue";
import { SpawnCreepDetail } from "frame/spawn/spawnPool/type";
import { ReadyCondition } from ".";
import { spawnShiftCreepFunctionSet } from "./spawnShiftCreep";
import { getSubCreepName } from "./subCreep";
import { logManager } from "utils/log4screeps";
const logger = logManager.createLogger("debug", "ShiftController");
/* 
轮班控制器。
*/
export const shiftController = {
    timer: Game.time,
    creepNameList: [] as string[],
    creepDetailList: [] as SpawnCreepDetail[],
    updateData: function updateShiftCreepList(): void {
        if (this.timer !== Game.time) {
            this.updateCreepDetailList();
            this.timer = Game.time;
        }
    },
    updateCreepDetailList: function updateCreepDetailList(): void {
        const creepList: SpawnCreepDetail[] = [];
        _.forEach(Memory.rooms, room => {
            _.forEach(room.spawnPool, creepDetail => {
                creepList.push(creepDetail);
            });
        });
        this.creepDetailList = creepList;
    },
    getShiftCreepList: function getShiftCreepList(): string[] {
        const shiftList: string[] = this.creepDetailList
            .filter(condition => condition.spawnCondition === "shift")
            .map(condition => condition.creepName);
        return shiftList;
    },
    checkIdList: function checkIdList(): void {
        this.updateData();
        const shiftCreepDetailList = this.creepDetailList.filter(condition => condition.spawnCondition === "shift");
        shiftCreepDetailList.forEach(detail => {
            if (!detail.idList) {
                detail.idList = {};
                detail.creepLevel = 1;
            }
        });
    },
    getNextCreepId(mainCreepDetail: SpawnCreepDetail): number {
        if (!mainCreepDetail.idList) {
            throw new Error("Creep");
        }
        const idList = Object.keys(mainCreepDetail.idList).map(Number);
        if (idList.length === 0) {
            return 0;
        }
        return Math.max(...idList) + 1;
    },
    addSubCreepDetail: function addSubCreepDetail(mainCreepDetail: SpawnCreepDetail): number {
        const { creepName, creepBody, priority, roomName, spawnCondition: readyCondition } = mainCreepDetail;
        const nextId = this.getNextCreepId(mainCreepDetail);
        const newSubCreepName = getSubCreepName(mainCreepDetail, nextId);
        SpawnPool.addCreep({
            creepName: newSubCreepName,
            creepBody,
            priority: String(priority),
            roomName,
            readyCondition: "sub",
            subCond: mainCreepDetail.subCond
        });
        const newSubCreepDetail = Memory.rooms[roomName].spawnPool[newSubCreepName];
        newSubCreepDetail.creepLevel = 0;
        const isAdded = Object.entries(Memory.creepGroups).some(([creepGroupName, creepGroup]) => {
            if (creepGroup.creepNameList.some(name => name === creepName)) {
                CreepGroup.addCreep({ creepName, creepGroupName });
                return true;
            }
            return false;
        });
        if (!isAdded) {
            logger.debug(`${creepName} addSubCreepDetail出现问题：没有正确添加到对应creepGroup`);
        }
        mainCreepDetail.idList[nextId] = false;
        this.updateCreepDetailList();
        return nextId;
    },
    spawnSubCreep: function spawnSubCreep(mainCreepDetail: SpawnCreepDetail, id: number): void {
        const newCreepName = getSubCreepName(mainCreepDetail, id);
        const newSpawnCreepDetail = this.creepDetailList.find(creepDetail => creepDetail.creepName === newCreepName);
        if (!newSpawnCreepDetail) {
            throw new Error("Sub Creep Undefined");
        } else {
            spawnEnqueue(newSpawnCreepDetail);
        }
    }, // s
    manageShiftCreepTeam: function manageShiftCreepTeam(mainCreepDetail: SpawnCreepDetail): void {
        const { creepName, creepBody, priority, roomName, spawnCondition: readyCondition } = mainCreepDetail;
        // debug(`${creepName} manage`);
        if (determineShiftTime(mainCreepDetail)) {
            // debug(`${creepName} try enqueue`);
            // mainCreepDetail.spawning = true;
            if (mainCreepDetail.state === "notReady") {
                mainCreepDetail.spawning = true;
                // 先尝试孵化main creep
                spawnEnqueue(mainCreepDetail);
            }
            // 暂时未启用下方孵化逻辑
            // } else if (Object.values(mainCreepDetail.idList).some(value => !value)) {
            //     // 否则孵化sub creep。
            //     const unSpawnCreep = Object.entries(mainCreepDetail.idList).find(([idStr, bool]) => !bool);
            //     if (unSpawnCreep) {
            //         const id = Number(unSpawnCreep[0]);
            //         mainCreepDetail.idList[id] = true;
            //         this.spawnSubCreep(mainCreepDetail, id);
            //     }
            // } else {
            //     // 全都活着就添加一个新的creep孵化
            //     const id = this.addSubCreepDetail(mainCreepDetail);
            //     this.spawnSubCreep(mainCreepDetail, id);
            // }
        }
    },
    run: function run(): void {
        // debug(`running ${Game.time}`);
        this.checkIdList();
        const mainCreepNameList = this.getShiftCreepList();
        // debug(`${mainCreepNameList.toString()}`);
        const mainCreepDetailList = this.creepDetailList.filter(detail =>
            mainCreepNameList.some(name => detail.creepName === name)
        );
        mainCreepDetailList.forEach(detail => this.manageShiftCreepTeam(detail));
    }
};

function determineShiftTime(mainCreepDetail: SpawnCreepDetail): boolean {
    if (!mainCreepDetail.subCond) {
        return false;
    }
    const subCond = mainCreepDetail.subCond;
    const spawnShiftCreep = spawnShiftCreepFunctionSet[subCond];
    return spawnShiftCreep(mainCreepDetail);
}
