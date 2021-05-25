import { ObjectPosType } from "./type";

export class flagTools {
    public static getName(roomName: string, type: ObjectPosType, index: number): string {
        return `${roomName}${type}${index}`;
    }
}
