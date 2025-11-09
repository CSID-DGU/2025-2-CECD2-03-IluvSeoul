import RequestObject from "../../../framework/object/request.object";
import Inquiry from "./data/inquiry";
import InquiryTag from "./data/inquiry.tag";
import InquirySuggestDepartment from "./data/inquiry.suggest_department";
import axios from "axios";
import Logger from "../../../framework/logger";

export namespace InquiryLogic {
    const AI_URL = 'http://61.82.95.102:8001/seoul/'

    export async function list(request: RequestObject, tag: number, page: number): Promise<void> {
        request.setData("inquiry_list", await Inquiry.list(request, tag, page))
    }

    export async function create(request: RequestObject, user: string, phone: string, message: string): Promise<void> {
        const inquiry = new Inquiry({
            inquiry_user: user,
            inquiry_phone: phone,
            inquiry_message: message,
            limit_at: request.now.add(1, 'month'),
        })

        inquiry.id = await Inquiry.insert(request, inquiry);
        suggest(request, inquiry.id)

        request.setData("inquiry", inquiry)
    }

    export async function suggest(request: RequestObject, id: number): void {
        axios.get(AI_URL + 'inquiry/process', {
            params: {
                inquiry_id: id
            }
        }).then(res => {
            if (res.data.response !== 'success') {
                Logger.error(res.data.exception)
            }
        }).catch(error => {
            Logger.error(error)
        });
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