export default class InquiryTag {
    inquiry_id: number;
    tag_id: number;
    constructor(data: any) {
        this.inquiry_id = data.inquiry_id
        this.tag_id = data.tag_id
    }
}