import { mockConstants } from "./mock";
import { assert } from "chai";
import { getSurroundingRoomNames, getRoomsInRectangle } from "../../src/utils/roomNameUtils";
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

    describe("getRoomsInRectangle should work", () => {
        it("should return only the same room when both corners are identical", () => {
            const res = getRoomsInRectangle("E1N1", "E1N1");
            assert.deepEqual(res, ["E1N1"]);
        });

        it("should return 4 rooms for rectangle E0N0 to E1N1", () => {
            const res = getRoomsInRectangle("E0N0", "E1N1");
            assert.includeMembers(res, ["E0N0", "E0N1", "E1N0", "E1N1"]);
            assert.lengthOf(res, 4);
        });

        it("should handle rectangles crossing axes (E0N0 <-> W0S0)", () => {
            const res = getRoomsInRectangle("E0N0", "W0S0");
            // expected rooms: W0S0, W0N0, E0S0, E0N0
            assert.includeMembers(res, ["W0S0", "W0N0", "E0S0", "E0N0"]);
            assert.lengthOf(res, 4);
        });

        it("should return empty array for invalid room names", () => {
            const res = getRoomsInRectangle("invalid", "E1N1");
            assert.deepEqual(res, []);
        });
    });
});
