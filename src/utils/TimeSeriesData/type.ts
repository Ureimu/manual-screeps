export type SingleTypedTreeDataNode<T> = T | SingleTypedTreeDataRecord<T>;

// 下面定义了一个树类型，需要借用接口的特性，参见https://stackoverflow.com/questions/46216048
// 除非你有更好的方案，否则不要去掉下面的eslint-disable-next-line
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SingleTypedTreeDataRecord<T> extends Record<string, SingleTypedTreeDataNode<T>> {}
export type SingleTypedTreeData<T> = Record<string, SingleTypedTreeDataNode<T>> & { timeStamp?: T; gameTime?: T };
export interface SingleData<T extends number[] | string | number> {
    data: T;
    type: string;
    depth: number;
    mutations?: T extends number[] | string ? [length: number, num: number][] : undefined;
}
