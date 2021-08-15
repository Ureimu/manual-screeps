/* eslint-disable no-underscore-dangle */

import { SourceMapConsumer } from "source-map";
const cache: { time: number } = { time: Game.time - 1 };
interface ErrorSegmentMemory {
    cache: ErrorCache;
    isFull: boolean;
    uncaughtErrorNum: number;
}
export interface ErrorCache {
    [time: number]: SingleErrorCache;
}
export interface SingleErrorCache {
    messageList: { short: string; full: string[] }[];
    tick: number;
}

declare global {
    interface Memory {
        errorCache: ErrorCache;
    }
}

export class ErrorMapper {
    // Cache consumer
    private static _consumer?: SourceMapConsumer;
    private static segmentId = 99;
    private static colorRedTag = {
        head: `<span style='color:#FF6666'>`,
        end: `</span>`
    };

    public static get consumer(): SourceMapConsumer {
        if (this._consumer == null) {
            this._consumer = new SourceMapConsumer(require("main.js.map"));
        }

        return this._consumer;
    }

    // Cache previously mapped traces to improve performance
    public static cache: { [key: string]: string[] } = {};

    /**
     * Generates a stack trace using a source map generate original symbol names.
     *
     * WARNING - EXTREMELY high CPU cost for first call after reset - >30 CPU! Use sparingly!
     * (Consecutive calls after a reset are more reasonable, ~0.1 CPU/ea)
     *
     * @param {Error | string} error The error or original stack trace
     * @returns {string} The source-mapped stack trace
     */
    public static sourceMappedStackTrace(error: Error | string): string[] {
        const stack: string = error instanceof Error ? (error.stack as string) : error;
        if (Object.prototype.hasOwnProperty.call(this.cache, stack)) {
            return this.cache[stack];
        }

        // eslint-disable-next-line no-useless-escape
        const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
        let match: RegExpExecArray | null;
        const outStack = [error.toString()];
        while ((match = re.exec(stack))) {
            // console.log(match.toString());
            if (match[2] === "main") {
                const pos = this.consumer.originalPositionFor({
                    column: parseInt(match[4], 10),
                    line: parseInt(match[3], 10)
                });
                if (pos.line != null) {
                    if (pos.name) {
                        // console.log(pos.name);
                        outStack.push(
                            `    ${_.escape(
                                `at ${pos.name} (${pos.source.split("../")[1]}:${pos.line}:${pos.column})`
                            )}`
                        );
                    } else {
                        if (match[1]) {
                            // no original source file name known - use file name from given trace
                            outStack.push(
                                `    ${_.escape(
                                    `at ${match[1]} (${pos.source.split("../")[1]}:${pos.line}:${pos.column})`
                                )}`
                            );
                        } else {
                            // no original source file name known or in given trace - omit name
                            outStack.push(
                                `    ${_.escape(`at ${pos.source.split("../")[1]}:${pos.line}:${pos.column}`)}`
                            );
                        }
                    }
                } else {
                    // no known position
                    break;
                }
            } else {
                // no more parsable lines
                break;
            }
        }

        this.cache[stack] = outStack;
        return outStack;
    }

    public static wrapLoop(loop: () => void): () => void {
        if (Memory.errorCache) {
            // 每次全局缓存更新时自动删除过时errorCache
            Object.keys(Memory.errorCache).forEach(time => {
                if (Number(time) < Game.time - 1) {
                    delete Memory.errorCache[Number(time)];
                }
            });
        }
        return () => {
            try {
                loop();
            } catch (e) {
                this.handleError(e);
            }
            this.transferCache();
        };
    }

    public static handleError(e: unknown): void {
        // console.log("got exception, requested by ErrorMapper");
        if (!Memory.errorCache) Memory.errorCache = {};
        if (e instanceof Error) {
            if ("sim" in Game.rooms) {
                const message = `Source maps don't work in the simulator - displaying original error`;
                console.log(`${this.colorRedTag.head}${message}<br>${_.escape(e.stack)}${this.colorRedTag.end}`);
            } else {
                const rawTraceMsg = this.sourceMappedStackTrace(e);
                const errorMessage = `${this.colorRedTag.head}${rawTraceMsg.join("\n")}${this.colorRedTag.end}`;
                console.log(errorMessage);
                if (Game.time !== cache.time) {
                    cache.time = Game.time;
                    RawMemory.setActiveSegments([this.segmentId]);
                    Memory.errorCache[Game.time] = {
                        messageList: [],
                        tick: Game.time
                    };
                }
                Memory.errorCache[Game.time].messageList.push({ short: e.toString(), full: rawTraceMsg });
            }
        } else {
            // can't handle it
            console.log("can't handle it. By ErrorMapper");
            throw e;
        }
    }

    private static transferCache(): void {
        const tick = Game.time - 1;
        if (!Memory.errorCache) Memory.errorCache = {};
        if (Memory.errorCache[tick]) {
            const segment = RawMemory.segments[this.segmentId];
            let errorMemory: ErrorSegmentMemory;
            if (segment) {
                errorMemory = JSON.parse(segment) as ErrorSegmentMemory;
                if (!errorMemory) errorMemory = { cache: {}, isFull: false, uncaughtErrorNum: 0 };
            } else {
                errorMemory = { cache: {}, isFull: false, uncaughtErrorNum: 0 };
            }

            errorMemory.cache[tick] = Memory.errorCache[tick];

            if (RawMemory.segments[this.segmentId].length < 9e4 && errorMemory.isFull) {
                errorMemory.isFull = false;
            }
            if (RawMemory.segments[this.segmentId].length > 9e4 && !errorMemory.isFull) {
                errorMemory.isFull = true;
            }
            if (errorMemory.isFull) {
                console.log("errorCache已满，请及时清除");
                errorMemory.uncaughtErrorNum++;
            } else {
                RawMemory.segments[this.segmentId] = JSON.stringify(errorMemory);
            }
            delete Memory.errorCache[tick];
        }
    }

    public static setErrorSegmentActive(): void {
        RawMemory.setActiveSegments([this.segmentId]);
    }

    public static getErrorSegmentMemory(): ErrorSegmentMemory {
        const segment = RawMemory.segments[this.segmentId];
        const errorMemory = JSON.parse(segment) as ErrorSegmentMemory;
        return errorMemory;
    }
}
