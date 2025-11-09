import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";
import RequestObject from "../../../../framework/object/request.object";

export default class Department implements Bean {
    id: number;
    name: string;
    group_id: number;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.group_id = data.group_id ?? 0;
    }
    static async list(type: DB.TP): Promise<Array<Department>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-department', null));
        return list.map(e => new Department(e))
    }

    static async insert(request: RequestObject, user: Department): Promise<void> {
        await request.insert(DB.Type.main, '_department', {
            id: user.id,
            name: user.name,
            group_id: user.group_id,
        });
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name],
            ["group_id", this.group_id]
        ]);
    }
}