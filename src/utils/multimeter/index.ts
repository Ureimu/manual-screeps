declare global {
    interface Memory {
        watch: {
            expressions: { [name: string]: string };
            values: { [name: string]: string };
        };
    }

    namespace NodeJS {
        interface Global {
            multimeter: {
                expressions: { [name: string]: string };
                expressionFunctions: { [name: string]: Function };
            };
        }
    }
}

export function multimeterWatch() {
    if (typeof Memory.watch !== "object") {
        Memory.watch = {
            expressions: {},
            values: {}
        };
    }
    if (!global.multimeter) {
        global.multimeter = {
            expressions: {},
            expressionFunctions: {}
        };
    }
    _.each(Memory.watch.expressions, (expr, name) => {
        if (typeof expr !== "string" || !name) return;
        let result: string;
        try {
            if (
                !(name in global.multimeter.expressionFunctions) ||
                (global.multimeter.expressions[name] && expr !== global.multimeter.expressions[name])
            ) {
                global.multimeter.expressions[name] = expr;
                global.multimeter.expressionFunctions[name] = Function(`return (${expr});`);
            }
            result = global.multimeter.expressionFunctions[name]();
        } catch (ex: any) {
            result = "Error: " + ex.message;
        }
        if (name === "console") {
            if (typeof result !== "undefined") console.log(result);
        } else {
            Memory.watch.values[name] = typeof result !== "undefined" ? result.toString() : result;
        }
    });
}
