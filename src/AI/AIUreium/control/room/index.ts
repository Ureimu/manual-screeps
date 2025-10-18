import { consoleStyle } from "frame/console/style";
import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";

const getButton = (funcName: string) => {
    return creators.button({
        command: `() => AIUreiumFC.${funcName}()`,
        content: `${funcName}`,
        type: "button",
        name: funcName
    });
};
const style = consoleStyle("AIRoomSetting");

export class AIRoomSetting {
    public static chooseRoom(args: { roomName: string }): string {
        const { roomName } = args;
        if (roomName === "") {
            return style(`房间名称不可以为空`, "error");
        }
        const helpMenu = [
            createFlattenHelp({
                name: `${roomName} room setting`,
                describe: "房间设置。",
                api: [
                    {
                        title: "修改设置",
                        describe: "修改设置",
                        functionName: getButton("AiRoomSettingForm.modifySetting"),
                        commandType: true
                    }
                ]
            })
        ].join("\n");

        return helpMenu;
    }

    public static modifySetting(args: {}): string {
        const {} = args;

        return style(`设置成功`, "log");
    }
}
