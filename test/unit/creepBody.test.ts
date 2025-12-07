import { assert } from "chai";
import { bodyTools } from "frame/creep/body/tools";
import { mockConstants } from "./mock";
mockConstants();
describe("compileCreepBody", () => {
    it("should return right number of cost", () => {
        assert.isTrue(bodyTools.getEnergyCost("m2c2") === 200);
        assert.isTrue(bodyTools.getEnergyCost("m2c2*5w1") === 1100);
    });

    it("should return right number of body", () => {
        assert.isTrue(bodyTools.getNum("m2c2") === 4);
        assert.isTrue(bodyTools.getNum("m2c2*5w1") === 21);
        assert.isTrue(bodyTools.getNum("m5c5w1") === 11);
        assert.isTrue(bodyTools.getNum("m2c2*5w1", ["move"]) === 10);
        assert.isTrue(bodyTools.getNum("m2c2*5w1", ["claim"]) === 0);
    });

    it("should return right body", () => {
        assert.isTrue(bodyTools.compile("m2c2").join("") === ["move", "move", "carry", "carry"].join(""));
        assert.isTrue(
            bodyTools.compile("m3r1h1t1*2m1").join("") ===
                [
                    "move",
                    "move",
                    "move",
                    "ranged_attack",
                    "heal",
                    "tough",
                    "move",
                    "move",
                    "move",
                    "ranged_attack",
                    "heal",
                    "tough",
                    "move"
                ].join("")
        );
    });

    it("should return right check state", () => {
        assert.isTrue(bodyTools.check("m2c2"));
        assert.isTrue(bodyTools.check("m2c2*5w1"));
    });

    it("should return false check state", () => {
        assert.isFalse(bodyTools.check("m*"));
        assert.isFalse(bodyTools.check("mmmm"));
        assert.isFalse(bodyTools.check("std2*"));
        assert.isFalse(bodyTools.check("m2c2*"));
        assert.isFalse(bodyTools.check("m2c2i"));
    });
});

describe("parseBoostInfo", () => {
    it("should parse simple move boost (m5 m3b1)", () => {
        const res = bodyTools.parseBoostInfo("m5 m3b1");
        // b1 on move maps to ZO
        assert.property(res.byCompound, "ZO");
        assert.equal(res.byCompound["ZO"], 3);
        assert.property(res.byPart, "move");
        assert.equal(res.byPart["move"]["ZO"], 3);
        // energy should be count * LAB_BOOST_ENERGY (mockConstants sets LAB_BOOST_ENERGY)
        assert.property(res.energy, "ZO");
        assert.equal(res.energy["ZO"], res.byCompound["ZO"] * LAB_BOOST_ENERGY);
    });

    it("should parse work boost with implicit count (m1w1*2 wu1)", () => {
        const res = bodyTools.parseBoostInfo("m1w1*2 wu1");
        // wu1 -> for work 'w' u1 -> UO
        assert.property(res.byCompound, "UO");
        // m1w1*2 contains two work parts according to the body syntax
        assert.equal(res.byCompound["UO"], 2);
        assert.property(res.byPart, "work");
        assert.equal(res.byPart["work"]["UO"], 2);
        assert.property(res.energy, "UO");
        assert.equal(res.energy["UO"], res.byCompound["UO"] * LAB_BOOST_ENERGY);
    });

    it("should parse complex boosts across multiple parts (m3r1h1t1*2m1 m2b1 rb2 h1b3)", () => {
        const res = bodyTools.parseBoostInfo("m3r1h1t1*2m1 m2b1 rb2 h1b3");
        // flattened body: m3r1h1t1 m3r1h1t1 m1 -> totals: m=7, r=2, h=2, t=2
        // m2b1 -> ZO x2
        // rb2  -> KHO2 x2 (all ranged parts)
        // h1b3 -> XLHO2 x1
        assert.property(res.byCompound, "ZO");
        assert.property(res.byCompound, "KHO2");
        assert.property(res.byCompound, "XLHO2");

        assert.equal(res.byCompound["ZO"], 2);
        assert.equal(res.byCompound["KHO2"], 2);
        assert.equal(res.byCompound["XLHO2"], 1);

        assert.property(res.byPart, "move");
        assert.property(res.byPart, "ranged_attack");
        assert.property(res.byPart, "heal");

        assert.equal(res.byPart["move"]["ZO"], 2);
        assert.equal(res.byPart["ranged_attack"]["KHO2"], 2);
        assert.equal(res.byPart["heal"]["XLHO2"], 1);

        assert.equal(res.energy["ZO"], 2 * LAB_BOOST_ENERGY);
        assert.equal(res.energy["KHO2"], 2 * LAB_BOOST_ENERGY);
        assert.equal(res.energy["XLHO2"], 1 * LAB_BOOST_ENERGY);
    });
});
