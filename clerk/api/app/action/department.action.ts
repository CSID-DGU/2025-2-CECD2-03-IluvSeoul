import Action, {Auth} from "../../framework/action/decorator/action.decorator";
import ActionMethod from "../../framework/action/decorator/actionMethod.decorator";
import RequestObject from "../../framework/object/request.object";
import Print from "../../framework/utils/print.util";
import {DepartmentLogic} from "../module/department/department.logic";
import Node from "../../framework/action/data/node";

@Action({value: 'department', auth: Auth.unnecessary})
class DepartmentAction {
    @ActionMethod({value: 'create'})
    async create(request: RequestObject) {
        const name = request.getParameterString("name", null);
        if (name === null) {
            request.error("invalid_parameter");
            return;
        }

        await DepartmentLogic.create(request, name);

        Print.json(request, Node.bean('department', request.getData("department")));
    }

    @ActionMethod({value: 'delete'})
    async delete(request: RequestObject) {
        const id = request.getParameterInt("id", 0);
        if (id === 0) {
            request.error("invalid_parameter");
            return;
        }

        await DepartmentLogic.del(request, id);

        Print.json(request);
    }

    @ActionMethod({value: 'tag'})
    async tag(request: RequestObject) {
        const department_id = request.getParameterInt("department_id", 0);
        const tag_id = request.getParameterInt("tag_id", 0);
        const is_add = request.getParameterInt("is_add", 0) === 1;
        if (department_id === 0 || tag_id === 0) {
            request.error("invalid_parameter");
            return;
        }

        await DepartmentLogic.tag(request, department_id, tag_id, is_add);

        Print.json(request);
    }
}

export default DepartmentAction;