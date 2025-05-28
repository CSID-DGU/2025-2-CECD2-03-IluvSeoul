import Inquiry from "@/data/inquiry/inquiry";
import {TypeUtil} from "@/util/type.util";
import {WebUtil} from "@/util/web.util";
import InquiryAttachment from "@/data/inquiry/inquiry.attachment";
import InquiryMessage from "@/data/inquiry/inquiry.message";
import InquiryTag from "@/data/inquiry/inquiry.tag";

// Inquiry 에 관한 axios 액션 정의
export namespace InquiryService {
    export async function list(): Promise<Array<Inquiry>> {
        const res = await WebUtil.get('/inquiry/list')
        if (res === null) {
            return [];
        }
        return TypeUtil.toArray(res.inquiry_list).map(e => new Inquiry(e));
    }
    export async function detail(id: number): Promise<Inquiry> {
        const res = await WebUtil.get('/inquiry/detail', {
            params: {
                id: id
            }
        })
        const inquiry = new Inquiry(res.inquiry);
        if (res.inquiry_attachment) {
            inquiry.attachments = TypeUtil.toArray(res.inquiry_attachment).map(e => new InquiryAttachment(e))
        }
        if (res.inquiry_message) {
            inquiry.messages = TypeUtil.toArray(res.inquiry_message).map(e => new InquiryMessage(e))
        }
        if (res.inquiry_tag) {
            inquiry.tags = TypeUtil.toArray(res.inquiry_tag).map(e => new InquiryTag(e))
        }

        console.log(inquiry)
        return inquiry;
    }
}