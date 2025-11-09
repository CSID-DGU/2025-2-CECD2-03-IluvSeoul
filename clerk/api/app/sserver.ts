import Setting from "./setting";
import {DB} from "../framework/control/DB";
import AuthMain from "../framework/module/auth/auth.main";
import AuthManager from "./module/auth/auth.manager";
import {ModelLogic} from "./module/model/model.logic";

export default class SServer {
    static encoding: string = 'utf8';

    static async init() {
        await Setting.init();
        DB.init()
            .then(async () => {
                const auth: AuthManager = new AuthManager();
                AuthMain.init(auth);

                const session = await DB.getSession(DB.Type.main);
                await ModelLogic.reloadAll(session);
                await DB.closeSession(session);
            })
            .catch(error => {
                console.log(error);
            });
    }
}