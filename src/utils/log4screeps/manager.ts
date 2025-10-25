import { Logger, LogLevel } from "./logger";

export class LogManager {
    public loggerList: Logger[] = [];
    public constructor() {
        return;
    }
    public createLogger(level: LogLevel, label: string): Logger {
        const logger = new Logger(level, label);
        this.loggerList.push(logger);
        return logger;
    }
    public printFlush(): void {
        const sortedMessageList = this.loggerList
            .flatMap(i => i.storage)
            .sort((a, b) => {
                if (a.t !== b.t) return a.t - b.t;
                return a.i - b.i;
            })
            .map(i => i.m);
        console.log(sortedMessageList.join("\n"));
    }
}
