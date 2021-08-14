import { PosStr } from "utils/RoomPositionToStr";
import { getUpgradeSpeed } from "frame/visual/roomInf/upgradeSpeed";

const roomInfStr = (room: Room) =>
    `level:${room.controller?.level as number}
us:${getUpgradeSpeed(room.name)[0].toFixed(0)}/tick
nl:${getUpgradeSpeed(room.name)[1].toFixed(0)}
`;

export function roomInf(room: Room): void {
    printMultiLineText(roomInfStr(room), PosStr.genePosStr(0, 0, room.name), {
        fontSize: 5,
        align: "left"
    });
}

export function printMultiLineText(
    str: string,
    posStr: string,
    style: MapTextStyle & { lineSpacing?: number } = { fontSize: 10, lineSpacing: 2 }
): void {
    const { fontSize = 10, lineSpacing = 2 } = style;
    const strList = str.split("\n");
    const pos = PosStr.getPosFromStr(posStr);
    strList.forEach((strHere, index) => {
        Game.map.visual.text(
            strHere,
            new RoomPosition(pos.x, pos.y + Math.ceil(fontSize / 2) + index * (fontSize + lineSpacing), pos.roomName),
            style
        );
    });
}
