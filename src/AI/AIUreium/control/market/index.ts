import { logManager } from "utils/log4screeps";
import { getRoomControlData } from "..";
import { buyLimitRate, energyCostPrice, sellLimitRate } from "../constants/roomResource";
import { Constant } from "../constants/roomTaskControl";
import { getRoomResourceLimit } from "../roomResources";
const logger = logManager.createLogger("debug", "Market");
export function runTerminal(terminal: StructureTerminal): void {
    const { market } = Constant;
    if (Game.time % market.sellRate !== 0) return;
    logger.info(`${terminal.room.name} terminal runs`);
    const terminalRoomName = terminal.room.name;
    const limit = getRoomResourceLimit(terminalRoomName).terminal;
    const terminalEnergy = terminal.store[RESOURCE_ENERGY];
    const startCpu = Game.cpu.getUsed();
    for (const resourceType of RESOURCES_ALL) {
        const terminalStoreNum = terminal.store[resourceType] ?? 0;
        const specifiedResourceLimit = limit[resourceType];
        if (!specifiedResourceLimit) continue;
        const sellLimit = specifiedResourceLimit.max * sellLimitRate;
        const buyLimit = specifiedResourceLimit.min * buyLimitRate;
        let isDealingEnergy = false;
        if (resourceType === RESOURCE_ENERGY) {
            isDealingEnergy = true;
        }
        if (terminalStoreNum > sellLimit) {
            logger.debug(`${resourceType} overNum:${terminalStoreNum - buyLimit}, try selling`);
            const sellNum = terminalStoreNum - sellLimit;
            const orderList = Game.market.getAllOrders({ type: ORDER_BUY, resourceType }); // 更快
            if (isDealingEnergy) {
                if (!getRoomControlData(terminal.room.name).market.sellEnergy) {
                    logger.debug(
                        `${terminal.room.name} is not allowed to sell energy. set setting.market.sellEnergy to true to allow this.`
                    );
                    continue;
                } else if (sellNum < 100) {
                    logger.debug(`sell num is too low, stop selling. num:${sellNum}`);
                    continue;
                }
            }
            const benefitList = orderList
                .map(order => {
                    if (!order.roomName) throw new Error("order 没有 roomName");
                    if (order.price < specifiedResourceLimit.minSellPrice) {
                        return {
                            id: order.id,
                            amount: 0,
                            benefit: 0,
                            price: order.price,
                            energyCost: 0
                        };
                    }
                    let costPricePerUnit = 0;
                    const dealAmount = order.amount > sellNum ? sellNum : order.amount;
                    const energyCost = Game.market.calcTransactionCost(dealAmount, order.roomName, terminalRoomName);

                    costPricePerUnit += (energyCost * energyCostPrice) / dealAmount;

                    if (energyCost > terminalEnergy)
                        return { id: order.id, amount: dealAmount, benefit: 0, price: order.price, energyCost }; // 能量不足
                    // 花去的能量超过了物品价值，亏本
                    if (costPricePerUnit > order.price)
                        return { id: order.id, amount: dealAmount, benefit: 0, price: order.price, energyCost };
                    else
                        return {
                            id: order.id,
                            amount: dealAmount,
                            benefit: order.price - costPricePerUnit,
                            price: order.price,
                            energyCost
                        };
                })
                .sort((a, b) => b.benefit - a.benefit);
            if (benefitList[0] && benefitList[0].benefit > 0) {
                const orderToDeal = benefitList[0];
                Game.market.deal(orderToDeal.id, orderToDeal.amount, terminalRoomName);
                logger.info(
                    `sell ${resourceType}, amount: ${orderToDeal.amount}, price:${orderToDeal.price}, energyCost:${
                        orderToDeal.energyCost
                    }, earns ${(orderToDeal.amount * orderToDeal.price).toFixed(0)} credits.`
                );
                return;
            } else {
                if (benefitList[0]) {
                    const orderToDeal = benefitList[0];
                    logger.debug(`${resourceType} not sold. Best order benefit: ${orderToDeal.benefit}`);
                } else {
                    logger.debug(`${resourceType} not sold. No available order.`);
                }
            }
        }
        if (terminalStoreNum < buyLimit) {
            logger.debug(`${resourceType} requireNum:${buyLimit - terminalStoreNum}, try buying`);

            const buyNum = buyLimit - terminalStoreNum;
            if (isDealingEnergy) {
                if (!getRoomControlData(terminal.room.name).market.buyEnergy) {
                    logger.debug(
                        `${terminal.room.name} is not allowed to buy energy. set setting.market.buyEnergy to true to allow this.`
                    );
                    continue;
                } else if (buyNum < 100) {
                    logger.debug(`buy num is too low, stop buying. num:${buyNum}`);
                    continue;
                }
            }
            const orderList = Game.market.getAllOrders({ type: ORDER_SELL, resourceType }); // 更快
            const history = Game.market.getHistory(resourceType);
            const meanValue = history.map(i => i.avgPrice).reduce((p, i) => (p += i), 0) / history.length;

            const costList = orderList
                .map(order => {
                    if (!order.roomName) throw new Error("order 没有 roomName");
                    if (order.price > specifiedResourceLimit.maxBuyPrice) {
                        return { id: order.id, amount: 0, cost: 0, price: order.price, energyCost: 0 };
                    }
                    let costPricePerUnit = 0;
                    const dealAmount = order.amount > buyNum ? buyNum : order.amount;
                    const energyCost = Game.market.calcTransactionCost(dealAmount, order.roomName, terminalRoomName);

                    costPricePerUnit += (energyCost * energyCostPrice) / dealAmount;
                    // 能量不足
                    if (energyCost > terminalEnergy)
                        return { id: order.id, amount: dealAmount, cost: 0, price: order.price, energyCost };
                    else
                        return {
                            id: order.id,
                            amount: dealAmount,
                            cost: order.price + costPricePerUnit,
                            price: order.price,
                            energyCost
                        };
                })
                .sort((a, b) => a.cost - b.cost);
            if (costList[0] && costList[0].cost > 0) {
                const orderToDeal = costList[0];
                Game.market.deal(orderToDeal.id, orderToDeal.amount, terminalRoomName);
                logger.info(
                    `buy ${resourceType}, amount: ${orderToDeal.amount}, price:${orderToDeal.price}, energyCost:${
                        orderToDeal.energyCost
                    }, costs ${(orderToDeal.amount * orderToDeal.price).toFixed(0)} credits.`
                );
                return;
            } else {
                if (costList[0]) {
                    const orderToDeal = costList[0];
                    logger.debug(`${resourceType} not bought. Best order cost: ${orderToDeal.cost}`);
                } else {
                    logger.debug(`${resourceType} not bought. No available order.`);
                }
            }
        }
    }
    const endCpu = Game.cpu.getUsed();
    logger.info(`${terminal.room.name} terminal runs end, cost:${(endCpu - startCpu).toFixed(2)}`);
}
