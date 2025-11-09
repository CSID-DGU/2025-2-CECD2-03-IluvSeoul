import Bean from "../../../../framework/action/data/bean";
import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class Inquiry implements Bean {
    id: number;
    title: string;
    department_id: number;
    inquiry_user: string;
    inquiry_phone: string;
    inquiry_message: string;
    resolved: number;
    create_at: moment.Moment;
    limit_at: moment.Moment;
    update_at: moment.Moment;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.inquiry_message.substring(0, 25) + '...';
        // this.title = data.title;
        this.department_id = data.department_id;
        this.inquiry_user = data.inquiry_user;
        this.inquiry_phone = data.inquiry_phone;
        this.inquiry_message = data.inquiry_message;
        this.create_at = moment(data.create_at);
        this.limit_at = moment(data.limit_at);
        this.update_at = moment(data.update_at);
    }

    static async select(request: RequestObject, id: number): Promise<Inquiry> {
        const row = await request.select(DB.Type.main, 'inquiry', 'select', {id: id});
        if (row === null) {
            return null;
        }
        return new Inquiry(row);
    }

    static async insert(request: RequestObject, inquiry: Inquiry): Promise<number> {
        return await request.insertReturning(DB.Type.main, 'inquiry', {
            // title: inquiry.title,
            inquiry_user: inquiry.inquiry_user,
            inquiry_phone: inquiry.inquiry_phone,
            inquiry_message: inquiry.inquiry_message,
            limit_at: inquiry.limit_at.toDate(),
        })
    }

    static async update(request: RequestObject, inquiry: Inquiry): Promise<void> {
        await request.update(DB.Type.main, 'inquiry', 'update', {
            id: inquiry.id,
            department_id: inquiry.department_id,
            resolved: inquiry.resolved,
            update_at: moment.now
        });
    }

    static async list(request: RequestObject, tag: number, page: number) {
        const row = TypeUtil.toArray(await request.list(DB.Type.main, 'inquiry', 'list', {
            tag,
            page
        }));
        return row.map(e => new Inquiry(e))
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ['id', this.id],
            ['title', this.title],
            ['department_id', this.department_id],
            ['inquiry_user', this.inquiry_user],
            ['inquiry_phone', this.inquiry_phone],
            ['inquiry_message', this.inquiry_message],
            ['resolved', this.resolved === 1],
            ['create_at', this.create_at.unix()],
            ['limit_at', this.limit_at.unix()],
            ['update_at', this.update_at.unix()],
        ]);
    }
}
