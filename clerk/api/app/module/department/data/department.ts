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

    static async insert(request: RequestObject, dpt: Department): Promise<void> {
        await request.insert(DB.Type.main, '_department', {
            name: dpt.name,
            group_id: dpt.group_id,
        });
    }

    static async del(request: RequestObject, id: number): Promise<void> {
        await request.delete(DB.Type.main, 'department', 'delete-department', {id: id});
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name],
            ["group_id", this.group_id]
        ]);
    }
}