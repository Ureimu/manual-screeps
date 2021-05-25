import { maintainPos } from "./maintainer";
import { consoleStyle } from "console/style";
import { ObjectPosType } from "flagMaintainer/type";

const style = consoleStyle("posMaintainer");

export class FlagMaintainer {
    public static refresh(args: { roomName: string; typeList: ReturnType<typeof FlagMaintainer.getTypeList> }): string {
        const { roomName, typeList } = args;
        if (roomName === "") {
            return style(`房间名称不可以为空`, "error");
        }
        if (!Game.rooms[roomName]) return style(`需要 ${roomName} 的视野`, "error");
        maintainPos(Game.rooms[roomName], typeList.split(",") as ObjectPosType[]);
        return style(`刷新房间 ${roomName} flag完成`, "log");
    }

    /**
     * 给refresh传参typeList时请务必使用该函数以获得完全的代码补全提示
     *
     * @param {ObjectPosType[]} typeList
     * @returns {string}
     * @memberof posMaintainer
     */
    public static getTypeList(typeList: ObjectPosType[]): string {
        return typeList.join(",");
    }
}
