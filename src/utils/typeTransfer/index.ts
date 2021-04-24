export function getBooleanFromString(str: string): boolean {
    let boolIfLoop = true;
    if (str === "true") {
        boolIfLoop = true;
    } else if (str === "false") {
        boolIfLoop = false;
    } else {
        console.log(`boolean 类型str输入值错误: ${str} ，采用默认值true`);
    }
    return boolIfLoop;
}
