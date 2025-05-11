import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class Category implements Bean {
    id: number;
    name: string;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
    static async list(type: DB.TP): Promise<Array<Category>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-category', null));
        return list.map(e => new Category(e))
    }
    getResponseMap(): Map<string, any> {
        return undefined;
    }
}