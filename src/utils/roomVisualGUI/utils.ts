function getStringList(str: string): string[] {
    let j = -1;
    let m = str + "\n";
    const strList = [];
    while (m.includes("\n")) {
        j = m.indexOf("\n");
        strList.push(m.slice(0, j));
        m = m.slice(j + 1);
    }
    return strList;
}

/**
 * 打印多行文本。
 *
 * @export
 * @param {Text} layoutF
 * @returns {ElementMap<elementsConstant>[]}
 */
export function printMulText(layoutF: Text): ElementMap<elementsConstant>[] {
    const objList = [];
    const strList = getStringList(layoutF.content);
    let i = 0;
    for (const strX of strList) {
        objList.push({
            type: "Text" as elementsConstant,
            layout: { content: strX, x: layoutF.x, y: layoutF.y + i, align: layoutF.align }
        });
        i += 1;
    }
    return objList;
}
