export function customFunction(conditionFunction: () => boolean, returnPair = [1, 0]): () => number {
    return () => {
        if (conditionFunction()) {
            return returnPair[0];
        } else {
            return returnPair[1];
        }
    };
}

const condition = {
    isFull: (anyStorable: { store: Store<ResourceConstant, false> }): (() => boolean) => {
        return () => anyStorable.store.getFreeCapacity() === 0;
    },
    isNotFull: (anyStorable: { store: Store<ResourceConstant, false> }): (() => boolean) => {
        return () => anyStorable.store.getFreeCapacity() !== 0;
    },
    isEmpty: (anyStorable: { store: Store<ResourceConstant, false> }): (() => boolean) => {
        return () => anyStorable.store.getUsedCapacity() === 0;
    },
    isNotEmpty: (anyStorable: { store: Store<ResourceConstant, false> }): (() => boolean) => {
        return () => anyStorable.store.getUsedCapacity() !== 0;
    }
};

export default condition;
