import RequestObject from "../../../framework/object/request.object";
import Department from "./data/department";
import DepartmentTag from "./data/department_tag";

export namespace DepartmentLogic {
    export async function create(request: RequestObject, name: string): Promise<any> {
        const departments = await Department.list(await request.getSession())
        const department = new Department({id: departments.reduce((a, b) => a > b.id ? a : b.id, 0) + 1, name: name});
        await Department.insert(request, department)

        request.setData('department', department);
    }
    export async function del(request: RequestObject, id: number): Promise<any> {}
    export async function tag(request: RequestObject, department_id: number, tag_id: number, is_add: boolean): Promise<any> {
        is_add
            ? await DepartmentTag.insert(request, {department_id, tag_id})
            : await DepartmentTag.delete(request, {department_id, tag_id})
    }
}