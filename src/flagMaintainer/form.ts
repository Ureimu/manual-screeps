import { createForm } from "utils/console";

export class posMaintainerForm {
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
