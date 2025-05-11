import Setting from "./setting";
import {DB} from "../framework/control/DB";
import AuthMain from "../framework/module/auth/auth.main";
import AuthManager from "./module/auth/auth.manager";
import {InquiryLogic} from "./module/inquiry/inquiry.logic";

export default class SServer {
    static encoding: string = 'utf8';

    static async init() {
        await Setting.init();
        DB.init()
            .then(async () => {
                const auth: AuthManager = new AuthManager();
                AuthMain.init(auth);

                const session = await DB.getSession(DB.Type.main);
                await InquiryLogic.init(session);
            })
            .catch(error => {
                console.log(error);
            });
    }
}