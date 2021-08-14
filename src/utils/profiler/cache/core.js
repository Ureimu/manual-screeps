const functionBlackList = [
    'getUsed', // Let's avoid wrapping this... may lead to recursion issues and should be inexpensive.
    'constructor', // es6 class constructors need to be called with `new`
];

const commonProperties = ['length', 'name', 'arguments', 'caller', 'prototype'];

function wrapFunction(name, originalFunction) {
    if (originalFunction.profilerWrapped) { throw new AlreadyWrappedError(); }
    function wrappedFunction() {
        if (Profiler.isProfiling()) {
            const nameMatchesFilter = name === getFilter();
            const start = Game.cpu.getUsed();
            if (nameMatchesFilter) {
                depth++;
            }
            const curParent = parentFn;
            parentFn = name;
            let result;
            if (this && this.constructor === wrappedFunction) {
                // eslint-disable-next-line new-cap
                result = new originalFunction(...arguments);
            } else {
                result = originalFunction.apply(this, arguments);
            }
            parentFn = curParent;
            if (depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(name, end - start, parentFn);
            }
            if (nameMatchesFilter) {
                depth--;
            }
            return result;
        }

        if (this && this.constructor === wrappedFunction) {
            // eslint-disable-next-line new-cap
            return new originalFunction(...arguments);
        }
        return originalFunction.apply(this, arguments);
    }

    wrappedFunction.profilerWrapped = true;
    wrappedFunction.toString = () =>
        `// screeps-profiler wrapped function:\n${originalFunction.toString()}`;

    Object.getOwnPropertyNames(originalFunction).forEach(property => {
        if (!commonProperties.includes(property)) {
            wrappedFunction[property] = originalFunction[property];
        }
    });

    return wrappedFunction;
}

export function hookUpPrototypes(Profiler) {
    Profiler.prototypes.forEach(proto => {
        profileObjectFunctions(proto.val, proto.name);
    });
}

export function profileObjectFunctions(object, label) {
    if (object.prototype) {
        profileObjectFunctions(object.prototype, label);
    }
    const objectToWrap = object;

    Object.getOwnPropertyNames(objectToWrap).forEach(functionName => {
        const extendedLabel = `${label}.${functionName}`;

        const isBlackListed = functionBlackList.indexOf(functionName) !== -1;
        if (isBlackListed) {
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(objectToWrap, functionName);
        if (!descriptor) {
            return;
        }

        const hasAccessor = descriptor.get || descriptor.set;
        if (hasAccessor) {
            const configurable = descriptor.configurable;
            if (!configurable) {
                return;
            }

            const profileDescriptor = {};

            if (descriptor.get) {
                const extendedLabelGet = `${extendedLabel}:get`;
                profileDescriptor.get = profileFunction(descriptor.get, extendedLabelGet);
            }

            if (descriptor.set) {
                const extendedLabelSet = `${extendedLabel}:set`;
                profileDescriptor.set = profileFunction(descriptor.set, extendedLabelSet);
            }

            Object.defineProperty(objectToWrap, functionName, profileDescriptor);
            return;
        }

        const isFunction = typeof descriptor.value === 'function';
        if (!isFunction || !descriptor.writable) {
            return;
        }
        const originalFunction = objectToWrap[functionName];
        objectToWrap[functionName] = profileFunction(originalFunction, extendedLabel);
    });

    return objectToWrap;
}

export function profileObjectFunctionsDeep(object, label) {
    if (object.prototype) {
        profileObjectFunctions(object.prototype, label);
    }
    const objectToWrap = object;

    Object.getOwnPropertyNames(objectToWrap).forEach(functionName => {
        const extendedLabel = `${label}.${functionName}`;

        const isBlackListed = functionBlackList.indexOf(functionName) !== -1;
        if (isBlackListed) {
            return;
        }

        const descriptor = Object.getOwnPropertyDescriptor(objectToWrap, functionName);
        if (!descriptor) {
            return;
        }

        const hasAccessor = descriptor.get || descriptor.set;
        if (hasAccessor) {
            const configurable = descriptor.configurable;
            if (!configurable) {
                return;
            }

            const profileDescriptor = {};

            if (descriptor.get) {
                const extendedLabelGet = `${extendedLabel}:get`;
                profileDescriptor.get = profileFunction(descriptor.get, extendedLabelGet);
            }

            if (descriptor.set) {
                const extendedLabelSet = `${extendedLabel}:set`;
                profileDescriptor.set = profileFunction(descriptor.set, extendedLabelSet);
            }

            Object.defineProperty(objectToWrap, functionName, profileDescriptor);
            return;
        }

        const isFunction = typeof descriptor.value === 'function';
        if (!isFunction || !descriptor.writable) {
            if(typeof descriptor.value === "object"){
                objectToWrap[functionName]=profileObjectFunctionsDeep(objectToWrap[functionName],extendedLabel)
            }else{
                return;
            }
        }

        const originalFunction = objectToWrap[functionName];
        objectToWrap[functionName] = profileFunction(originalFunction, extendedLabel);
    });

    return objectToWrap;
}

export function profileFunction(fn, functionName) {
    const fnName = functionName || fn.name;
    if (!fnName) {
        console.log('Couldn\'t find a function name for - ', fn);
        console.log('Will not profile this function.');
        return fn;
    }

    return wrapFunction(fnName, fn);
}

let getInitMemoryUsed = function(){
    return void 0;
}
export const getInitMemoryUsed = getInitMemoryUsedProfileFunction(getInitMemoryUsed,"initMemory")

export function getInitMemoryUsedProfileFunction(fn, functionName) {
    const fnName = functionName || fn.name;
    if (!fnName) {
        console.log('Couldn\'t find a function name for - ', fn);
        console.log('Will not profile this function.');
        return fn;
    }

    return wrapGetInitMemoryUsedFunction(fnName, fn);
}

export function wrapGetInitMemoryUsedFunction(name, originalFunction) {
    if (originalFunction.profilerWrapped) { throw new AlreadyWrappedError(); }
    function wrappedFunction() {
        const start = Game.cpu.getUsed();// 把start移动到if上方，避免isProfiling提前调用memory导致获取不到memory初始化消耗
        if (Profiler.isProfiling()) {
            const nameMatchesFilter = name === getFilter();
            if (nameMatchesFilter) {
                depth++;
            }
            const curParent = parentFn;
            parentFn = name;
            let result;
            if (this && this.constructor === wrappedFunction) {
                // eslint-disable-next-line new-cap
                result = new originalFunction(...arguments);
            } else {
                result = originalFunction.apply(this, arguments);
            }
            parentFn = curParent;
            if (depth > 0 || !getFilter()) {
                const end = Game.cpu.getUsed();
                Profiler.record(name, end - start, parentFn);
            }
            if (nameMatchesFilter) {
                depth--;
            }
            return result;
        }

        if (this && this.constructor === wrappedFunction) {
            // eslint-disable-next-line new-cap
            return new originalFunction(...arguments);
        }
        return originalFunction.apply(this, arguments);
    }

    wrappedFunction.profilerWrapped = true;
    wrappedFunction.toString = () =>
        `// screeps-profiler wrapped function:\n${originalFunction.toString()}`;

    Object.getOwnPropertyNames(originalFunction).forEach(property => {
        if (!commonProperties.includes(property)) {
            wrappedFunction[property] = originalFunction[property];
        }
    });

    return wrappedFunction;
}
