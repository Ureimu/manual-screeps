export function checkArray<T>(o: T[] | undefined): o is T[] {
    return typeof o?.length === "number";
}
