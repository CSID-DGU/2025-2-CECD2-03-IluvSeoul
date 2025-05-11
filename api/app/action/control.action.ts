import Action, {Auth} from "../../framework/action/decorator/action.decorator";
import ActionMethod from "../../framework/action/decorator/actionMethod.decorator";
import RequestObject from "../../framework/object/request.object";
import Print from "../../framework/utils/print.util";


@Action({value: 'control', auth: Auth.unnecessary})
class GateAction {
    @ActionMethod({value: 'reload'})
    async info(request: RequestObject) {
        const type = request.getParameterString("type", null);
        switch (type) {
            default:
                request.error("invalid_parameter");
                return;
        }
        Print.json(request);
    }
}
export default GateAction;