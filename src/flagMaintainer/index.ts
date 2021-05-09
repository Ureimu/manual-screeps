import { createForm } from "utils/console";

export class posMaintainer {
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

declare global {
    interface RoomMemory {
        objectNum: {
            [T in ObjectPosType]?: ObjectPosDetail<T>;
        };
    }
}

export type ConstructionSiteConstant = `${BuildableStructureConstant}ConstructionSite`;

export type ObjectPosType = StructureConstant | "source" | "mineral" | ConstructionSiteConstant;

export interface ObjectPosDetail<T> {
    num: number;
    type: T;
}
