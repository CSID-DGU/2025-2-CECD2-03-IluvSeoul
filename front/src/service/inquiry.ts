import Inquiry from "@/data/inquiry/inquiry";
import {TypeUtil} from "@/util/type.util";
import {WebUtil} from "@/util/web.util";
import InquiryAttachment from "@/data/inquiry/inquiry.attachment";
import InquiryMessage from "@/data/inquiry/inquiry.message";

// Inquiry 에 관한 axios 액션 정의
export namespace InquiryService {
    export async function list(): Promise<Array<Inquiry>> {
        return WebUtil.get('/inquiry/list')
            .then(res => TypeUtil.toArray(res.inquiry_list).map(e => new Inquiry(e)))
            .catch(error => {
                console.log(error)
                return []
            })
    }
    export async function detail(id: number): Promise<Inquiry> {
        return WebUtil.get('/inquiry/detail', {
            params: {
                id: id
            }
        })
            .then(res => {
                const inquiry = new Inquiry(res.inquiry);
                if (res.inquiry_attachment) {
                    inquiry.attachments = TypeUtil.toArray(res.inquiry_attachment).map(e => new InquiryAttachment(e))
                }
                if (res.inquiry_message) {
                    inquiry.messages = TypeUtil.toArray(res.inquiry_message).map(e => new InquiryMessage(e))
                }

                return inquiry;
            })
            .catch(error => null)
    }
}