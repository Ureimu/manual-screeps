import { getMyStructuresById } from "frame/construct/utils";
import { stayByRoad } from "frame/creep/action/doOnArrived/stayByRoad";
import { spawningOption } from "frame/spawn/spawning";
import { MAX_ENERGY_PER_CONTROLLER_LEVEL } from "utils/constants";
import { logManager } from "utils/log4screeps";

const logger = logManager.createLogger("debug", "spawnFiller");

const cacheData: {
    [roomName: string]: {
        dataList: { id: Id<StructureSpawn | StructureExtension>; x: number; y: number }[];
        lastUpdateTime: number;
        reservedEnergyStructures: Set<Id<StructureSpawn | StructureExtension>>;
    };
} = {};

const creepData: {
    [roomName: string]: {
        [creepName: string]: {
            reservedEnergyStructures: Id<StructureSpawn | StructureExtension>[];
            isCarrying: boolean;
        };
    };
} = {};

export function spawnFiller(creep: Creep) {
    const room = creep.room;
    const controller = room.controller;
    if (!controller) return;

    const storage = room.storage;
    if (!storage) {
        logger.warn(`${room.name} has no storage, energy filling has stopped.`);
        return;
    }
    cache(creep);
    const roomCache = cacheData[room.name];

    if (room.energyAvailable === room.energyCapacityAvailable) {
        stayByRoad.run(creep);
        return;
    }

    // 找energyStructure，先找最近的，然后找最近的旁边最近的，以此类推，完成预定。
    // TODO 如果循环选择下个时最近的点时 ，存在路径长度（使用范围估计）比到storage的两倍距离还长，就去storage补充能量再去。
    // TODO 将填塔任务移交给carrier

    // 每个tick检测当前目标是否已填充，若填充则移除
    const data = creepData[room.name][creep.name];
    if (data.reservedEnergyStructures[0] && Game.structures[data.reservedEnergyStructures[0]]) {
        if (
            (
                Game.structures[data.reservedEnergyStructures[0]] as StructureSpawn | StructureExtension
            ).store.getFreeCapacity("energy") === 0
        ) {
            logger.debug(`release ${data.reservedEnergyStructures[0]}`);
            roomCache.reservedEnergyStructures.delete(data.reservedEnergyStructures[0]);
            data.reservedEnergyStructures.shift();
        }
    }

    if (data.isCarrying && creep.store.getUsedCapacity() < EXTENSION_ENERGY_CAPACITY[controller.level]) {
        logger.debug(`${creep.name} is transferring`);
        data.isCarrying = false;
    }

    if (!data.isCarrying && creep.store.getFreeCapacity() === 0) {
        logger.debug(`${creep.name} is carrying`);
        data.isCarrying = true;
    }

    if (data.isCarrying) {
        if (data.reservedEnergyStructures.length === 0) {
            // 分配energyStructures
            allocateEnergyStructures(creep);
        }

        if (data.reservedEnergyStructures.length !== 0) {
            const energyStructure = Game.structures[data.reservedEnergyStructures[0]] as
                | StructureExtension
                | StructureSpawn;

            if (!creep.pos.isNearTo(energyStructure)) {
                creep.moveTo(energyStructure, { range: 1 });
            } else {
                creep.transfer(energyStructure, "energy");

                if (data.reservedEnergyStructures.length > 1) {
                    const next = Game.structures[data.reservedEnergyStructures[1]] as
                        | StructureExtension
                        | StructureSpawn;

                    creep.moveTo(next, { range: 1 });
                }
            }
        }
    } else {
        if (!creep.pos.isNearTo(storage)) {
            creep.moveTo(storage, { range: 1 });
        } else {
            creep.withdraw(storage, "energy");
        }
    }

    // TODO 如果要死了就解放所有reservedEnergyStructures
}

function cache(creep: Creep) {
    const room = creep.room;
    // 更新extension和spawn缓存
    if (!cacheData[room.name]) {
        cacheData[room.name] = {
            dataList: [],
            lastUpdateTime: -1,
            reservedEnergyStructures: new Set()
        };
    }

    if (!creepData[room.name]) {
        creepData[room.name] = {};
    }
    if (!creepData[room.name][creep.name]) {
        creepData[room.name][creep.name] = { reservedEnergyStructures: [], isCarrying: false };
    }

    if (cacheData[room.name].lastUpdateTime === Game.time) return;
    if (cacheData[room.name].lastUpdateTime === -1 || Game.time % 1000 === 0) {
        cacheData[room.name].lastUpdateTime = Game.time;
        if (
            room.energyCapacityAvailable !==
                cacheData[room.name].dataList.reduce(
                    (sum, data) =>
                        (sum +=
                            (Game.structures[data.id] as StructureSpawn | StructureExtension)?.store.getCapacity(
                                "energy"
                            ) ?? 0),
                    0
                ) ||
            cacheData[room.name].dataList.some(i => !(Game.structures[i.id] as StructureSpawn | StructureExtension))
        ) {
            const structures = room.find(FIND_MY_STRUCTURES);
            const energyStructures = structures.filter(
                (i): i is StructureSpawn | StructureExtension =>
                    i.structureType === STRUCTURE_SPAWN || i.structureType === STRUCTURE_EXTENSION
            );

            const storage = room.storage;
            if (!storage) {
                logger.warn(`${room.name} has no storage, energy filling has stopped.`);
                return;
            }
            const dataList = energyStructures.map(i => ({ id: i.id, x: i.pos.x, y: i.pos.y }));
            cacheData[room.name].dataList = dataList;

            // 如果需要按特定顺序使用energyStructure，则将顺序记录到spawningOption
            // const spawns = structures.filter((i): i is StructureSpawn => i.structureType === STRUCTURE_SPAWN);

            // spawns.forEach(spawn => {
            //     spawningOption[spawn.name] = { energyStructures: idList };
            // });
        }
    }
}

function allocateEnergyStructures(creep: Creep) {
    const roomCache = cacheData[creep.room.name];
    const data = creepData[creep.room.name][creep.name];

    const emptyEnergyStructures = new Set(
        getMyStructuresById(
            cacheData[creep.room.name].dataList.filter(i => !roomCache.reservedEnergyStructures.has(i.id))
        )
            .filter((i): i is StructureSpawn | StructureExtension => Boolean(i))
            .filter(i => i.store.getFreeCapacity("energy") !== 0)
    );
    logger.debug(`${creep.name} got ${emptyEnergyStructures.size} emptyEnergyStructures`);

    let creepStoreEnergyLeft = creep.store.energy;
    let origin: Creep | StructureSpawn | StructureExtension = creep;
    while (true) {
        const energyStructure: StructureSpawn | StructureExtension | undefined = getNearestByRange(
            origin,
            emptyEnergyStructures
        );
        if (!energyStructure) break;

        emptyEnergyStructures.delete(energyStructure);
        origin = energyStructure;
        const capacityLeft = energyStructure.store.getFreeCapacity("energy");
        if (creepStoreEnergyLeft < capacityLeft) break;
        creepStoreEnergyLeft -= capacityLeft;

        data.reservedEnergyStructures.push(energyStructure.id);
        roomCache.reservedEnergyStructures.add(energyStructure.id);
    }
    logger.debug(`${creep.name} got ${data.reservedEnergyStructures.length} reserved energyStructures`);
}

function getNearestByRange<T extends { pos: RoomPosition }, U extends { pos: RoomPosition }>(
    origin: T,
    targets: Set<U>
): U | undefined {
    if (!targets || targets.size === 0) return undefined;
    let nearest: U | undefined = undefined;
    let nearestRange = Infinity;
    for (const t of targets) {
        if (!t) continue;
        const r = origin.pos.getRangeTo(t.pos);
        if (r < nearestRange) {
            nearest = t;
            nearestRange = r;
        }
    }
    return nearest;
}
