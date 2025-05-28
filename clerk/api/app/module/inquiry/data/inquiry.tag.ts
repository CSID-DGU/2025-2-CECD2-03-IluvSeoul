import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {TypeUtil} from "../../../../framework/utils/type.util";
import {DB} from "../../../../framework/control/DB";

export default class InquiryTag implements Bean {
    inquiry_id: number;
    tag_id: number;

    constructor(data: any) {
        this.inquiry_id = data.inquiry_id
        this.tag_id = data.tag_id
    }


    static async list(request: RequestObject, inquiryId: number): Promise<Array<InquiryTag>> {
        const data = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list-tag', {inquiry_id: inquiryId}))
        return data.map(e => new InquiryTag(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ['inquiry_id', this.inquiry_id],
            ['tag_id', this.tag_id]
        ])
    }
    //
}