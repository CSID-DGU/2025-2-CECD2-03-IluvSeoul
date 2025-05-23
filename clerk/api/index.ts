import Server from './framework/server';
import ActionControl from './framework/action/action.control';
import SServer from "./app/sserver";
import dotenv from 'dotenv';
import path from "path";
import {IncomingMessage, ServerResponse} from "http";

async function init() {
    // 환경 변수로부터 PORT와 SETTING을 읽고, 없으면 기본값 사용
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const setting = process.env.SETTING || 'dev';

    dotenv.config({
        path: path.resolve(process.cwd(), 'config', `${setting}.env`)
    })

    await SServer.init();

    await ActionControl.init();

    const server = new Server((req: IncomingMessage, res: ServerResponse) => {
        try {
            ActionControl.action(req, res);
        } catch (error) {
            console.log(error)
        }
    });

    server.listen(port, () => console.log(port + ' port!'))
}

init()
