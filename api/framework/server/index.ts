import Setting from "../../app/setting";
import {IncomingMessage, RequestListener, ServerResponse} from "http";
import http from "http";
import logger from "../logger";
import fs from "fs";
import path from "path";
import {HttpType} from "../object/request.object";

class Server {

    server: http.Server

    constructor(logic: (req: IncomingMessage, res: ServerResponse) => void) {
        // RequestListener<Request, Response>
        this.server = http.createServer(logic);
    }

    public listen(port?: number, callback?: () => void) {
        this.server.listen(port, callback);
    }
}

export default Server;