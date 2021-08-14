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
