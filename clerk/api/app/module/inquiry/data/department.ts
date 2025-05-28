import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class Department implements Bean {
    id: number;
    name: string;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
    static async list(type: DB.TP): Promise<Array<Department>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-department', null));
        return list.map(e => new Department(e))
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name]
        ]);
    }
}