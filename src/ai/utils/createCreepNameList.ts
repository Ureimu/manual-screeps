export function createCreepNameList(creepNum: number, nameFunc: (index: number) => string): string[] {
    const creepNameList: string[] = [];
    for (let index = 0; index < creepNum; index++) {
        creepNameList.push(nameFunc(index));
    }
    return creepNameList;
}
