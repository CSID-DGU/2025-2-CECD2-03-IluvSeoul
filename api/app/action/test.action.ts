import RequestObject from "../../framework/object/request.object";
import Action, {Auth} from '../../framework/action/decorator/action.decorator';
import ActionMethod from '../../framework/action/decorator/actionMethod.decorator';
import Action_base from "../../framework/action/action.base";
import {DB} from "../../framework/control/DB";

@Action({value: 'test', auth: Auth.unnecessary})
class TestAction extends Action_base {
    @ActionMethod({value: ''})
    async page(request: RequestObject) {
        const r = await request.list(DB.Type.main, 'test', 'list', null);
        request.res.write(JSON.stringify(r));
        request.res.end();
    }

    @ActionMethod({value: 'some'})
    async some(request: RequestObject) {
        request.res.write('test');
        request.res.end();
    }
}


export default TestAction;