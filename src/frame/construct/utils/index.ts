import {
    SpecifiedStructureNameList,
    StructureTypeFromSpecifiedStructureName,
    getStructureTypeBySpecifiedName,
    SpecifiedStructureInf
} from "../type";

/**
 * 使用该函数来获取非特定SpecifiedStructure的data
 *
 * @export
 * @template T
 * @param {string} roomName
 * @param {T} structureType
 * @param {SpecifiedStructureNameList<T>} structureSpecifiedName
 * @returns {(SpecifiedStructureInf<T, SpecifiedStructureNameList<T>> | undefined)}
 */
export function getStructureMemory<T extends BuildableStructureConstant>(
    roomName: string,
    structureType: T,
    structureSpecifiedName: SpecifiedStructureNameList<T>
): SpecifiedStructureInf<T, SpecifiedStructureNameList<T>> | undefined {
    // 下面这个类型我真改不动了
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (global.roomMemory?.[roomName]?.construction?.[structureType] as any)?.[
        structureSpecifiedName
    ] as SpecifiedStructureInf<T, SpecifiedStructureNameList<T>>;
}

export type RequireStructureData = {
    [structureType in SpecifiedStructureNameList<BuildableStructureConstant>]?: {
        filter?: (value: {
            id: Id<ConcreteStructure<StructureTypeFromSpecifiedStructureName<structureType>>>;
            pos: string;
        }) => boolean;
    };
};
type ReturnStructureList<T extends RequireStructureData> = {
    [P in keyof T]?: P extends SpecifiedStructureNameList<BuildableStructureConstant>
        ? { id: Id<ConcreteStructure<StructureTypeFromSpecifiedStructureName<P>>>; pos: string }[]
        : never;
};
/**
 * 获取某种建筑的id与pos列表。会自动缓存列表并返回缓存。
 * 如果获取的建筑属于自己，可以使用Game.structures来索引到对应建筑，这样更加节省cpu。
 * ```ts
 * const myStructure = Game.structures(structureId)
 * ```
 *
 * @export
 * @template T
 * @param {Creep} creep
 * @param {string} roomName
 * @param {T} requireStructureList
 * @returns {ReturnStructureList<T>}
 */
export function getStructureIdList<T extends RequireStructureData>(
    creep: Creep,
    roomName: string,
    requireStructureList: T
): ReturnStructureList<T> {
    if (!creep.globalMemory.structureCache) creep.globalMemory.structureCache = {};
    if (Game.time % 1500 === 0) {
        // 定时清空重置缓存
        delete creep.globalMemory.structureCache[roomName];
    }

    if (!creep.globalMemory.structureCache[roomName]) {
        const dataRes = Object.entries(requireStructureList).map(([structureType, data]) => {
            if (!data) throw new Error("how?");
            const structureMemory = getStructureMemory(
                roomName,
                getStructureTypeBySpecifiedName(
                    structureType as SpecifiedStructureNameList<BuildableStructureConstant>
                ),
                structureType as SpecifiedStructureNameList<BuildableStructureConstant>
            );
            if (!structureMemory) return;
            const structureDataList = structureMemory.structureList.filter(
                (data.filter as (value: { id: Id<ConcreteStructure<StructureConstant>>; pos: string }) => boolean) ??
                    (() => true)
            );
            return { [structureType]: structureDataList.map(value => value) };
        });
        const dataLast: ReturnStructureList<T> = _.assign({}, ...dataRes);

        creep.globalMemory.structureCache[roomName] = dataLast;
    }
    return creep.globalMemory.structureCache[roomName] as ReturnStructureList<T>;
}

declare global {
    interface GlobalCreepMemory {
        structureCache?: {
            [roomName: string]: {
                [name in SpecifiedStructureNameList<StructureConstant>]?: {
                    id: Id<ConcreteStructure<StructureTypeFromSpecifiedStructureName<name>>>;
                    pos: string;
                }[];
            };
        };
    }
}

/**
 * 传入具有id属性的对象列表，返回对应建筑列表
 *
 * @export
 * @template T
 * @param {{ id: Id<T> }[]} structureIdList
 * @returns {T[]}
 */
export function getMyStructuresById<T extends AnyStructure>(structureIdList: { id: Id<T> }[]): (T | null)[] {
    return structureIdList.map(({ id }) => Game.structures[id] as T);
}
