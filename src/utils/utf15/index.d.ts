// Type definitions for screeps-utf15 v1.0.1 by screepers
// Project: screeps-utf15
// Definitions by: Ureimu <https://github.com/Ureimu>

interface config<T extends boolean, U extends number[] | number, M extends boolean> {
    /**
     * 是否传入数组保存，true传入数组，false传入数字
     *
     * @type {boolean}
     * @memberof config
     */
    array: T;
    /**
     * 存储位深度，可以为一个数组或一个数字
     *
     * @type {(number[] | number)}
     * @memberof config
     */
    depth: U;
    /**
     * 是否保存元数据到数组，方便将来使用decode
     *
     * @type {boolean}
     * @memberof config
     */
    meta: M;
}
type arrayType<T extends boolean> = T extends true ? number[] : number;
declare class UTF15<T extends boolean, U extends number[] | number, M extends boolean> {
    public MAX_DEPTH: number;
    public meta: M extends true ? 1 : 0;
    public array: T extends true ? 1 : 0;
    public depth: U;
    /**
     *Creates an instance of UTF15.
     * @param {config} cfg
     * @memberof UTF15
     */
    public constructor(cfg: config<T, U, M>);
    /**
     *
     *
     * @param {*} arg single value or array of values to be encoded
     * @memberof UTF15
     */
    public encode(arg: arrayType<T>): string;
    /**
     *
     *
     * @param {string} str string to be decoded
     * @param {{ length: number }} [lengthOut] output, read length will be saved as "length_out.length" (optional)
     * @memberof UTF15
     */
    public decode(str: string, lengthOut?: { length: number }): arrayType<T>;
}
export = UTF15;
