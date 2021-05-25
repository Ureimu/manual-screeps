import { bodyTools } from "creep/body/tools";
import {
    CalculatorReturn,
    CarrierData,
    CarrierInput,
    ContainerData,
    HarvesterData,
    HarvesterInput,
    OutwardsSourceInput,
    powerLevels,
    ReserverData,
    ReserverInput,
    Stats
} from "./type";

/**
 * 外矿计算器
 * @version 0.1
 * @author Ureium
 * @export
 * @param {outwardsSourceInput} OutwardsSourceInput
 * @param {harvesterInput} harvesterInput
 * @param {carrierInput} carrierInput
 * @param {reserverInput} reserverInput
 * @returns {CalculatorReturn}
 */
export function calculator(
    outwardsSourceInput: OutwardsSourceInput,
    harvesterInput: HarvesterInput,
    carrierInput: CarrierInput,
    reserverInput: ReserverInput
): CalculatorReturn {
    const pathLength = outwardsSourceInput.path.outwardsRoomPathLength + outwardsSourceInput.path.ownedRoomPathLength; // 总路程长度
    const regenSource = outwardsSourceInput.powers[PWR_REGEN_SOURCE]
        ? POWER_INFO[PWR_REGEN_SOURCE].effect[(outwardsSourceInput.powers[PWR_REGEN_SOURCE] as powerLevels) - 1]
        : 0; // power PWR_REGEN_SOURCE
    const spawnBoost = outwardsSourceInput.powers[PWR_OPERATE_SPAWN]
        ? POWER_INFO[PWR_OPERATE_SPAWN].effect[(outwardsSourceInput.powers[PWR_OPERATE_SPAWN] as powerLevels) - 1]
        : 1; // power PWR_OPERATE_SPAWN
    const sourceCapacity =
        outwardsSourceInput.capacity + regenSource * (ENERGY_REGEN_TIME / POWER_INFO[PWR_REGEN_SOURCE].period); // source容量，这里直接累加power的增加能量效果

    const harvester: HarvesterData = {
        energyCost: {},
        body: {
            spawnTime: Math.ceil(bodyTools.getNum(harvesterInput.body) * spawnBoost * CREEP_SPAWN_TIME),
            total: bodyTools.getNum(harvesterInput.body),
            move: bodyTools.getNum(harvesterInput.body, ["move"]),
            work: bodyTools.getNum(harvesterInput.body, ["work"]),
            carry: bodyTools.getNum(harvesterInput.body, ["carry"]),
            energyCost: bodyTools.getEnergyCost(harvesterInput.body)
        },
        moveBoost: harvesterInput.moveBoost ? harvesterInput.moveBoost : 1,
        harvestBoost: harvesterInput.harvestBoost ? harvesterInput.harvestBoost : 1,
        repairBoost: harvesterInput.repairBoost ? harvesterInput.repairBoost : 1,
        inRoundGeneration: {}
    };
    const carrier: CarrierData = {
        energyCost: {},
        body: {
            spawnTime: Math.ceil(bodyTools.getNum(carrierInput.body) * spawnBoost * CREEP_SPAWN_TIME),
            total: bodyTools.getNum(carrierInput.body),
            move: bodyTools.getNum(carrierInput.body, ["move"]),
            work: bodyTools.getNum(carrierInput.body, ["work"]),
            carry: bodyTools.getNum(carrierInput.body, ["carry"]),
            energyCost: bodyTools.getEnergyCost(carrierInput.body)
        },
        moveBoost: carrierInput.moveBoost ? carrierInput.moveBoost : 1,
        carryBoost: carrierInput.carryBoost ? carrierInput.carryBoost : 1,
        noLoad: {},
        fullLoad: {},
        inRoundGeneration: {},
        inRoundCarry: {}
    };
    const reserver: Partial<ReserverData> = {};
    if (isReserverUsed(reserverInput)) {
        // 使用了reserver的情况
        reserver.body = {
            // 孵化花费的时间
            spawnTime: Math.ceil(bodyTools.getNum(reserverInput.body) * spawnBoost * CREEP_SPAWN_TIME),
            total: bodyTools.getNum(reserverInput.body),
            move: bodyTools.getNum(reserverInput.body, ["move"]),
            claim: bodyTools.getNum(reserverInput.body, ["claim"]),
            // 单次孵化的能量消耗
            energyCost: bodyTools.getEnergyCost(reserverInput.body)
        };
        reserver.energyCost = {};
        reserver.moveTimePerStep = Math.ceil((reserver.body.total - reserver.body.move) / reserver.body.move); // 移动速度
        reserver.workTime =
            CREEP_CLAIM_LIFE_TIME -
            (outwardsSourceInput.path.ownedRoomPathLength + outwardsSourceInput.path.reservePathLength) *
                reserver.moveTimePerStep; // 总工作时间（只包括执行reserve动作的时间）
        reserver.reservePoint = Math.min(
            Math.max(reserver.workTime * (reserver.body.claim - 1), 0),
            CONTROLLER_RESERVE_MAX
        );
        reserver.spawnInterval = reserver.workTime + reserver.reservePoint;
        reserver.energyCost.spawnCreeps = Math.ceil(
            reserver.body.energyCost * (CREEP_LIFE_TIME / reserver.spawnInterval)
        ); // 在1500tick内生creep花费的能量
    }
    const container: ContainerData = {
        perDecay: {
            // 每次老化时的属性
            countInRoundGeneration: ENERGY_REGEN_TIME / CONTAINER_DECAY_TIME, // 在一次能量生成期间的老化次数
            repairEnergyCost: CONTAINER_DECAY / REPAIR_POWER // 每次老化修理container花费的能量
        },
        // 每次能量生成时段的属性
        inRoundGeneration: {}
    };
    const stats: Stats = { sourceCapacity };

    carrier.capacity = carrier.body.carry * CARRY_CAPACITY * carrier.carryBoost; // 容量
    harvester.moveTimePerStep = Math.ceil(harvester.body.work / (harvester.body.move * 2));
    carrier.noLoad.moveTimePerStep = Math.ceil((carrier.body.work ? carrier.body.work : 1) / (carrier.body.move * 2)); // 空载时的速度
    carrier.fullLoad.moveTimePerStep = Math.ceil((carrier.body.total - carrier.body.move) / (carrier.body.move * 2)); // 满载时的速度
    harvester.workTime = CREEP_LIFE_TIME - pathLength * harvester.moveTimePerStep; // 工作总时间（不包含移动）
    carrier.workTime = CREEP_LIFE_TIME - pathLength * carrier.noLoad.moveTimePerStep; // 工作总时间（不包含出生后到抵达source的时间）
    harvester.harvestSpeed = harvester.body.work * HARVEST_POWER * harvester.harvestBoost; // 挖取速度
    harvester.repairEnergyCostSpeed = harvester.body.work * harvester.repairBoost;
    container.perDecay.repairTimeCost = Math.ceil(
        container.perDecay.repairEnergyCost / harvester.repairEnergyCostSpeed
    );
    harvester.inRoundGeneration.repairContainerTime =
        container.perDecay.repairTimeCost * container.perDecay.countInRoundGeneration;
    harvester.inRoundGeneration.harvestTime = Math.min(
        ENERGY_REGEN_TIME - harvester.inRoundGeneration.repairContainerTime,
        Math.ceil(sourceCapacity / harvester.harvestSpeed)
    );
    harvester.inRoundGeneration.harvestedEnergy = Math.min(
        sourceCapacity,
        harvester.harvestSpeed * harvester.inRoundGeneration.harvestTime
    );
    container.inRoundGeneration.gainedEnergy =
        Math.min(harvester.inRoundGeneration.harvestedEnergy, sourceCapacity) -
        container.perDecay.repairEnergyCost * container.perDecay.countInRoundGeneration;
    container.inRoundGeneration.gainedEnergyPerTick = container.inRoundGeneration.gainedEnergy / ENERGY_REGEN_TIME;
    carrier.inRoundCarry.fillTime = carrier.capacity / container.inRoundGeneration.gainedEnergyPerTick;
    carrier.inRoundCarry.waitForRepairTime =
        (carrier.inRoundCarry.fillTime / CONTAINER_DECAY_TIME) * container.perDecay.repairTimeCost;
    carrier.inRoundCarry.waitTime = Math.ceil(carrier.inRoundCarry.fillTime + carrier.inRoundCarry.waitForRepairTime);
    carrier.inRoundCarry.transitTime = outwardsSourceInput.useLink
        ? outwardsSourceInput.path.outwardsRoomPathLength *
          (carrier.noLoad.moveTimePerStep + carrier.fullLoad.moveTimePerStep)
        : pathLength * (carrier.noLoad.moveTimePerStep + carrier.fullLoad.moveTimePerStep);
    carrier.inRoundCarry.time = Math.max(carrier.inRoundCarry.transitTime, carrier.inRoundCarry.waitTime);
    carrier.inRoundGeneration.transportCapability = (ENERGY_REGEN_TIME / carrier.inRoundCarry.time) * carrier.capacity;
    carrier.maxCarrierNum = Math.min(
        Math.ceil(ENERGY_REGEN_TIME / carrier.inRoundCarry.waitTime),
        Math.round(container.inRoundGeneration.gainedEnergy / carrier.inRoundGeneration.transportCapability)
    );
    carrier.transportCapability = carrier.inRoundGeneration.transportCapability * (CREEP_LIFE_TIME / ENERGY_REGEN_TIME);
    carrier.energyCost.spawnCreeps = carrier.body.energyCost * carrier.maxCarrierNum;
    harvester.energyCost.spawnCreeps = harvester.body.energyCost;
    harvester.energyCost.repairContainer = Math.ceil(
        (harvester.workTime / CONTAINER_DECAY_TIME) * container.perDecay.repairEnergyCost
    );
    harvester.inRoundGeneration.countInLife = harvester.workTime / ENERGY_REGEN_TIME;
    carrier.inRoundGeneration.countInLife = carrier.workTime / ENERGY_REGEN_TIME;
    carrier.energyCost.repairRoad =
        (((carrier.maxCarrierNum * carrier.inRoundGeneration.countInLife * 2 + 1) * carrier.body.total +
            harvester.body.total +
            CREEP_LIFE_TIME) /
            ROAD_DECAY_TIME) *
        outwardsSourceInput.path.outwardsRoomPathLength;

    stats.energyHarvested = Math.round(
        harvester.inRoundGeneration.harvestedEnergy * (CREEP_LIFE_TIME / ENERGY_REGEN_TIME)
    );
    stats.energyStranded = stats.energyHarvested - harvester.energyCost.repairContainer - carrier.transportCapability;
    stats.energyCost = Math.round(
        harvester.energyCost.spawnCreeps +
            harvester.energyCost.repairContainer +
            carrier.energyCost.spawnCreeps +
            carrier.energyCost.repairRoad +
            (isReserverUsed(reserverInput) ? (reserver.energyCost?.spawnCreeps as number) : 0)
    );
    stats.energyProfit = Math.round(stats.energyHarvested - stats.energyCost - stats.energyStranded);
    stats.energyOnSpawn =
        harvester.energyCost.spawnCreeps +
        carrier.energyCost.spawnCreeps +
        (isReserverUsed(reserverInput) ? (reserver.energyCost?.spawnCreeps as number) : 0);
    stats.energyOnRepair = harvester.energyCost.repairContainer + carrier.energyCost.repairRoad;
    stats.timeOnSpawn = Math.round(
        harvester.body.spawnTime * (CREEP_LIFE_TIME / harvester.workTime) +
            carrier.body.spawnTime * carrier.maxCarrierNum * (CREEP_LIFE_TIME / carrier.workTime) +
            (isReserverUsed(reserverInput) ? (reserver.body?.spawnTime as number) : 0) *
                (CREEP_LIFE_TIME / (isReserverUsed(reserverInput) ? (reserver.spawnInterval as number) : 0))
    );
    stats.efficiency = (stats.energyProfit / stats.energyHarvested) * 100;

    stats.efficiency = stats.efficiency.toFixed(2) + "%";
    stats.energyOnRepair = stats.energyOnRepair.toFixed(2);
    carrier.energyCost.repairRoad = carrier.energyCost.repairRoad.toFixed(2);
    harvester.inRoundGeneration.countInLife = harvester.inRoundGeneration.countInLife.toFixed(2);
    carrier.inRoundGeneration.countInLife = carrier.inRoundGeneration.countInLife.toFixed(2);
    carrier.inRoundCarry.fillTime = carrier.inRoundCarry.fillTime.toFixed(2);
    carrier.inRoundCarry.waitForRepairTime = carrier.inRoundCarry.waitForRepairTime.toFixed(2);
    container.inRoundGeneration.gainedEnergyPerTick = container.inRoundGeneration.gainedEnergyPerTick.toFixed(2);
    return {
        harvester,
        carrier,
        reserver,
        container,
        stats
    };
}

function isReserverUsed(reserverInput: ReserverInput): reserverInput is {
    used: true;
    body: string;
    moveBoost?: number | undefined;
} {
    return reserverInput.used;
}
