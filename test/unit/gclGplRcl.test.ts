import { assert } from "chai";
import {
    getGclSumProcessBeforeLevel,
    gclProcessTotal,
    gplProcessTotal,
    getGplSumProcessBeforeLevel,
    getRclSumProcessBeforeLevel,
    rclProcessTotal
} from "frame/calculator/gclGplRcl";
import { writeFileSync } from "fs";
import { describe } from "mocha";
import { mockConstants } from "./mock";
mockConstants();
const runEpoch = (num: number, f: (index: number) => unknown) => {
    for (let i = 0; i < num; i++) {
        f(i);
    }
};
const getDepth = (num: number): number => {
    let depth = 0;
    while (Math.pow(2, depth) < num) {
        depth++;
    }
    return depth;
};
const nameMap: { [name: string]: { name: string; sumFun: (arg0: number) => number; fun: (arg0: number) => number } } = {
    gcl: {
        name: "gcl",
        sumFun: getGclSumProcessBeforeLevel,
        fun: gclProcessTotal
    },
    gpl: {
        name: "gpl",
        sumFun: getGplSumProcessBeforeLevel,
        fun: gplProcessTotal
    },
    rcl: {
        name: "rcl",
        sumFun: getRclSumProcessBeforeLevel,
        fun: rclProcessTotal
    }
};

function test(name: keyof typeof nameMap) {
    it(`${name} runs`, () => {
        const jsonData: { depth: number; total: number; level: number; sum: number; sumDepth: number }[] = [];
        let sum = 0;

        runEpoch(1000, index => {
            const level = index + 1;
            const total = nameMap[name].fun(level);
            const depth = getDepth(total);
            assert.isBelow(nameMap[name].sumFun(level) - sum, 1e-5);
            sum += total;
            const sumDepth = getDepth(sum);
            jsonData.push({ total, depth, level, sum, sumDepth });
        });

        writeFileSync(`test/data/gclGplRcl/${name}.json`, JSON.stringify(jsonData, null, 4));
    });
}

describe("TimeSeriesData", () => {
    Object.values(nameMap).forEach(nameHere => test(nameHere.name as keyof typeof nameMap));
});
