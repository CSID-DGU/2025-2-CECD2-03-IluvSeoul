import { DB } from "../../../framework/control/DB";
import Category from "./data/category";
import RequestObject from "../../../framework/object/request.object";
import Inquiry from "./data/inquiry";
import InquiryAttachment from "./data/inquiry.attachment";
import InquiryMessage from "./data/inquiry.message";

export namespace InquiryLogic {
    export async function list(request: RequestObject): Promise<void> {
        request.setData("inquiry_list", await Inquiry.list(request))
    }

    export async function detail(request: RequestObject, id: number): Promise<void> {
        const messageList = await InquiryMessage.list(request, id)

        // TODO get sender info from messageList
        request.setData("inquiry", await Inquiry.select(request, id))
        request.setData("inquiry_attachment", await InquiryAttachment.list(request, id))
        request.setData("inquiry_message", messageList)
    }
}