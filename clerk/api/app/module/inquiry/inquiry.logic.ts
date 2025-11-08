import { DB } from "../../../framework/control/DB";
import Department from "./data/department";
import RequestObject from "../../../framework/object/request.object";
import Inquiry from "./data/inquiry";
import InquiryAttachment from "./data/inquiry.attachment";
import InquiryMessage from "./data/inquiry.message";
import InquiryTag from "./data/inquiry.tag";
import InquirySuggestDepartment from "./data/inquiry.suggest_department";

export namespace InquiryLogic {
    export async function list(request: RequestObject, tag: number, page: number): Promise<void> {
        request.setData("inquiry_list", await Inquiry.list(request, tag, page))
    }

    export async function detail(request: RequestObject, id: number): Promise<void> {
        // const messageList = await InquiryMessage.list(request, id)
        const inquiry = await Inquiry.select(request, id);

        // TODO get sender info from messageList
        request.setData("inquiry", inquiry)
        request.setData("inquiry_suggest_department", await InquirySuggestDepartment.list(request, id))
        // request.setData("inquiry_attachment", await InquiryAttachment.list(request, id))
        // request.setData("inquiry_message", messageList)
        request.setData("inquiry_tag", await InquiryTag.list(request, id))
    }

    export async function assign(request: RequestObject, id: number, department_id: number): Promise<void> {
        const inquiry = await Inquiry.select(request, id);
        if (inquiry === null) {
            request.error("invalid_id")
        }

        inquiry.department_id = department_id;
        await Inquiry.update(request, inquiry);

        request.setData("inquiry", inquiry)
        request.setData("inquiry_suggest_department", await InquirySuggestDepartment.list(request, id))
        // request.setData("inquiry_attachment", await InquiryAttachment.list(request, id))
        // request.setData("inquiry_message", messageList)
        request.setData("inquiry_tag", await InquiryTag.list(request, id))
    }
}