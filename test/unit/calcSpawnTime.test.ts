import { assert } from "chai";
import { calcGetPowerSpawnTime } from "../../src/AI/AIUreium/mainControl/getPower/calcSpawnTime";

describe("calcGetPowerSpawnTime", () => {
    it("should always interval 1500 when blankSpaceCount = 1", () => {
        assert.strictEqual(calcGetPowerSpawnTime(1, 0), 0); // 0
        assert.strictEqual(calcGetPowerSpawnTime(1, 1), 1500); // 1500
        assert.strictEqual(calcGetPowerSpawnTime(1, 2), 3000); // 1500+1500
        assert.strictEqual(calcGetPowerSpawnTime(1, 3), 4500); // 1500*3
    });

    it("should match [0,150,1650,1800] for blankSpaceCount = 2", () => {
        // index=0: 0
        assert.strictEqual(calcGetPowerSpawnTime(2, 0), 0);
        // index=1: 150
        assert.strictEqual(calcGetPowerSpawnTime(2, 1), 150);
        // index=2: 150+1500=1650
        assert.strictEqual(calcGetPowerSpawnTime(2, 2), 1650);
        // index=3: 150+1500+150=1800
        assert.strictEqual(calcGetPowerSpawnTime(2, 3), 1800);
        // index=4: 150+1500+150+1500=3300
        assert.strictEqual(calcGetPowerSpawnTime(2, 4), 3300);
        // index=5: 150+1500+150+1500+150=3450
        assert.strictEqual(calcGetPowerSpawnTime(2, 5), 3450);
        // index=6: 150+1500+150+1500+150+1500=4950
        assert.strictEqual(calcGetPowerSpawnTime(2, 6), 4950);
    });

    it("should work for blankSpaceCount = 3", () => {
        // index=0: 0
        assert.strictEqual(calcGetPowerSpawnTime(3, 0), 0);
        // index=1: 150
        assert.strictEqual(calcGetPowerSpawnTime(3, 1), 150);
        // index=2: 150+150=300
        assert.strictEqual(calcGetPowerSpawnTime(3, 2), 300);
        // index=3: 150+150+1500=1800
        assert.strictEqual(calcGetPowerSpawnTime(3, 3), 1800);
        // index=4: 150+150+1500+150=1950
        assert.strictEqual(calcGetPowerSpawnTime(3, 4), 1950);
        // index=5: 150+150+1500+150+150=2100
        assert.strictEqual(calcGetPowerSpawnTime(3, 5), 2100);
        // index=6: 150+150+1500+150+150+1500=3600
        assert.strictEqual(calcGetPowerSpawnTime(3, 6), 3600);
    });

    it("should work for blankSpaceCount = 4", () => {
        // index=0: 0
        assert.strictEqual(calcGetPowerSpawnTime(4, 0), 0);
        // index=1: 150
        assert.strictEqual(calcGetPowerSpawnTime(4, 1), 150);
        // index=2: 150+150=300
        assert.strictEqual(calcGetPowerSpawnTime(4, 2), 300);
        // index=3: 150+150+150=450
        assert.strictEqual(calcGetPowerSpawnTime(4, 3), 450);
        // index=4: 150+150+150+1500=1950
        assert.strictEqual(calcGetPowerSpawnTime(4, 4), 1950);
        // index=5: 150+150+150+1500+150=2100
        assert.strictEqual(calcGetPowerSpawnTime(4, 5), 2100);
        // index=6: 150+150+150+1500+150+150=2250
        assert.strictEqual(calcGetPowerSpawnTime(4, 6), 2250);
        // index=7: 150+150+150+1500+150+150+150=2400
        assert.strictEqual(calcGetPowerSpawnTime(4, 7), 2400);
        // index=8: 150+150+150+1500+150+150+150+1500=3900
        assert.strictEqual(calcGetPowerSpawnTime(4, 8), 3900);
    });
});
