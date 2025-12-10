import { assert } from "chai";
import { bodyTools } from "frame/creep/body/tools";
import { mockConstants } from "./mock";

mockConstants();

describe("getPowerBodyCollection bodies", () => {
    const gpAttacker = "t5m25a20 t5b2 a20b2";
    const gpHealer = "m19h19 h19b2";
    const gpCarrier = "m17c33";

    it("gpCarrier should have correct counts", () => {
        assert.isTrue(bodyTools.check(gpCarrier));
        assert.equal(bodyTools.getNum(gpCarrier), 50);
        assert.equal(bodyTools.getNum(gpCarrier, ["move"]), 17);
        assert.equal(bodyTools.getNum(gpCarrier, ["carry"]), 33);
        assert.equal(bodyTools.compile(gpCarrier).length, bodyTools.getNum(gpCarrier));
    });

    it("gpHealer should have correct counts", () => {
        assert.isTrue(bodyTools.check(gpHealer));
        assert.equal(bodyTools.getNum(gpHealer), 38);
        assert.equal(bodyTools.getNum(gpHealer, ["move"]), 19);
        assert.equal(bodyTools.getNum(gpHealer, ["heal"]), 19);
        assert.equal(bodyTools.compile(gpHealer).length, bodyTools.getNum(gpHealer));
    });

    it("gpAttacker should have correct counts", () => {
        assert.isTrue(bodyTools.check(gpAttacker));
        assert.equal(bodyTools.getNum(gpAttacker), 50);
        assert.equal(bodyTools.getNum(gpAttacker, ["move"]), 25);
        assert.equal(bodyTools.getNum(gpAttacker, ["tough"]), 5);
        assert.equal(bodyTools.getNum(gpAttacker, ["attack"]), 20);
        assert.equal(bodyTools.compile(gpAttacker).length, bodyTools.getNum(gpAttacker));
    });

    it("gpCarrier boost info should be correct", () => {
        const boostInfo = bodyTools.parseBoostInfo(gpCarrier);
        assert.isObject(boostInfo);
        // parseBoostInfo 返回 byCompound 和 energy
        assert.containsAllKeys(boostInfo, ["byCompound", "energy"]);
        // gpCarrier 没有 boost，byCompound 应为空
        assert.deepEqual(boostInfo.byCompound, {});
        assert.deepEqual(boostInfo.energy, {});
    });

    it("gpHealer boost info should be correct", () => {
        const boostInfo = bodyTools.parseBoostInfo(gpHealer);
        assert.isObject(boostInfo);
        assert.containsAllKeys(boostInfo, ["byCompound", "energy"]);
        assert.deepEqual(boostInfo.byCompound, { LHO2: 19 });
        assert.deepEqual(boostInfo.energy, { LHO2: 380 });
    });

    it("gpAttacker boost info should be correct", () => {
        const boostInfo = bodyTools.parseBoostInfo(gpAttacker);
        assert.isObject(boostInfo);
        assert.containsAllKeys(boostInfo, ["byCompound", "energy"]);
        assert.deepEqual(boostInfo.byCompound, { GHO2: 5, UH2O: 20 });
        assert.deepEqual(boostInfo.energy, { GHO2: 100, UH2O: 400 });
    });
});
