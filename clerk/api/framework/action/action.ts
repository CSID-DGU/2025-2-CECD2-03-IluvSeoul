import {ActionOptions, Auth, Scope} from "./decorator/action.decorator";
import {ActionMethodOptions} from "./decorator/actionMethod.decorator";
import RequestObject from "../object/request.object";
import Setting from "../../app/setting";
import SeoulError from "./exception/seoul.error";
import {IncomingMessage, ServerResponse} from "http";
import {URLSearchParams} from "url";

export default class Action {
    action: any;
    method: Function;
    actionMeta: ActionOptions;
    methodMeta: ActionMethodOptions;

    auth: boolean;
    dev: boolean;
    ignore503: boolean;

    constructor(action: any, method: Function, actionMeta: ActionOptions, methodMeta: ActionMethodOptions) {
        this.action = action;
        this.method = method;
        this.actionMeta = actionMeta;
        this.methodMeta = methodMeta;

        // require auth
        this.auth = actionMeta.auth === null ? actionMeta.auth === Auth.require : false;
        switch (methodMeta.auth) {
            case Auth.require:
                this.auth = true;
                break;
            case Auth.unnecessary:
                this.auth = false;
                break;
            default:
                this.auth = actionMeta.auth === Auth.inheritance;
        }

        // dev?
        this.dev = actionMeta.scope === null ? actionMeta.scope === Scope.onlyDev : false;
        switch (methodMeta.scope) {
            case Scope.all:
                this.dev = false;
                break;
            case Scope.onlyDev:
                this.dev = true;
                break;
            default:
                this.dev = actionMeta.scope === Scope.inheritance;
        }

        // ignore 503
        this.ignore503 = actionMeta.ignore503 === null ? false : actionMeta.ignore503;
    }

    public async process(req: IncomingMessage, res: ServerResponse, params: URLSearchParams, body: string) {
        if (this.auth) {
            // TODO auth
        }
        if (Setting.isLive && this.dev) {
            // TODO log
            throw new SeoulError('dev_only');
        }

        // TODO Auth require
        const request = new RequestObject(req, res, params, body, -1);

        try {
            await this.method.apply(this, [request]);
            await request.commitAll();
        } catch (error) {
            if (error instanceof SeoulError) {
                console.log('request_error', error.stack);
            } else {
                console.log(error)
            }
            // TODO db rollback
            await request.rollbackAll();

            request.res.statusCode = 500;
            request.res.write('error');
            request.res.end();
        } finally {
        }
    }
};