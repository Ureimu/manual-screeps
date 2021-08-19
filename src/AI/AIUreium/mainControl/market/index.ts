import { energyCostPrice, resourceLimit } from "../constants/roomResource";
import { Constant } from "../constants/roomTaskControl";

export function runTerminal(terminal: StructureTerminal): void {
    const { market } = Constant;
    if (Game.time % market.sellRate !== 0) return;
    const terminalRoomName = terminal.room.name;
    const limit = resourceLimit.terminal;
    const terminalEnergy = terminal.store[RESOURCE_ENERGY];
    for (const resourceType of RESOURCES_ALL) {
        const terminalStoreNum = terminal.store[resourceType];
        const specifiedResourceLimit = limit[resourceType];
        if (!specifiedResourceLimit || !terminalStoreNum) continue;
        const sellLimit = (specifiedResourceLimit.max - specifiedResourceLimit.min) * 0.5;

        if (terminalStoreNum > sellLimit) {
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
            }
        }
    }
}
