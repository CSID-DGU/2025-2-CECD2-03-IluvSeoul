import {DB} from "../../../framework/control/DB";
import Bean from "../../../framework/action/data/bean";
import Department from "../department/data/department";
import Tag from "../department/data/tag";
import DepartmentGroup from "../department/data/department_group";
import DepartmentTag from "../department/data/department_tag";
import axios from "axios";

export namespace ModelLogic {
    const AI_URL = 'http://61.82.95.102:8001/seoul/'
    const modelMap: Map<string, Array<Bean>> = new Map<string, Array<Bean>>()
    export async function reloadAll(session: DB.TP): Promise<void> {
        modelMap.clear();
        for (const t of ['department', 'tag', 'department.group', 'department.tag']) {
            await reload(session, t);
        }
    }
    export async function reload(session: DB.TP, type: string): Promise<void> {
        modelMap.set(type, await getBeanList(session, type))

        axios.get(AI_URL + 'control/reload?type=' + type).then(res => {
            console.log(res.data)
        })
            .catch(error => {
                console.log(error)
            })
    }

    async function getBeanList(session: DB.TP, type: string): Promise<Array<Bean>> {
        let ret: Array<Bean>
        switch (type) {
            case "department":
                ret = await Department.list(session)
                break;
            case 'department.group':
                ret = await DepartmentGroup.list(session)
                break;
            case 'department.tag':
                ret = await DepartmentTag.list(session)
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