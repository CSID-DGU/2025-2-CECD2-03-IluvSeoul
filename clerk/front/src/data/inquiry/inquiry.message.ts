export default class InquiryMessage {
    message_id: number;
    sender: any | null;
    sender_type: string;
    sender_id: number;
    summary: string;
    content: string;
    create_at: number;
    constructor(data: any) {
        this.message_id = data.message_id;
        this.sender = null;
        this.sender_type = data.sender_type;
        this.sender_id = data.sender_id;
        this.summary = data.summary;
        this.content = data.content;
        this.create_at = data.create_at;
    }
}