export const bodyAbbreviation: { [name: string]: BodyPartConstant } = {
    m: "move",
    w: "work",
    c: "carry",
    a: "attack",
    r: "ranged_attack",
    h: "heal",
    i: "claim",
    t: "tough"
};

export const boostAbbreviation: { [bodyAbbreviationName: string]: { [boostType: string]: MineralBoostConstant } } = {
    m: {
        b1: "ZO",
        b2: "ZHO2",
        b3: "XZHO2"
    },
    w: {
        u1: "UO",
        u2: "UHO2",
        u3: "XUHO2",
        l1: "LH",
        l2: "LH2O",
        l3: "XLH2O",
        z1: "ZH",
        z2: "ZH2O",
        z3: "XZH2O",
        g1: "GH",
        g2: "GH2O",
        g3: "XGH2O"
    },
    c: {
        KH: "KH",
        KH2O: "KH2O",
        XKH2O: "XKH2O"
    },
    a: {
        b1: "UH",
        b2: "UH2O",
        b3: "XUH2O"
    },
    r: {
        b1: "KO",
        b2: "KHO2",
        b3: "XKHO2"
    },
    h: {
        b1: "LO",
        b2: "LHO2",
        b3: "XLHO2"
    },
    t: {
        b1: "GO",
        b2: "GHO2",
        b3: "XGHO2"
    }
};

// TODO 实现兼容boost。
/**
 * 由于除了work之外所有部件单个等级都只有一种化合物强化（claim没有），所以使用b1代表这些部件强化。
 * 对于work，使用u1,l1,z1,g1来表示特定强化。
 *
 * 强化信息跟在部件字符串后面，空一格。可以没有。
 * 由于强化身体部件不可选择特定单个部件进行强化，所以只需记录强化数量不需记录顺序。
 * 举例：
 * m5 m3b1 翻译：5个move，用t1化合物强化3个move。
 * m1w1*2 wu1 翻译：mwmw, 用u类t1化合物强化所有move。
 * 实现函数，接受字符串，返回creep部件boost所需化合物以及用量列表和boost所需能量列表。
 */

/**
 * creeps身体部件生成器。
 *
 * 示例：
 * bodyTools.compile("m5") // [ 'move', 'move', 'move', 'move', 'move' ]
 *
 * bodyTools.compile("m2c2") // [ 'move', 'move', 'carry', 'carry' ]
 *
 * bodyTools.compile("m1w1*2") // [ 'move', 'work', 'move', 'work' ]
 *
 * 更复杂的示例可见bodyTools.compile函数的注释。
 */

// {
//     m: 50,
//     w: 100,
//     c: 50,
//     a: 80,
//     r: 150,
//     h: 250,
//     i: 600,
//     t: 10
// };

export class bodyTools {
    private static regExp = /([mwcarhit])([0-9]+)/g;
    private static mulRegExp = /([*])([0-9]+)/g;
    private static checkRegExp = /^([mwcarhit*][0-9]+)*$/;

    // boost spec regex: <part?><count?><boostCode>
    // examples matched: m3b1, mb1 (means all m), wu1 (w part, boost u1), b1 (no part -> ignored)
    private static boostRegExp = /([mwcarht])([0-9]*)(b[1-3]|[ulzg][1-3])/g;

    /**
     * 解析 body 字符串后面的 boost 描述，返回需要的化合物用量以及相应能量消耗。
     *
     * 返回对象格式：
     * {
     *   byCompound: { [boostCompoundName: string]: number }, // 每种boostCompound需要的数量（按部件数量计）
     *   energy: { [boostCompoundName: string]: number } // 每种boostCompound需要的能量（总和）
     * }
     *
     * boost 语法示例（放在 body 字符串后，以空格分隔）：
     *  - "m5 m3b1"    => 对 3 个 move 应用 b1
     *  - "m1w1*2 wu1" => 对所有 w 应用 u1（本实现中会把缺省数量解析为部件总数）
     *
     */
    public static parseBoostInfo(body: string): {
        byCompound: { [boostCompoundName: string]: number };
        energy: { [boostCompoundName: string]: number };
    } {
        const result = {
            byCompound: {},
            energy: {}
        } as ReturnType<typeof bodyTools["parseBoostInfo"]>;

        if (!body) return result;

        const [bodyPartStr, boostStr] = bodyTools.splitBodyAndBoost(body);

        if (!boostStr) return result;

        // get total counts per part shortname from the body
        const flattenBody = this.flatten(bodyPartStr);
        const compiled = flattenBody.split(this.regExp);
        const totalPerPart: { [short: string]: number } = {};
        for (let i = 0; i < compiled.length; i += 3) {
            const short = compiled[i + 1];
            const num = Number(compiled[i + 2]) || 0;
            if (!short) continue;
            totalPerPart[short] = (totalPerPart[short] || 0) + num;
        }

        // iterate boost specs
        let m: RegExpExecArray | null;
        while ((m = this.boostRegExp.exec(boostStr)) !== null) {
            const partShort = m[1]; // e.g. 'm','w'
            const countStr = m[2]; // may be empty -> means "all"
            const boostCode = m[3]; // e.g. 'b1','u1'
            const boostCompoundName = boostAbbreviation[partShort][boostCode];

            const count = countStr ? Number(countStr) : totalPerPart[partShort] || 0;
            if (!count) continue;

            // byCompound (boostCode) aggregation
            result.byCompound[boostCompoundName] = (result.byCompound[boostCompoundName] || 0) + count;

            // energy
            result.energy[boostCompoundName] = (result.energy[boostCompoundName] || 0) + LAB_BOOST_ENERGY * count;
        }

        return result;
    }

    private static splitBodyAndBoost(body: string): [bodyStr: string, boostStr: string] {
        // split body and boost info by first space
        const idx = body.indexOf(" ");
        if (idx === -1) return [body, ""]; // no boost info

        const bodyPartStr = body.substring(0, idx);
        const boostStr = body.substring(idx + 1).trim();
        return [bodyPartStr, boostStr];
    }

    /**
     * 展平creepBody
     *
     * @static
     * @param {string} body
     * @returns {string}
     * @memberof bodyTools
     */
    private static flatten(body: string): string {
        if (!body) {
            console.log(body);
            return "";
        }

        const mulSplitResult = body.split(this.mulRegExp);

        if (mulSplitResult.length > 1) {
            const mulResult: string[] = [];
            for (let index = 0; index < mulSplitResult.length; index += 3) {
                const element = mulSplitResult[index];
                const mulCount = Number(mulSplitResult[index + 2]);
                if (mulCount) {
                    for (let index0 = 0; index0 < mulCount; index0++) {
                        mulResult.push(element);
                    }
                } else {
                    mulResult.push(element);
                }
            }
            return mulResult.join("");
        } else {
            return body;
        }
    }

    /**
     * 身体部件生成器。示例：
     *
     * * m5 = [ 'move', 'move', 'move', 'move', 'move' ]
     * * m2c2 = [ 'move', 'move', 'carry', 'carry' ]
     * * m1a1*4 =[
     * 'move', 'attack',
     * 'move', 'attack',
     * 'move', 'attack',
     * 'move', 'attack'
     *  ]
     * * m3r1h1t1*2 =[
     * 'move', 'move',
     * 'move', 'ranged_attack',
     * 'heal', 'tough',
     * 'move', 'move',
     * 'move', 'ranged_attack',
     * 'heal', 'tough'
     *  ]
     * *("\*"是"*")
     * * m1w2\*3m2w1\*2i3=[
     * 'move',  'work',  'work',
     * 'move',  'work',  'work',
     * 'move',  'work',  'work',
     * 'move',  'move',  'work',
     * 'move',  'move',  'work',
     * 'claim', 'claim', 'claim'
     *  ]
     *
     *
     * @export
     * @param {string} body
     * @returns {BodyPartConstant[]}
     */
    public static compile(body: string): BodyPartConstant[] {
        const [bodyPartStr, boostStr] = bodyTools.splitBodyAndBoost(body);

        const bodyResult: BodyPartConstant[] = [];
        const mulResultStr = this.flatten(bodyPartStr);

        const splitResult = mulResultStr.split(this.regExp);
        // console.log(splitResult);

        for (let index = 0; index < splitResult.length; index += 3) {
            const bodyShortName = splitResult[index + 1];
            const count = Number(splitResult[index + 2]);
            for (let index2 = 0; index2 < count; index2++) {
                bodyResult.push(bodyAbbreviation[bodyShortName]);
            }
        }
        // console.log(bodyResult);
        return bodyResult;
    }

    /**
     * 获得body的组件数量
     *
     * @static
     * @param {string} body
     * @param {BodyPartConstant[]} [bodypartNameList]
     * @returns {number}
     * @memberof bodyTools
     */
    public static getNum(body: string, bodypartNameList?: BodyPartConstant[]): number {
        const [bodyPartStr, boostStr] = bodyTools.splitBodyAndBoost(body);

        const flattenBody = this.flatten(bodyPartStr);
        const compiledElementList = flattenBody.split(this.regExp);
        let cost = 0;
        if (bodypartNameList) {
            for (let index0 = 0; index0 < compiledElementList.length; index0 += 3) {
                if (
                    bodypartNameList.findIndex(val => bodyAbbreviation[compiledElementList[index0 + 1]] === val) !== -1
                ) {
                    const num = Number(compiledElementList[index0 + 2]);
                    if (num) {
                        cost += num;
                    }
                }
            }
        } else {
            for (let index0 = 0; index0 < compiledElementList.length; index0 += 3) {
                const num = Number(compiledElementList[index0 + 2]);
                if (num) {
                    cost += num;
                }
            }
        }
        // console.log(compiledElementList, cost);
        return cost;
    }

    /**
     * 获得body的能量消耗
     *
     * @static
     * @param {string} body
     * @returns {number}
     * @memberof bodyTools
     */
    public static getEnergyCost(body: string): number {
        const [bodyPartStr, boostStr] = bodyTools.splitBodyAndBoost(body);

        const flattenBody = this.flatten(bodyPartStr);
        const compiledElementList = flattenBody.split(this.regExp);
        let cost = 0;
        for (let index0 = 0; index0 < compiledElementList.length; index0 += 3) {
            const num = Number(compiledElementList[index0 + 2]);
            if (num) {
                cost +=
                    num *
                    _.mapValues(bodyAbbreviation, function (value) {
                        return BODYPART_COST[value];
                    })[compiledElementList[index0 + 1]];
            }
        }
        // console.log(compiledElementList, cost);
        return cost;
    }

    /**
     * 检查传入字符串是否符合格式
     *
     * @static
     * @param {string} body
     * @returns {boolean}
     * @memberof bodyTools
     */
    public static check(body: string): boolean {
        const [bodyPartStr, boostStr] = bodyTools.splitBodyAndBoost(body);

        if (!body) return false;

        return this.checkRegExp.test(bodyPartStr) && (!boostStr || this.boostRegExp.test(boostStr));
    }
}
