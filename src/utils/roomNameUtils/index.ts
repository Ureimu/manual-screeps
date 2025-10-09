const ROOM_NAME_REGEX = /^([EW])(\d{1,3})([NS])(\d{1,3})$/;
export const checkHighwayRoomName = /^[EW](?:\d{1,2}0|0)[NS]\d{1,3}$|^[EW]\d{1,3}[NS](?:\d{1,2}0|0)$/;
export const checkControllerRoomName = /(^[WE]\d*[1-9]+[NS]\d*[1-3|7-9]+$)|(^[WE]\d*[1-3|7-9]+[NS]\d*[1-9]+$)/;
/**
 * 解析房间名，返回对象 { ew, x, ns, y }
 */
export function parseRoomName(roomName: string): { ew: "E" | "W"; x: number; ns: "N" | "S"; y: number } | null {
    const match = ROOM_NAME_REGEX.exec(roomName);
    if (!match) return null;
    return {
        ew: match[1] as "E" | "W",
        x: parseInt(match[2], 10),
        ns: match[3] as "N" | "S",
        y: parseInt(match[4], 10)
    };
}

/**
 * 根据坐标和方向生成房间名
 */
export function generateRoomName(ew: "E" | "W", x: number, ns: "N" | "S", y: number): string {
    return `${ew}${x}${ns}${y}`;
}

/**
 * 获取给定房间名周围指定范围内的房间名列表（包含自身）
 * @param roomName 房间名
 * @param range 范围（>=0）
 */
export function getSurroundingRoomNames(roomName: string, range: number): string[] {
    const parsed = parseRoomName(roomName);
    if (!parsed) return [];
    const result: string[] = [];
    for (let dx = -range; dx <= range; dx++) {
        for (let dy = -range; dy <= range; dy++) {
            // 计算新坐标和方向
            let nx = parsed.x + dx;
            let n_ew: "E" | "W" = parsed.ew;
            if (nx < 0) {
                n_ew = n_ew === "E" ? "W" : "E";
                nx = -nx - 1;
            }
            let ny = parsed.y + dy;
            let n_ns: "N" | "S" = parsed.ns;
            if (ny < 0) {
                n_ns = n_ns === "N" ? "S" : "N";
                ny = -ny - 1;
            }
            result.push(generateRoomName(n_ew, nx, n_ns, ny));
        }
    }
    return result;
}
