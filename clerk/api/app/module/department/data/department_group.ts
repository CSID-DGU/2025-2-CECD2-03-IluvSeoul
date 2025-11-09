import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class DepartmentGroup implements Bean {
    id: number;
    name: string;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
    static async list(type: DB.TP): Promise<Array<DepartmentGroup>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-department_group', null));
        return list.map(e => new DepartmentGroup(e))
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name]
        ]);
    }
}