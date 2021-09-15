import { assert } from "chai";
import { add } from "lodash";
import UTF15 from "utils/utf15";
const runEpoch = (num: number, f: () => unknown) => {
    for (let i = 0; i < num; i++) {
        f();
    }
};
const getRandomList = (min: number, max: number, num: number) => {
    const numList: number[] = [];
    const interval = max - min;
    runEpoch(num, () => {
        numList.push(Math.round(Math.random() * interval + min));
    });
    return numList;
};

describe("UTF15", () => {
    describe("basic: UTF15 should work", () => {
        it("should return right number of zip rate", () => {
            [true, false].forEach(bool => {
                const data: number[] = [];
                const testEpochNum = 200;
                const startTime = Date.now();
                runEpoch(testEpochNum, () => {
                    const codec = new UTF15({ array: true, depth: 7, meta: bool });
                    const random = getRandomList(0, 127, 5e2);
                    const str = codec.encode(random);
                    const jsonStr = JSON.stringify(random);
                    const rate = str.length / jsonStr.length;
                    data.push(rate);
                });
                const endTime = Date.now();
                const result = data.reduce(add) / data.length;
                const theoreticalRate = Math.log2(10) / Math.log2(2 ** 15);
                console.log(
                    `rate: ${result.toFixed(2)}, cpu: ${((endTime - startTime) / testEpochNum).toFixed(
                        4
                    )}, theoretical rate:${theoreticalRate.toFixed(2)}`
                );
                assert.isBelow(result, theoreticalRate);
            });
        });

        it("should decode normally when using a new codec", () => {
            [true, false].forEach(bool => {
                const testEpochNum = 20;
                runEpoch(testEpochNum, () => {
                    const codec = new UTF15({ array: true, depth: 7, meta: bool });
                    const random = getRandomList(0, 127, 10);
                    const str = codec.encode(random);
                    const anotherCodec = new UTF15({ array: true, depth: 7, meta: bool });
                    assert.deepStrictEqual(anotherCodec.decode(str), random);
                });
            });
        });
    });
});
