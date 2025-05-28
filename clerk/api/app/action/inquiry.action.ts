import Action, {Auth} from "../../framework/action/decorator/action.decorator";
import Action_base from "../../framework/action/action.base";
import ActionMethod from "../../framework/action/decorator/actionMethod.decorator";
import RequestObject from "../../framework/object/request.object";
import {InquiryLogic} from "../module/inquiry/inquiry.logic";
import Print from "../../framework/utils/print.util";
import Node from "../../framework/action/data/node";

@Action({value: 'inquiry', auth: Auth.unnecessary})
class InquiryAction extends Action_base {
    @ActionMethod({value: 'list'})
    async list(request: RequestObject) {
        const tag = request.getParameterInt("tag", 0);
        const page = request.getParameterInt("page", 0);
        await InquiryLogic.list(request, tag, page);
        Print.json(request, Node.beanList("inquiry_list", request.getData("inquiry_list")));
    }

    @ActionMethod({value: 'detail'})
    async detail(request: RequestObject) {
        const id = request.getParameterInt("id", 0);
        if (id === 0) {
            request.error("invalid_parameter")
        }

        await InquiryLogic.detail(request, id);

        Print.json(request,
            Node.bean("inquiry", request.getData("inquiry")),
            Node.beanList("inquiry_attachment", request.getData("inquiry_attachment")),
            Node.beanList("inquiry_message", request.getData("inquiry_message")),
            Node.beanList("inquiry_tag", request.getData("inquiry_tag"))
        );
    }
}


export default InquiryAction;