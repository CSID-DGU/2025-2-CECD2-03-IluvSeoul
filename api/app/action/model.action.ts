import Action, {Auth} from "../../framework/action/decorator/action.decorator";
import Action_base from "../../framework/action/action.base";
import ActionMethod from "../../framework/action/decorator/actionMethod.decorator";
import RequestObject from "../../framework/object/request.object";
import Print from "../../framework/utils/print.util";
import Node from "../../framework/action/data/node";
import {ModelLogic} from "../module/model/model.logic";

@Action({value: 'model', auth: Auth.unnecessary})
class ModelAction extends Action_base {
    @ActionMethod({value: 'list'})
    async list(request: RequestObject) {
        //
    }

    @ActionMethod({value: 'detail'})
    async detail(request: RequestObject) {
        const type = request.getParameterString("type", null);
        if (type === null) {
            request.error("invalid_parameter")
        }

        Print.json(request,
            Node.beanList(type, ModelLogic.get(type))
        );
    }
}


export default ModelAction;