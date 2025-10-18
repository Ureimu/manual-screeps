import { consoleStyle, LogLevel } from "frame/console/style";
import { buyLimitRate, energyCostPrice, resourceLimit, sellLimitRate } from "../constants/roomResource";
import { Constant } from "../constants/roomTaskControl";
const debug = (message: string, level: LogLevel) =>
    level === "error" ? console.log(consoleStyle("terminal")(message, level)) : void 0;
export function runTerminal(terminal: StructureTerminal): void {
    const { market } = Constant;
    if (Game.time % market.sellRate !== 0) return;
    debug(`terminal runs`, "info");
    const terminalRoomName = terminal.room.name;
    const limit = resourceLimit.terminal;
    const terminalEnergy = terminal.store[RESOURCE_ENERGY];
    for (const resourceType of RESOURCES_ALL) {
        const terminalStoreNum = terminal.store[resourceType] ?? 0;
        const specifiedResourceLimit = limit[resourceType];
        if (!specifiedResourceLimit) continue;
        const sellLimit = specifiedResourceLimit.max * sellLimitRate;
        const buyLimit = specifiedResourceLimit.min * buyLimitRate;
        if (terminalStoreNum > sellLimit) {
            debug(`${resourceType} overNum:${terminalStoreNum - buyLimit}`, "info");
            const sellNum = terminalStoreNum - sellLimit;
            const orderList = Game.market.getAllOrders({ type: ORDER_BUY, resourceType }); // 更快
            let isDealingEnergy = false;
            if (resourceType === RESOURCE_ENERGY) {
                isDealingEnergy = true;
            }
            const benefitList = orderList
                .map(order => {
                    if (!order.roomName) throw new Error("order 没有 roomName");
                    let costPricePerUnit = 0;
                    const dealAmount = order.amount > sellNum ? sellNum : order.amount;
                    const energyCost = Game.market.calcTransactionCost(dealAmount, order.roomName, terminalRoomName);

                    costPricePerUnit += (energyCost * energyCostPrice) / dealAmount;

                    if (energyCost > terminalEnergy) return { id: order.id, amount: dealAmount, benefit: 0 }; // 能量不足
                    // 花去的能量超过了物品价值，亏本
                    if (costPricePerUnit > order.price) return { id: order.id, amount: dealAmount, benefit: 0 };
                    else return { id: order.id, amount: dealAmount, benefit: order.price - costPricePerUnit };
                })
                .sort((a, b) => b.benefit - a.benefit);
            if (benefitList[0] && benefitList[0].benefit > 0) {
                const orderToDeal = benefitList[0];
                Game.market.deal(orderToDeal.id, orderToDeal.amount, terminalRoomName);
                debug(`sell ${resourceType},amount: ${orderToDeal.amount}`, "info");
                return;
            }
        }
        if (terminalStoreNum < buyLimit) {
            debug(`${resourceType} requireNum:${buyLimit - terminalStoreNum}`, "info");
            let isDealingEnergy = false;
            if (resourceType === RESOURCE_ENERGY) {
                isDealingEnergy = true;
            }
            const buyNum = buyLimit - terminalStoreNum;
            if (isDealingEnergy && (buyNum < 100 || !Constant.market.buyEnergy)) {
                continue;
            }
            const orderList = Game.market.getAllOrders({ type: ORDER_SELL, resourceType }); // 更快
            const history = Game.market.getHistory(resourceType);
            const meanValue = history.map(i => i.avgPrice).reduce((p, i) => (p += i), 0) / history.length;

            const costList = orderList
                .map(order => {
                    if (!order.roomName) throw new Error("order 没有 roomName");
                    let costPricePerUnit = 0;
                    const dealAmount = order.amount > buyNum ? buyNum : order.amount;
                    const energyCost = Game.market.calcTransactionCost(dealAmount, order.roomName, terminalRoomName);

                    costPricePerUnit += (energyCost * energyCostPrice) / dealAmount;
                    // 能量不足
                    if (energyCost > terminalEnergy)
                        return { id: order.id, amount: dealAmount, cost: 0, price: order.price };
                    else
                        return {
                            id: order.id,
                            amount: dealAmount,
                            cost: order.price + costPricePerUnit,
                            price: order.price
                        };
                })
                .sort((a, b) => a.cost - b.cost);
            if (costList[0] && costList[0].cost > 0) {
                const orderToDeal = costList[0];
                Game.market.deal(orderToDeal.id, orderToDeal.amount, terminalRoomName);
                debug(`buy ${resourceType},amount: ${orderToDeal.amount}`, "info");
                return;
            }
        }
    }
}
