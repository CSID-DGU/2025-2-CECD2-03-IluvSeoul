import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {TypeUtil} from "../../../../framework/utils/type.util";
import {DB} from "../../../../framework/control/DB";
import Inquiry from "./inquiry";

export default class InquiryAttachment implements Bean {
    id: number;
    inquiry_id: number;
    name: string;
    path: string;
    create_at: moment.Moment;

    constructor(data: any) {
        this.id = data.id
        this.inquiry_id = data.inquiry_id
        this.name = data.name;
        this.path = data.path;
        this.create_at = data.create_at
    }


    static async list(request: RequestObject, inquiryId: number): Promise<Array<InquiryAttachment>> {
        const data = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list-attachment', {inquiry_id: inquiryId}))
        return data.map(e => new InquiryAttachment(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name],
            ["path", this.path],
            ["create_at", this.create_at]
        ])
    }
    //
}