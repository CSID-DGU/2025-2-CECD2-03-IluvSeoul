export default class InquiryAttachment {
    id: number;
    inquiry_id: number;
    name: string;
    path: string;
    create_at: number;
    constructor(data: any) {
        this.id = data.id;
        this.inquiry_id = data.inquiry_id;
        this.name = data.name;
        this.path = data.path;
        this.create_at = data.create_at;
    }
}