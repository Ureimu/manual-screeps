import { assert } from "chai";
import { bodyTools } from "creep/body/tools";
import { SeparateHarvestAndCarryModel, sourceCalculator } from "screeps-calculator";
import { PathInput } from "screeps-calculator/dist/src/sourceCalculator/inits/path";
import { mockConstants } from "./mock";

import { mkdirSync, writeFileSync } from "fs";
import { isUndefined } from "lodash";

const DIST = "./test/data/";
const storagePath = `${DIST}/pathLength/`;
mkdirSync(storagePath, { recursive: true });
mockConstants();
describe("calculator", () => {
    it("should return right number of out", () => {
        for (let index5 = 0; index5 < 400; index5 += 1) {
            console.log(index5);
            const path = {
                ownedRoomPathLength: { plain: 0, swamp: 0, road: 30 },
                reservePathLength: { plain: 0, swamp: 0, road: index5 },
                outwardsRoomPathLength: { plain: 0, swamp: 0, road: index5 }
            };
            const outwardsSourceConfig = {
                path,
                capacity: SOURCE_ENERGY_CAPACITY,
                powers: {},
                useLink: true
            };
            const reserverBodyGroup = ["m2i2"]; // getAllBody(["move", "claim"], name => 2); // "m10i10"; // move 10 claim 10
            const workerBodyGroup = getAllBody(["move", "carry", "work"], name => {
                if (name === "carry") return [1, 1];
                if (name === "move") return [1, 1];
                else return [1, 10];
            }); // `w6c1m3` work 6 carry 1 move 3
            const carrierBodyGroup = getAllBody(["move", "carry", "work"], name => {
                if (name === "work") return [1, 1];
                else if (name === "carry") return [1, 34];
                else return [1, 17];
            });
            // console.log("575", carrierBodyGroup[575]);
            // console.log(reserverBodyGroup.length, workerBodyGroup.length, carrierBodyGroup.length);
            const sumList = [reserverBodyGroup, workerBodyGroup, carrierBodyGroup];
            const countList = _.fill(Array(sumList.length), 0);
            const fullList: { reserverBody: string; harvesterBody: string; carrierBody: string }[] = [];
            while (countList[sumList.length - 1] < sumList[sumList.length - 1].length - 1) {
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
                if (!carrierBodyGroup[countList[2]]) console.log(countList);
                if (!carrierBodyGroup[countList[2]]) continue;
                fullList.push({
                    reserverBody: reserverBodyGroup[countList[0]],
                    harvesterBody: workerBodyGroup[countList[1]],
                    carrierBody: carrierBodyGroup[countList[2]]
                });
                // if (fullList.length % 100000 === 0) console.log(fullList.length, countList);
                countList[0]++;
            }
            // console.log(fullList.length);
            const fullListCopy = fullList.slice(0);
            const fullCalculatedList = fullListCopy.map(
                ({ reserverBody, harvesterBody: workerBody, carrierBody }, index) => {
                    if (!reserverBody || !workerBody || !carrierBody) {
                        // console.log(index);
                        return 0;
                    }
                    // if (index % 100000 === 0) console.log(index);
                    const model = getModel(workerBody, carrierBody, reserverBody, path);
                    sourceCalculator(model);
                    return model.obtainStats().energyProfit;
                }
            );
            const fullCalculatedListCopy = fullCalculatedList.slice(0);
            // console.log("start sorting");
            const sortedFullCalculatedList = fullCalculatedList.sort((a, b) => b - a);
            // console.log(sortedFullCalculatedList[0], sortedFullCalculatedList[sortedFullCalculatedList.length - 1]);
            for (let index = 0; index < 10; index++) {
                const bestIndex = fullCalculatedListCopy.findIndex(value => {
                    if (sortedFullCalculatedList[index] === value) {
                        return true;
                    }
                    return false;
                });

                // console.log(fullCalculatedListCopy[bestIndex]);
                // console.log(fullList[bestIndex]);
                const { reserverBody, harvesterBody: workerBody, carrierBody } = fullList[bestIndex];
                // if (index5 >= 181 && carrierBody === undefined)
                // console.log(index5, index, workerBody, carrierBody, reserverBody);
                // if (index5 >= 181 && carrierBody === undefined) continue;
                const model = getModel(workerBody, carrierBody, reserverBody, path);

                const result = sourceCalculator(model);
                console.log(model.obtainStats().energyProfit);

                // console.log(JSON.stringify(model.obtainStats()));
                const fileName = `${index5}f${index}.json`;
                const jsonData = JSON.stringify(result);
                // 读取下面数据的软件可以在群里下载，叫qcachegrind。
                writeFileSync(storagePath + fileName, jsonData, { encoding: "utf8" });
            }

            assert.isFunction(sourceCalculator);
        }
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

function getModel(workerBody: string, carrierBody: string, reserverBody: string, pathData: PathInput) {
    const model = new SeparateHarvestAndCarryModel({
        harvester: { type: "creep", data: [{ use: true, body: workerBody, boost: {} }] },
        carrier: { type: "creep", data: [{ use: true, body: carrierBody, boost: {} }] },
        container: { type: "container", data: [{ useContainer: true }] },
        source: { type: "source", data: [{ capacity: 3000, powers: {} }] },
        spawn: { type: "spawn", data: [{ powers: {} }] },
        path: {
            type: "path",
            data: [pathData]
        },
        link: {
            type: "link",
            data: [{ useLink: true }]
        },
        reserver: {
            type: "creep",
            data: [{ use: true, body: reserverBody, boost: {} }]
        }
    });
    return model;
}
