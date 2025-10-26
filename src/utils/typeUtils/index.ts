/** ADD YOUR OWN SELECTION OF PRIMITIVES **/
type Primitives =
    | boolean
    | number
    | bigint
    | string
    | symbol
    | void
    | null
    | undefined
    | Date
    | Buffer
    | Function
    | RegExp;

export type RecursivePartial<T> = T extends Primitives
    ? T /** RESOLVE PRIMITIVE TO ITSELF */
    : T extends Array<infer U>
    ? Array<RecursivePartial<U>> /** RESOLVE ARRAY */
    : T extends Map<infer K, infer V>
    ? Map<RecursivePartial<K>, RecursivePartial<V>> /** RESOLVE MAP */
    : T extends WeakMap<infer K, infer V>
    ? WeakMap<RecursivePartial<K>, RecursivePartial<V>> /** RESOLVE WEAK-MAP */
    : T extends Set<infer V>
    ? Set<RecursivePartial<V>> /** RESOLVE SET */
    : T extends WeakSet<infer V>
    ? WeakSet<RecursivePartial<V>> /** RESOLVE WEAK-SET */
    : T extends object
    ? {
          [K in keyof T]?: RecursivePartial<T[K]> /** RESOLVES OBJECT */;
      }
    : T; /** FALLBACK TO ITSELF IF NOT HANDLED */
