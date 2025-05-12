import RequestObject from '../object/request.object';
import * as glob from 'glob';
import * as path from 'path';
import 'reflect-metadata';
import Action from "./action";
import {ActionOptions} from "./decorator/action.decorator";
import {ActionMethodOptions} from "./decorator/actionMethod.decorator";
import GameError from "./exception/seoul.error";
import Logger from "../logger";
import {IncomingMessage, ServerResponse} from "http";
import {URL} from "url";
import * as querystring from "querystring";

class ActionControl {
    static basePath: string = "/front/";
    static __actionMap: Map<string, Action> = new Map();

    static async loadClasses(folder: string) {
        const files = glob.sync(`${folder}/**/*.{js,ts}`);
        const instances: any[] = [];

        for (const file of files) {
            const filePath = path.resolve(file);

            // Dynamically import the module
            const module = await import(filePath);

            // Find all exported classes in the module
            for (const exportName in module) {
                const exportedItem = module[exportName];

                // Check if the exported item is a class
                if (typeof exportedItem === 'function' && /^class\s/.test(exportedItem.toString())) {
                    // Create an instance of the class
                    const instance = new exportedItem();
                    instances.push(instance);
                    const classMetaData = Reflect.getMetadata('action', exportedItem) as ActionOptions;

                    // Get all methods of the class instance
                    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
                        .filter((name) => typeof instance[name] === 'function' && name !== 'constructor');

                    for (const method of methods) {
                        // Retrieve method metadata
                        const methodMeta = Reflect.getMetadata('actionMethod', instance, method) as ActionMethodOptions;
                        const page = ActionControl.basePath + classMetaData.value + (methodMeta.value.length > 0 ? '/' + methodMeta.value : '');

                        const actionData = new Action(instance, instance[method] as Function, classMetaData, methodMeta);
                        ActionControl.__actionMap.set(page, actionData)
                    }
                }
            }
        }

        return instances;
    }

    public static async init() {
        await ActionControl.loadClasses(path.resolve(__dirname, '../../app/action'))
    }

    public static async action(req: IncomingMessage, res: ServerResponse) {
        // 요청의 프로토콜(http 또는 https) 추출
        const protocol = req.headers[':scheme'] || 'http'; // :scheme 헤더에서 가져옴, 없으면 기본은 http

        // 요청의 호스트 정보 추출
        const host = req.headers[':authority']; // :authority 헤더에서 호스트 정보 추출

        // URL 객체 생성
        const urlObj = new URL(req.url, `${protocol}://${host}`);

        // 경로 (주소)
        const path = urlObj.pathname;

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, Access-Token, Uid');
        res.setHeader('Access-Control-Expose-Headers', 'Origin, Content-Type, Accept, Authorization, Access-Token, Uid');

        req.on('end', async () => {
            const contentType = req.headers['content-type'];

            // 쿼리 파라미터
            const queryParams = req.method !== 'POST' ? urlObj.searchParams :
                contentType === 'application/x-www-form-urlencoded' ? new URLSearchParams(body) : null;

            if (!ActionControl.__actionMap.has(path)) {
                res.writeHead(404);
                res.end('not_found');
                return;
            }

            const action = ActionControl.__actionMap.get(path);
            await action.process(req, res, queryParams, body);
        })
    }
}

export default ActionControl;