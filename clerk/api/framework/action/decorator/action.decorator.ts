import 'reflect-metadata';

export enum Auth {
    require,
    unnecessary,
    inheritance
}
export enum Scope {
    all,
    onlyDev,
    inheritance
}
export interface ActionOptions {
    value: string;
    auth?: Auth;
    scope?: Scope;
    ignore503?: boolean;
}

export default function Action(options: ActionOptions) {
    return function (constructor: Function) {
        Reflect.defineMetadata('action', options, constructor);
    };
}

