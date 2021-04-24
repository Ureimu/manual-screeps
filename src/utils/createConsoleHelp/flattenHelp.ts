import colorful from "utils/console/colorful";

export function createFlattenHelp(...modules: ModuleDescribe[]): string {
    return modules
        .map((describe): string => {
            return `${describe.name}   ${describe.describe}\n${describe.api
                .map(funcDescribe => {
                    return `${funcDescribe.functionName} ${colorful(funcDescribe.title, "yellow")} ${
                        funcDescribe.describe ? funcDescribe.describe : ""
                    }`;
                })
                .join("\n")}`;
        })
        .join("\n");
}
