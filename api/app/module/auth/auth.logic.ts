import RequestObject from "../../../framework/object/request.object";
import UserParam from "./data/user.param";

export namespace AuthLogic {
    export async function login(request: RequestObject, userParam: UserParam): Promise<void> {

        request.setData('user', null);
    }
}