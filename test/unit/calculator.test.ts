import { calculator } from "calculator/outwardsSource";
import { assert } from "chai";
import { bodyAbbreviation, bodyTools } from "creep/body/tools";
import { mockConstants } from "./mock";
mockConstants();
describe("calculator", () => {
    it("should return right number of out", () => {
        console.log(
            calculator(
                {
                    path: { outwardsRoomPathLength: 40, ownedRoomPathLength: 30, reservePathLength: 30 },
                    capacity: SOURCE_ENERGY_CAPACITY,
                    powers: { [PWR_REGEN_SOURCE]: 5, [PWR_OPERATE_SPAWN]: 5 }
                },
                { body: "w12c1m6" },
                { body: "m3c6*5m1w1" },
                { used: true, body: "m1i1" }
            )
        );
        assert.isFunction(calculator);
    });
    it("should return right number of out", () => {
        const path = { outwardsRoomPathLength: 30, ownedRoomPathLength: 30, reservePathLength: 50 };
        const outwardsSourceConfig = {
            path,
            capacity: SOURCE_ENERGY_CAPACITY,
            powers: {},
            useLink: true
        };
        const reserverBodyGroup = ["m2i2"]; // getAllBody(["move", "claim"], name => 2); // "m10i10"; // move 10 claim 10
        const workerBodyGroup = getAllBody(["move", "carry", "work"], name => {
            if (name === "carry") return [1, 1];
            else return [1, 50];
        }); // `w6c1m3` work 6 carry 1 move 3
        const carrierBodyGroup = getAllBody(["move", "carry", "work"], name => {
            if (name === "work") return [1, 2];
            else return [1, 50];
        });
        console.log(reserverBodyGroup.length, workerBodyGroup.length, carrierBodyGroup.length);
        const sumList = [reserverBodyGroup, workerBodyGroup, carrierBodyGroup];
        const countList = _.fill(Array(sumList.length), 0);
        const fullList: { reserverBody: string; harvesterBody: string; carrierBody: string }[] = [];
        while (countList[sumList.length - 1] < sumList[sumList.length - 1].length) {
            for (let index = 0; index < countList.length; index++) {
                const element = countList[index];
                if (element >= sumList[index].length) {
                    if (index + 1 < countList.length) {
                        countList[index] = 0;
                        countList[index + 1]++;
                    } else {
                        break;
                    }
                }
            }
            fullList.push({
                reserverBody: reserverBodyGroup[countList[0]],
                harvesterBody: workerBodyGroup[countList[1]],
                carrierBody: carrierBodyGroup[countList[2]]
            });
            if (fullList.length % 100000 === 0) console.log(fullList.length, countList);
            countList[0]++;
        }
        console.log(fullList.length);
        const fullListCopy = fullList.slice(0);
        const fullCalculatedList = fullListCopy.map(
            ({ reserverBody, harvesterBody: workerBody, carrierBody }, index) => {
                if (!reserverBody || !workerBody || !carrierBody) {
                    // console.log(index);
                    return 0;
                }
                if (index % 100000 === 0) console.log(index);
                return calculator(
                    outwardsSourceConfig,
                    { body: workerBody },
                    { body: carrierBody },
                    { used: true, body: reserverBody }
                ).stats.energyProfit as number;
            }
        );
        const fullCalculatedListCopy = fullCalculatedList.slice(0);
        console.log("start sorting");
        const sortedFullCalculatedList = fullCalculatedList.sort((a, b) => b - a);
        console.log(sortedFullCalculatedList[0], sortedFullCalculatedList[sortedFullCalculatedList.length - 1]);
        for (let index = 0; index < 5; index++) {
            const bestIndex = fullCalculatedListCopy.findIndex(value => {
                if (sortedFullCalculatedList[index] === value) {
                    return true;
                }
                return false;
            });
            {
                console.log(fullCalculatedListCopy[bestIndex]);
                console.log(fullList[bestIndex]);
                const { reserverBody, harvesterBody: workerBody, carrierBody } = fullList[bestIndex];
                console.log(
                    calculator(
                        outwardsSourceConfig,
                        { body: workerBody },
                        { body: carrierBody },
                        { used: true, body: reserverBody }
                    ).stats
                );
            }
        }

        assert.isFunction(calculator);
    });
});

function bodyIndexListIsBodyIndexList<T extends BodyPartConstant>(
    list: { [name in T]?: number }
): list is { [name in T]: number } {
    return true;
}

function getAllBody<T extends BodyPartConstant>(bodyList: T[], limit: (bodyName: T) => [number, number]): string[] {
    const fullBodyList: string[] = [];
    const bodyIndexList: { [name in T]?: number } = {};
    bodyList.forEach((name, index) => {
        bodyIndexList[name] = index;
    });
    if (bodyIndexListIsBodyIndexList(bodyIndexList)) {
        const bodyAbbreviationReverse: { [key in BodyPartConstant]: string } = {
            move: "m",
            work: "w",
            carry: "c",
            attack: "a",
            ranged_attack: "r",
            tough: "t",
            heal: "h",
            claim: "i"
        };
        const shortcutList = bodyList.map(bodyName => {
            return bodyAbbreviationReverse[bodyName];
        });
        const countList: number[] = _.fill(Array(shortcutList.length), 0);
        while (countList[countList.length - 1] < 50) {
            countList[0]++;
            for (let index = 0; index < countList.length; index++) {
                const element = countList[index];
                if (element > 50) {
                    if (index + 1 < countList.length) {
                        countList[index] = 1;
                        countList[index + 1]++;
                    } else {
                        break;
                    }
                }
            }
            if (countList.reduce((sum, num) => (sum += num), 0) > 50) continue;
            let flag = false;
            bodyList.forEach(bodyName => {
                const limitList = limit(bodyName);
                if (
                    countList[bodyIndexList[bodyName]] > limitList[1] ||
                    countList[bodyIndexList[bodyName]] < limitList[0]
                ) {
                    flag = true;
                }
            });
            if (flag) continue;
            const body = countList.reduce((str, value, index) => `${str}${shortcutList[index]}${value}`, "");
            if (!bodyTools.check(body)) {
                // console.log(body);
                continue;
            }
            if (!body) console.log("不存在");
            fullBodyList.push(body);
        }
        return fullBodyList;
    } else {
        return [];
    }
}
