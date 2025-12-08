import { chooseBefittingBody } from "frame/creep/body/chooseCondition";
import { bodyTools } from "frame/creep/body/tools";
import { CreepGroup } from "frame/creep/group";
import { logManager } from "utils/log4screeps";
import PriorityQueue from "utils/PriorityQueue";
import { TaskPool } from "utils/PriorityQueue/taskPool";
import { registerFN } from "utils/profiler";
import { SetTools } from "utils/SetTools";
import { SpawnCreepDetail } from "../spawnPool/type";
import { callOnBirth } from "./callOnBirth";
import { readyCondition } from "./readyCondition";

const logger = logManager.createLogger("debug", "spawning");
export const spawningOption: { [spawnName: string]: { energyStructures: Id<StructureExtension | StructureSpawn>[] } } =
    {};

const queueList: { [roomName: string]: PriorityQueue<SpawnCreepDetail> } = {};
const taskPool = new TaskPool<SpawnCreepDetail>();

export const runRoomSpawnQueue = registerFN((room: Room) => {
    const spawns = room.find(FIND_MY_SPAWNS);
    const availableSpawns = spawns.filter(recordSpawnTimeAndIsSpawning);
    if (availableSpawns.length === 0) return;
    const lastFinishSpawnTime = availableSpawns.reduce(
        (time, spawn) => Math.max(time, spawn.memory.lastFinishSpawnTime ?? 0),
        0
    );

    if (!queueList[room.name]) {
        const runningTaskList: SpawnCreepDetail[] = [];
        for (const creepName in room.memory.spawnPool) {
            const detail = room.memory.spawnPool[creepName];
            if (detail.state === "running") {
                runningTaskList.push(detail);
            }
        }
        queueList[room.name] = taskPool.initQueueFromTaskQueue(runningTaskList);
    }
    const spawnQueue = queueList[room.name];
    for (const creepName in room.memory.spawnPool) {
        const detail = room.memory.spawnPool[creepName];
        switch (detail.state) {
            case "ready":
                spawnQueue.push(detail);
                detail.state = "running";
                break;
            case "notReady":
                readyCondition[detail.spawnCondition](detail);
                break;
            default:
                break;
        }
    }

    room.memory.spawnInfo.energyAmount = room.energyAvailable;
    room.memory.spawnInfo.recorder =
        (Game.time - lastFinishSpawnTime) * Math.max(Math.log1p(spawnQueue.size() + 1), 1) -
        40 * Math.floor((room.energyCapacityAvailable - room.energyAvailable) / 200 + 1);

    if (
        room.energyAvailable < 300 ||
        (room.energyAvailable !== room.energyCapacityAvailable && room.memory.spawnInfo.recorder <= 0)
    ) {
        return;
    }

    let returnCode = 0;
    let spawnIndex = 0;
    let spawn: StructureSpawn = availableSpawns[spawnIndex];
    let failedTask: SpawnCreepDetail | undefined = undefined;
    do {
        spawn = availableSpawns[spawnIndex];
        const spawnTask = spawnQueue.pop();
        if (spawnTask) {
            const creepPreProcessBodyString = chooseBefittingBody({
                creepBodyConfigName: spawnTask.creepBodyConfig,
                room: spawn.room
            });
            if (!creepPreProcessBodyString) {
                logger.info(`${spawn.room.name} ${spawnTask.creepBodyConfig} 没有合法的body config`);
                failedTask = spawnTask;
                break;
            }
            const creepBody = bodyTools.compile(creepPreProcessBodyString);
            const spawnCreepName = spawnTask.creepName;
            const energyCost = bodyTools.getEnergyCost(creepPreProcessBodyString);
            if (energyCost > spawn.room.memory.spawnInfo.energyAmount) {
                failedTask = spawnTask;
                break;
            }
            returnCode = spawn.spawnCreep(creepBody, spawnCreepName, {
                dryRun: true
            });
            if (returnCode === OK) {
                if (spawningOption[spawn.name]) {
                    const energyStructures = spawningOption[spawn.name].energyStructures
                        .map<StructureSpawn | StructureExtension | undefined>(
                            i => Game.structures[i] as StructureSpawn | StructureExtension | undefined
                        )
                        .filter((i): i is StructureSpawn | StructureExtension => !i);
                    spawn.spawnCreep(creepBody, spawnCreepName, { energyStructures });
                } else {
                    spawn.spawnCreep(creepBody, spawnCreepName);
                }

                spawn.room.memory.spawnInfo.energyAmount -= energyCost;
                if (spawn.room.memory.spawnPool[spawnCreepName]) {
                    spawn.room.memory.spawnPool[spawnCreepName].state = "notReady";
                    spawn.room.memory.spawnPool[spawnCreepName].creepBody = creepPreProcessBodyString;
                }
                spawnIndex += 1;
            } else {
                if (returnCode !== ERR_NOT_ENOUGH_ENERGY && returnCode !== ERR_NAME_EXISTS) {
                    logger.error(`spawn:${spawn.name} 返回错误 returnCode: ${returnCode}`);
                }
                if (returnCode === ERR_NO_BODYPART && creepBody === []) {
                    logger.error(`spawn:${spawn.name} 返回错误：找不到合适的身体部件数组：${spawnCreepName}`);
                }
                failedTask = spawnTask;
                break;
            }
        } else {
            break;
        }
    } while (spawnIndex < availableSpawns.length);
    if (failedTask) spawnQueue.push(failedTask);
}, "runRoomSpawnQueue");

function recordSpawnTimeAndIsSpawning(spawn: StructureSpawn): boolean {
    if (!spawn.memory.lastFinishSpawnTime) {
        spawn.memory = {
            isSpawning: false,
            lastFinishSpawnTime: Game.time
        };
    }
    if (typeof spawn.spawning?.name === "string") {
        if (!spawn.memory.isSpawning) {
            spawn.memory.isSpawning = true;
        }
        return false;
    } else {
        if (spawn.memory.isSpawning) {
            spawn.memory.lastFinishSpawnTime = Game.time;
            spawn.memory.isSpawning = false;
        }
        return true;
    }
}

export const runSpawnPool = registerFN((room: Room) => {
    if (!room.memory.spawnPool) {
        room.memory.spawnPool = {};
    }
    if (!room.memory.spawnInfo) {
        room.memory.spawnInfo = {
            diedCreepList: [],
            energyAmount: -1,
            recorder: -1
        };
    }

    // 上个tick的死亡creep名单
    const diedCreepListInLastTick = room.memory.spawnInfo.diedCreepList;

    // 维护从属本spawn的diedCreepList
    const diedCreepSet = new Set<string>(room.memory.spawnInfo.diedCreepList);
    for (const creepName in room.memory.spawnPool) {
        if (!(creepName in Game.creeps)) {
            diedCreepSet.add(creepName);
        } else {
            diedCreepSet.delete(creepName);
        }
    }
    room.memory.spawnInfo.diedCreepList = Array.from(diedCreepSet);
    const diedCreepSetInLastTick = new Set<string>(diedCreepListInLastTick);

    // 对各类型creep进行维护
    const {
        "a-b": justDiedCreepSet, // 上一个tick刚刚死亡的creep
        "b-a": justSpawningCreepSet, // 这一个tick刚刚开始孵化的creep
        "a*b": DiedForPeriodCreepSet // 已经死亡一段时间的creep
    } = SetTools.compareSet(diedCreepSet, diedCreepSetInLastTick, { "a-b": true, "b-a": true, "a*b": true });

    if (justDiedCreepSet?.size) {
        justDiedCreepSet.forEach(creepName => {
            const { groupName } = Memory.creeps[creepName];
            // 死亡重置memory
            CreepGroup.addCreep({
                creepGroupName: groupName,
                creepName
            });
            delete global.creepMemory?.[creepName];
            Memory.rooms[room.name].spawnPool[creepName].creepCondition = "dead";
        });
    }

    if (justSpawningCreepSet?.size) {
        justSpawningCreepSet.forEach(creepName => {
            const creep = Game.creeps[creepName];
            callOnBirth(creep);
            Memory.rooms[room.name].spawnPool[creepName].creepCondition = "alive";
            Memory.rooms[room.name].spawnPool[creepName].spawnCount += 1;
        });
    }
}, "runSpawnPool");
