type RoomPositionStr = string;

export interface Coord {
    x: number;
    y: number;
    roomName?: string;
}
export class PosStr {
    public static readonly regexp: RegExp = /^x(\d{1,2})y(\d{1,2})r([EW]\d{1,2}[NS]\d{1,2})$/;
    public static readonly rangeSettings: { xMin: number; yMin: number; xMax: number; yMax: number } = {
        xMin: 0,
        yMin: 0,
        xMax: 49,
        yMax: 49
    };

    public static regMatch(str: string): RegExpExecArray | null {
        const matched = this.regexp.exec(str);
        return matched;
    }

    public static getPosFromStr(str: RoomPositionStr): RoomPosition {
        const matched = this.regMatch(str);
        if (matched) {
            const pos = new RoomPosition(Number(matched[1]), Number(matched[2]), matched[3]);
            return pos;
        } else {
            throw new Error(`getPosFromStr失败！${str} 格式有误, ${JSON.stringify(matched)}`);
        }
    }

    public static setPosToStr(pos: RoomPosition): string {
        return `x${pos.x}y${pos.y}r${pos.roomName}`;
    }

    public static genePosStr(x: number, y: number, roomName: string): string {
        if (this.ifInSquare(x, y)) {
            return `x${x}y${y}r${roomName}`;
        } else {
            return "";
        }
    }

    public static ifInSquare(x: number, y: number): boolean {
        const { xMin, yMin, xMax, yMax } = this.rangeSettings;
        if (x < xMin || y < yMin || x > xMax || y > yMax) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 返回给定范围内的位置字符串集合，注意该函数不会检查位置的合理性。
     *
     * @export
     * @param {RoomPositionStr} str
     * @param {number} range
     * @returns
     */
    public static getPosStrInRange(str: RoomPositionStr, range: number): Set<string> {
        const matched = this.regMatch(str);
        const strSet = new Set<string>();
        if (matched) {
            const x = Number(matched[1]);
            const y = Number(matched[2]);
            for (let i = -range; i <= range; i++) {
                for (let j = -range; j <= range; j++) {
                    strSet.add(this.genePosStr(x + i, y + j, matched[3]));
                }
            }
        }
        strSet.delete("");
        return strSet;
    }

    public static getSquarePosStr(str: RoomPositionStr): Set<string> {
        const strSet = this.getPosStrInRange(str, 1);
        strSet.delete(str);
        return strSet;
    }

    public static getQuadPosStr(str: RoomPositionStr): Set<string> {
        const matched = this.regMatch(str);
        const strSet = new Set<string>();
        if (matched) {
            const x = Number(matched[1]);
            const y = Number(matched[2]);
            const sign = [-1, 1];
            for (const i of sign) {
                for (const j of sign) {
                    strSet.add(this.genePosStr(x + i, y + j, matched[3]));
                }
            }
        }
        strSet.delete("");
        return strSet;
    }

    public static getDiagPosStr(str: RoomPositionStr): Set<string> {
        const matched = this.regMatch(str);
        const strSet = new Set<string>();
        if (matched) {
            const x = Number(matched[1]);
            const y = Number(matched[2]);
            const sign = [-1, 1];
            for (const i of sign) {
                strSet.add(this.genePosStr(x + i, y, matched[3]));
                strSet.add(this.genePosStr(x, y + i, matched[3]));
            }
        }
        strSet.delete("");
        return strSet;
    }

    /**
     * 给定斜着的(也可以是横着或者竖着的，大概)构成简单连通图的位置集合，计算对应的🐍形布局。会为所有入度为1的端点设置1个出口，出口位置由该端点与另一点的连线方向决定。
     *
     * @param {Set<RoomPositionStr>} inputStrSet
     * @returns {Set<RoomPositionStr>}
     * @memberof RoomPositionToStr
     */
    public static get2SnakePosStr(inputStrSet: Set<RoomPositionStr>): [Set<RoomPositionStr>, Set<RoomPositionStr>] {
        if (inputStrSet.size <= 0) {
            return [new Set(), new Set()];
        }
        const roomName = this.parseCoord(Array.from(inputStrSet.keys()).pop() as string).roomName as string;
        let strSet = new Set<string>();
        const incomeList: { [name: string]: { income: number; connectedPosList: string[] } } = {};
        const squareSetList: [Set<string>, string][] = [];
        inputStrSet.forEach(str => {
            const squareSet = this.getSquarePosStr(str); // !这里有问题。
            strSet = this.mergeSet(squareSet, strSet);
            squareSetList.push([squareSet, str]);
        });
        inputStrSet.forEach(str => {
            incomeList[str] = {
                income: 0,
                connectedPosList: []
            };
            squareSetList.forEach(squarePair => {
                if (
                    squarePair[0].has(str) &&
                    squarePair[1] !== str &&
                    incomeList[str].connectedPosList.indexOf(str) === -1
                ) {
                    incomeList[str].income++;
                    incomeList[str].connectedPosList.push(squarePair[1]);
                }
            });
            strSet.delete(str);
        });
        console.log(JSON.stringify(incomeList));
        const exitPosStrSet = new Set<string>();
        for (const posStr in incomeList) {
            if (incomeList[posStr].income === 1) {
                const centerCoord = this.parseCoord(posStr);
                const edgeCoord = this.parseCoord(incomeList[posStr].connectedPosList[0]);
                const exitPosStr = this.genePosStr(
                    2 * centerCoord.x - edgeCoord.x,
                    2 * centerCoord.y - edgeCoord.y,
                    roomName
                );
                console.log(exitPosStr);
                strSet.delete(exitPosStr);
                exitPosStrSet.add(exitPosStr);
            }
        }
        strSet.delete("");
        return [strSet, exitPosStrSet];
    }

    public static parseCoord(str: RoomPositionStr): Coord {
        const matched = this.regMatch(str);
        const coord = {
            x: -1,
            y: -1,
            roomName: undefined as string | undefined
        };
        if (matched) {
            coord.x = Number(matched[1]);
            coord.y = Number(matched[2]);
            if (matched[3]) coord.roomName = matched[3];
        }
        return coord;
    }

    public static getRangeToPosStr(str1: RoomPositionStr, str2: RoomPositionStr): number {
        const matched1 = this.regMatch(str1);
        const matched2 = this.regMatch(str2);
        let range = -1;
        if (matched1 && matched2) {
            range = Math.max(
                Math.abs(Number(matched1[1]) - Number(matched2[1])),
                Math.abs(Number(matched1[2]) - Number(matched2[2]))
            );
        }
        return range;
    }

    public static reverseSet<T>(set: Set<T>): Set<T> {
        const mList: T[] = [];
        set.forEach(posStr => {
            mList.push(posStr);
        });
        set = new Set(mList.reverse());
        return set;
    }

    public static mergeSet<T>(a: Set<T>, b: Set<T>): Set<T> {
        const c = new Set<T>(a.keys());
        const d = new Set<T>(b.keys());
        c.forEach(vars => {
            d.add(vars);
        });
        return d;
    }

    public static copySet<T>(a: Set<T>): Set<T> {
        return new Set<T>(a.keys());
    }
}
