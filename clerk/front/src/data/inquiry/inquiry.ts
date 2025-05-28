import InquiryAttachment from "@/data/inquiry/inquiry.attachment";
import InquiryMessage from "@/data/inquiry/inquiry.message";
import InquiryTag from "@/data/inquiry/inquiry.tag";

export default class Inquiry {
    id: number;
    title: string;
    department_id: number;
    message_id: number;
    resolved: boolean;
    create_at: number;
    update_at: number;

    attachments: Array<InquiryAttachment> | null
    messages: Array<InquiryMessage> | null
    tags: Array<InquiryTag> | null
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.department_id = data.department_id;
        this.message_id = data.message_id;
        this.resolved = data.resolved;
        this.create_at = data.create_at;
        this.update_at = data.update_at;

        this.attachments = null;
        this.messages = null;
        this.tags = null;
    }
}