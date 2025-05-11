import Action from "../../framework/action/decorator/action.decorator";
import ActionMethod from "../../framework/action/decorator/actionMethod.decorator";
import RequestObject from "../../framework/object/request.object";
import Print from "../../framework/utils/print.util";
import Node from "../../framework/action/data/node";
import {AuthLogic} from "../module/auth/auth.logic";
import UserParam from "../module/auth/data/user.param";

@Action({value: 'auth'})
class AuthAction {
    @ActionMethod({value: 'login'})
    async login(request: RequestObject) {
        const userParam = UserParam.get(request);
        await AuthLogic.login(request, userParam);
        Print.json(request, Node.bean('user', request.getData('user')));
    }
}

export default AuthAction;