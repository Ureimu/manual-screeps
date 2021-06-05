import { PosStr } from "utils/RoomPositionToStr";

export function getBlankSpace(pos: RoomPosition): RoomPosition[] {
    const posStr = PosStr.setPosToStr(pos);
    const squareSet = PosStr.getSquarePosStr(posStr).add(posStr);
    const BlankSpaceList = [];
    squareSet.forEach(squarePosStr => {
        const squarePos = PosStr.getPosFromStr(squarePosStr);
        const look = squarePos.look();
        look.forEach(function (lookObject) {
            if (lookObject.type === "terrain" && lookObject.terrain !== "wall") {
                BlankSpaceList.push(squarePos);
            }
        });
    });
    return [];
}
