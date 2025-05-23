import RequestObject from "../../../../framework/object/request.object";

export default class UserParma {
    static get(request: RequestObject): UserParma {
        return new UserParma()
    }
}