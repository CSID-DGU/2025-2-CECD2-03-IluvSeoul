import {DB} from "../../../framework/control/DB";
import Bean from "../../../framework/action/data/bean";
import Department from "../inquiry/data/department";
import Tag from "../inquiry/data/tag";

export namespace ModelLogic {
    const modelMap: Map<string, Array<Bean>> = new Map<string, Array<Bean>>()
    export async function reloadAll(session: DB.TP): Promise<void> {
        modelMap.clear();
        ['department', 'tag']
            .forEach(t => reload(session, t))
    }
    export async function reload(session: DB.TP, type: string): Promise<void> {
        modelMap.set(type, await getBeanList(session, type))
    }

    async function getBeanList(session: DB.TP, type: string): Promise<Array<Bean>> {
        let ret: Array<Bean>
        switch (type) {
            case "department":
                ret = await Department.list(session)
                break;
            case "tag":
                ret = await Tag.list(session)
                break;
        }
        return ret;
    }

    export function get(type: string): Array<Bean> {
        return modelMap.get(type)
    }
}