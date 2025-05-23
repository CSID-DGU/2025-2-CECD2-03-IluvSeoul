import 'reflect-metadata';
import {Auth, Scope} from "./action.decorator";

export interface ActionMethodOptions {
    value: string;
    auth?: Auth;
    scope?: Scope,
}

export default function ActionMethod(options: ActionMethodOptions) {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata('actionMethod', options, target, propertyKey);
    };
}