import { ObjectPosType } from "./type";

export class FlagTools {
    public static getName(roomName: string, type: ObjectPosType, index: number): string {
        return `${roomName}${type}${index}`;
    }
}
