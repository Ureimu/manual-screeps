import { createForm } from "utils/console";
import { logManager } from "utils/log4screeps";

const logger = logManager.createLogger("debug", "FlagMaintainer");

export class FlagMaintainerForm {
    public static refresh(): string {
        const commitFunctionName = "posMaintainerCommit.refresh";
        return createForm(
            commitFunctionName + String(Game.time),
            [
                {
                    name: "roomName",
                    label: "roomName",
                    type: "input",
                    placeholder: "roomName"
                },
                {
                    name: "typeList",
                    label: "typeList",
                    type: "input",
                    placeholder: "typeList"
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
