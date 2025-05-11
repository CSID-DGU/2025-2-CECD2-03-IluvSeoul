import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";
import {TimeUtil} from "../../../../framework/utils/time.util";

export default class Inquiry implements Bean {
    id: number;
    title: string;
    category_id: number;
    message_id: number;
    resolved: number;
    create_at: moment.Moment;
    update_at: moment.Moment;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.category_id = data.category_id;
        this.message_id = data.message_id;
        this.resolved = data.resolved;
        this.create_at = moment(data.create_at);
        this.update_at = moment(data.update_at);
    }

    static async select(request: RequestObject, id: number): Promise<Inquiry> {
        const row = await request.select(DB.Type.main, 'inquiry', 'select', {id: id});
        if (row === null) {
            return null;
        }
        return new Inquiry(row);
    }

    static async list(request: RequestObject) {
        const row = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list', null));
        return row.map(e => new Inquiry(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ['id', this.id],
            ['title', this.title],
            ['category_id', this.category_id],
            ['resolved', this.resolved === 1],
            ['create_at', this.create_at.unix()],
            ['update_at', this.update_at.unix()],
        ]);
    }
}
