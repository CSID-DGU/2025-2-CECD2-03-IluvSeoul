import {DB} from "../../../framework/control/DB";
import Bean from "../../../framework/action/data/bean";
import Category from "../inquiry/data/category";

export namespace ModelLogic {
    const modelMap: Map<string, Array<Bean>> = new Map<string, Array<Bean>>()
    export async function reloadAll(session: DB.TP): Promise<void> {
        ['category'].forEach(t => reload(session, t))
    }
    export async function reload(session: DB.TP, type: string): Promise<void> {
        modelMap.set(type, await getBeanList(session, type))
    }

    async function getBeanList(session: DB.TP, type: string): Promise<Array<Bean>> {
        let ret: Array<Bean>
        switch (type) {
            case "category":
                ret = await Category.list(session)
        }
        return ret;
    }

    export function get(type: string): Array<Bean> {
        return modelMap.get(type)
    }
}