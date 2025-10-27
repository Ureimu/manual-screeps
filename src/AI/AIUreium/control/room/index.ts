import { consoleStyle } from "frame/console/style";
import { creators } from "utils/console/form";
import { createFlattenHelp } from "utils/console/flattenHelp";
import { getRoomControlData } from "..";
import { logManager } from "utils/log4screeps";

const getButton = (funcName: string) => {
    return creators.button({
        command: `() => AIUreiumFC.${funcName}()`,
        content: `${funcName}`,
        type: "button",
        name: funcName
    });
};
const style = consoleStyle("AIRoomSetting");
const logger = logManager.createLogger("debug", "RoutePlan");
export class AIRoomSetting {
    public static chooseRoom(args: { roomName: string }): void {
        const { roomName } = args;
        if (roomName === "") {
            logger.error(`房间名称不可以为空`);
            return;
        }
        if (!(roomName in Game.rooms)) {
            logger.error(`没有该房间的视野`);
            return;
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

        const settings = getRoomControlData(roomName);
        logger.log(`${roomName} setting:\n` + JSON.stringify(settings, null, 4));
    }

    public static modifySetting(args: {}): string {
        const {} = args;

        return style(`设置成功`, "log");
    }
}
