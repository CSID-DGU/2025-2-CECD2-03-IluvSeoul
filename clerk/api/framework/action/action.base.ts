export default class ActionBase {
    path: string
    action: Function

    constructor(path: string, action: Function) {
        this.path = path;
        this.action = action;
    }

    getFunction(name: string): Function | undefined {
        if (typeof (this as any)[name] === 'function') {
            return (this as any)[name];
        } else {
            return undefined;
        }
    }

    getMethodNames(): string[] {
        const propertyNames = Reflect.ownKeys(Object.getPrototypeOf(this)) as string[];
        return propertyNames.filter(
            (name) => typeof (this as any)[name] === 'function' && name !== 'constructor'
        );
    }
}
