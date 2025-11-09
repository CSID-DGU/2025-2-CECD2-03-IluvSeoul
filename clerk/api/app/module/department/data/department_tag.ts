import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";
import RequestObject from "../../../../framework/object/request.object";

export default class DepartmentTag implements Bean {
    department_id: number;
    tag_id: number;

    constructor(data) {
        this.department_id = data.department_id;
        this.tag_id = data.tag_id;
    }
    static async list(type: DB.TP): Promise<Array<DepartmentTag>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-department_tag', null));
        return list.map(e => new DepartmentTag(e))
    }

    static async insert(request: RequestObject, data): Promise<void> {
        await request.insert(DB.Type.main, '_department_tag', data);
    }
    static async delete(request: RequestObject, data): Promise<void> {
        await request.delete(DB.Type.main, 'department', 'delete-department_tag', data);
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["department_id", this.department_id],
            ["tag_id", this.tag_id]
        ]);
    }
}