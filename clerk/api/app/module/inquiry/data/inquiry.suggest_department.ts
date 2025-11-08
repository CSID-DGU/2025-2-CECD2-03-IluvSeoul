import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class InquirySuggestDepartment implements Bean {
    inquiry_id: number;
    suggest_department_id: number;

    constructor(data: any) {
        this.inquiry_id = data.inquiry_id;
        this.suggest_department_id = data.suggest_department_id;
    }

    static async list(request: RequestObject, inquiry_id: number) {
        const row = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list-suggest_department', {
            inquiry_id
        }));
        return row.map(e => new InquirySuggestDepartment(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ['inquiry_id', this.inquiry_id],
            ['suggest_department_id', this.suggest_department_id],
        ]);
    }
}
