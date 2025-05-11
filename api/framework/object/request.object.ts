import ObjectBase from "./base";
import moment from 'moment-timezone'
import Setting from "../../app/setting";
import {URLSearchParams} from 'url';
import {IncomingMessage, ServerResponse} from "http";
import SeoulError from "../action/exception/seoul.error";

export namespace HttpType {
    export type Request = IncomingMessage;
    export type Response = ServerResponse & { req: IncomingMessage };
}

export default class RequestObject extends ObjectBase {
    readonly userId: number;
    req: HttpType.Request
    res: HttpType.Response
    now: moment.Moment;
    params: URLSearchParams
    data: Map<string, any>;
    body: string;

    constructor(req: HttpType.Request, res: HttpType.Response, params: URLSearchParams, body: string, userId: number) {
        super();
        this.req = req;
        this.res = res;
        this.now = moment().tz(Setting.timezone);
        this.params = params;
        this.body = body;
        this.data = new Map();
    }

    error(message: string): void {
        throw new SeoulError(message);
    }

    ///////////
    // params
    ///////////
    public getParameterInt(key: string, defaultValue: number): number {
        return parseInt(this.params.get(key)) || defaultValue;
    }

    public getParameterString(key: string, defaultValue: string): string {
        return this.params.get(key) || defaultValue;
    }

    public getParameterArray(key: string): string[] {
        return this.params.getAll(key);
    }

    public getParameterFloat(key: string, defaultValue: number): number {
        return parseFloat(this.params.get(key)) || defaultValue;
    }

    ///////////
    // data
    ///////////
    public setData(key: string, value: any): void {
        if (value === null) {
            return;
        }
        this.data.set(key, value);
    }

    public getData(key: string): any {
        if (!this.data.has(key)) {
            return null;
        }
        return this.data.get(key);
    }
}