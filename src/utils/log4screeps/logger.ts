import _ from "lodash";
import colorful, { Colors } from "utils/console/colorful";
export type LogLevel = "debug" | "info" | "error" | "warning";
export const logLevelList = { debug: 0, info: 1, warning: 2, error: 3 };
const LogLevelToColor: { [name in LogLevel]: Colors } = {
    debug: "blue",
    info: "green",
    warning: "yellow",
    error: "red"
};
export class Logger {
    private levelNum: number;
    /**
     *Creates an instance of Logger.
     * @param {LogLevel} level
     * @param {string} label
     * @param {boolean} [logNow=true] 是否立即输出。
     * @memberof Logger
     */
    public constructor(public level: LogLevel, public label: string, public logNow = true) {
        this.levelNum = this.getLevelPriority(this.level);
    }
    public getLevelPriority = (level: LogLevel): number => {
        return logLevelList[level];
    };
    public storage: { m: string; t: number; i: number }[] = [];
    public log(...messages: string[]): void {
        this.push("info", messages);
    }
    public info(...messages: string[]): void {
        this.push("info", messages);
    }
    public error(...messages: string[]): void {
        this.push("error", messages);
    }
    public warn(...messages: string[]): void {
        this.push("warning", messages);
    }
    public debug(...messages: string[]): void {
        this.push("debug", messages);
    }
    public push(level: LogLevel, messages: string[]): void {
        if (this.getLevelPriority(level) < this.levelNum) return;
        const timeNow = Game.cpu.getUsed();
        const formattedTime = timeNow.toFixed(3);
        const gameTime = `${Game.time}`;
        const cpu = `${_.padLeft(formattedTime, 6, "0")}`;
        const logLevel = `${colorful(level, LogLevelToColor[level])}`;
        const label = `${this.label}`;
        const messageHead = `<${gameTime}:${cpu}>[${logLevel}][${label}] `;
        if (!this.logNow) {
            this.storage.push(...messages.map((m, i) => ({ m: messageHead + m, t: timeNow, i })));
        } else {
            console.log(messages.map(m => messageHead + m).join("\n"));
        }
    }
    public printFlush(): void {
        console.log(this.storage.map(i => i.m).join("\n"));
        this.storage = [];
    }
}
