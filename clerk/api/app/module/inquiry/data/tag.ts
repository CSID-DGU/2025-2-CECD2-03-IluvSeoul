import Bean from "../../../../framework/action/data/bean";
import {DB} from "../../../../framework/control/DB";
import {TypeUtil} from "../../../../framework/utils/type.util";

export default class Tag implements Bean {
    id: number;
    name: string;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
    }
    static async list(type: DB.TP): Promise<Array<Tag>> {
        const list = TypeUtil.toArray(await DB.list(type, 'inquiry', 'model-tag', null));
        return list.map(e => new Tag(e))
    }
    getResponseMap(): Map<string, any> {
        return new Map<string, any>([
            ["id", this.id],
            ["name", this.name]
        ]);
    }
}