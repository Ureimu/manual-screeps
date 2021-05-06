import colorful, { Colors } from "utils/console/colorful";

const logColor: LogColor = {
    warning: "yellow",
    error: "red",
    log: "green"
};

export const consoleStyle = (name: string): ((content: string, level: LogLevel) => string) => {
    const chosenStyle = (content: string, level: LogLevel): string => {
        return `[${name}] ` + colorful(content, logColor[level]);
    };
    return chosenStyle;
};

export type LogLevel = "warning" | "error" | "log";

type LogColor = {
    [name in LogLevel]: Colors;
};
