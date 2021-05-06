import colorful from "utils/console/colorful";
import { ModuleDescribe } from "../help/types";

export function createFlattenHelp(...modules: ModuleDescribe[]): string {
    return modules
        .map((describe): string => {
            return `${_.pad(describe.name, 16)}${_.pad(describe.describe, 10)}\n${describe.api
                .map(funcDescribe => {
                    return `${_.pad(funcDescribe.functionName, 50)}\n${
                        funcDescribe.params
                            ? funcDescribe.params
                                  .map(desc => `${colorful(desc.name, "green")} ${desc.desc}`)
                                  .join("\n") + "\n"
                            : ""
                    }${colorful(funcDescribe.describe ? funcDescribe.describe : "", "blue")}`;
                })
                .join("\n")}`;
        })
        .join("\n");
}
