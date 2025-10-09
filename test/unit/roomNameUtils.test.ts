import { mockConstants } from "./mock";
import { assert } from "chai";
import { getSurroundingRoomNames } from "../../src/utils/roomNameUtils";
mockConstants();

describe("RoomNameUtils", () => {
    describe("getSurroundingRoomNames should work", () => {
        it("should return only itself when range=0", () => {
            const result = getSurroundingRoomNames("E1N1", 0);
            assert.deepEqual(result, ["E1N1"]);
        });

        it("should return 9 rooms for range=1 (E0N0)", () => {
            const result = getSurroundingRoomNames("E0N0", 1);
            assert.includeMembers(result, ["E0N0", "E1N0", "E0N1", "E1N1", "W0N0", "W0N1", "W0S0", "E0S0", "E1S0"]);
            assert.lengthOf(result, 9);
        });

        it("should handle W0S0 and direction flip", () => {
            const result = getSurroundingRoomNames("W0S0", 1);
            assert.includeMembers(result, ["W0S0", "W1S0", "W0S1", "W1S1", "E0S0", "E0S1", "E0N0", "W0N0", "W1N0"]);
            assert.lengthOf(result, 9);
        });

        it("should return empty array for invalid room name", () => {
            const result = getSurroundingRoomNames("invalid", 1);
            assert.deepEqual(result, []);
        });
    });
});
