import Inquiry from "@/data/inquiry/inquiry";
import {TypeUtil} from "@/util/type.util";
import {WebUtil} from "@/util/web.util";
import InquiryAttachment from "@/data/inquiry/inquiry.attachment";
import InquiryMessage from "@/data/inquiry/inquiry.message";

// Inquiry 에 관한 axios 액션 정의
export default {
    async list(): Promise<Array<Inquiry>> {
        const res = await WebUtil.get('/inquiry/list')
        if (res === null) {
            return [];
        }
        return TypeUtil.toArray(res.inquiry_list).map(e => new Inquiry(e));
    },
    async detail(id: number): Promise<Inquiry> {
        const res = await WebUtil.get('/inquiry/detail', {
            params: {
                id: id
            }
        })
        const inquiry = new Inquiry(res.inquiry);
        inquiry.attachments = TypeUtil.toArray(res.inquiry_attachment).map(e => new InquiryAttachment(e))
        inquiry.messages = TypeUtil.toArray(res.inquiry_message).map(e => new InquiryMessage(e))

        return inquiry;
    }
}