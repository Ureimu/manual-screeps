import { createForm } from "utils/console";

export function callOnStart(): void {
    if (!Memory.routes) Memory.routes = { "": { routeDetailArray: [], ifLoop: true, ifShow: false } };
}

export class AiRoomSettingForm {
    public static chooseRoom(): string {
        const commitFunctionName = "AIRoomSetting.chooseRoom";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "roomName",
                    label: "输入房间",
                    type: "input"
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }

    public static modifySetting(): string {
        const commitFunctionName = "AIRoomSetting.modifySetting";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "roomName",
                    label: "输入房间",
                    type: "input"
                }
            ],
            {
                content: "提交",
                command: `(args) => ${commitFunctionName}(args)`,
                type: "button",
                name: "button" + String(Game.time) + commitFunctionName
            }
        );
    }
}
