export namespace TypeUtil {
    export function toArray<T>(arg: T | T[]): T[] {
        return Array.isArray(arg) ? arg : [arg]
    }
}