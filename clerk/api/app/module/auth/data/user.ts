import moment from "moment-timezone";
import RequestObject from "../../../../framework/object/request.object";
import {DB} from "../../../../framework/control/DB";
import Bean from "../../../../framework/action/data/bean";
import {TimeUtil} from "../../../../framework/utils/time.util";

export default class User implements Bean {
    id: number;
    loginCount: number;
    lastDeviceId: number;
    loginAt: moment.Moment;
    createAt: moment.Moment;

    constructor(request: RequestObject, data?: any) {
        if (data === null || data === undefined) {
            this.id = 0;
            this.loginCount = 1;
            this.lastDeviceId = 0;
            this.loginAt = request.now;
            this.createAt = request.now;
        } else {
            this.id = data.id;
            this.loginCount = data.login_count;
            this.lastDeviceId = data.last_device_id;
            this.loginAt = moment(data.login_at);
            this.createAt = moment(data.create_at);
        }
    }

    static async select(request: RequestObject, id: number): Promise<User> {
        const row = await request.select(DB.Type.main, 'user', 'select', {id: id});
        if (row === null) {
            return null;
        }
        return new User(request, row);
    }

    static async insert(request: RequestObject, user: User): Promise<number> {
        return await request.insertReturning(DB.Type.main, 'user', user.dbMap());
    }

    static async update(request: RequestObject, user: User): Promise<void> {
        await request.update(DB.Type.main, 'user', 'update', user.dbMap());
    }

    dbMap(): object {
        return {
            id: this.id,
            login_count: this.loginCount,
            last_device_id: this.lastDeviceId,
            login_at: TimeUtil.getDBFormat(this.loginAt),
            create_at: TimeUtil.getDBFormat(this.createAt),
        };
    }

    insertMap(): object {
        return {
            login_count: this.loginCount,
            last_device_id: this.lastDeviceId,
            login_at: TimeUtil.getDBFormat(this.loginAt),
            create_at: TimeUtil.getDBFormat(this.createAt),
        }
    }

    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ['id', this.id]
        ]);
    }
}
