export default class InquiryMessage {
    message_id: number;
    sender: any | null;
    summary: string;
    content: string;
    create_at: number;
    constructor(data: any) {
        this.message_id = data.message_id;
        this.sender = null;
        this.summary = data.summary;
        this.content = data.content;
        this.create_at = data.create_at;
    }
}