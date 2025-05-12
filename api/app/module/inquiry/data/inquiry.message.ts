import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {TypeUtil} from "../../../../framework/utils/type.util";
import {DB} from "../../../../framework/control/DB";

export default class InquiryMessage implements Bean {
    inquiry_id: number;
    message_id: number;
    sender_type: string;
    sender_id: number;
    summary: string;
    content: string;
    create_at: moment.Moment;

    constructor(data: any) {
        this.inquiry_id = data.inquiry_id
        this.message_id = data.message_id
        this.sender_type = data.sender_type;
        this.sender_id = data.sender_id
        this.summary = data.summary;
        this.content = data.content;
        this.create_at = data.create_at
    }


    static async list(request: RequestObject, inquiryId: number): Promise<Array<InquiryMessage>> {
        const data = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list-message', {inquiry_id: inquiryId}))
        return data.map(e => new InquiryMessage(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["message_id", this.message_id],
            ["sender_type", this.sender_type],
            ["sender_id", this.sender_id],
            ["summary", this.summary],
            ["content", this.content],
            ["create_at", this.create_at]
        ])
    }
    //
}