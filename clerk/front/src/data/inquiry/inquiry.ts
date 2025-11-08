import InquiryTag from "@/data/inquiry/inquiry.tag";
import InquirySuggestDepartment from "@/data/inquiry/inquiry.suggest_department";
import {TypeUtil} from "@/util/type.util";

export default class Inquiry {
    id: number;
    title: string;
    department_id: number;
    inquiry_user: string;
    inquiry_phone: string;
    inquiry_message: string;
    resolved: boolean;
    create_at: number;
    limit_at: number;
    update_at: number;

    suggest_departments: Array<InquirySuggestDepartment> | null
    tags: Array<InquiryTag> | null

    // attachments: Array<InquiryAttachment> | null
    // messages: Array<InquiryMessage> | null

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.department_id = data.department_id;
        this.inquiry_user = data.inquiry_user;
        this.inquiry_phone = data.inquiry_phone;
        this.inquiry_message = data.inquiry_message;
        this.resolved = data.resolved;
        this.create_at = data.create_at;
        this.limit_at = data.limit_at;
        this.update_at = data.update_at;
        
        this.suggest_departments = null;
        this.tags = null;
    }

    Init(res: any): Inquiry {
        // if (res.inquiry_attachment) {
        //     inquiry.attachments = TypeUtil.toArray(res.inquiry_attachment).map(e => new InquiryAttachment(e))
        // }
        // if (res.inquiry_message) {
        //     inquiry.messages = TypeUtil.toArray(res.inquiry_message).map(e => new InquiryMessage(e))
        // }
        if (res.inquiry_suggest_department) {
            this.suggest_departments = TypeUtil.toArray(res.inquiry_suggest_department).map(e => new InquirySuggestDepartment(e))
        }
        if (res.inquiry_tag) {
            this.tags = TypeUtil.toArray(res.inquiry_tag).map(e => new InquiryTag(e))
        }
        return this;
    }
}