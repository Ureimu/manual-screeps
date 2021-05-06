export function createFlagList(objectList: { pos: RoomPosition }[], nameFunc: (index: number) => string): string[] {
    const objectFlagList: string[] = [];
    for (let index = 0; index < objectList.length; index++) {
        const object = objectList[index];
        objectFlagList.push(nameFunc(index));
        object.pos.createFlag(objectFlagList[index]);
    }
    return objectFlagList;
}
