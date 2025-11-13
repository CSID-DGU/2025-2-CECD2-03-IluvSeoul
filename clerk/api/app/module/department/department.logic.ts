import RequestObject from "../../../framework/object/request.object";
import Department from "./data/department";
import DepartmentTag from "./data/department_tag";
import {ModelLogic} from "../model/model.logic";

export namespace DepartmentLogic {
    export async function create(request: RequestObject, name: string): Promise<any> {
        const departments = await Department.list(await request.getSession())
        const department = new Department({name: name});
        await Department.insert(request, department)
        await request.commitAll()

        await ModelLogic.reloadAll(await request.getSession())

        request.setData('department', department);
    }
    export async function del(request: RequestObject, id: number): Promise<any> {
        await Department.del(request, id)
        await request.commitAll()

        await ModelLogic.reloadAll(await request.getSession())
    }
    export async function tag(request: RequestObject, department_id: number, tag_id: number, is_add: boolean): Promise<any> {
        is_add
            ? await DepartmentTag.insert(request, {department_id, tag_id})
            : await DepartmentTag.delete(request, {department_id, tag_id})

        await request.commitAll()

        await ModelLogic.reloadAll(await request.getSession())
    }
}