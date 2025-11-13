import Department from "@/data/inquiry/department";
import {TypeUtil} from "@/util/type.util";
import {WebUtil} from "@/util/web.util";

// Department 에 관한 axios 액션 정의
export namespace DepartmentService {
    export async function create(name: string): Promise<void> {
        await WebUtil.get('/department/create', {
            params: {
                name: name
            }
        })
    }

    export async function del(id: number): Promise<void> {
        await WebUtil.get('/department/delete', {
            params: {
                id: id
            }
        })
    }

    export async function tag(department_id: number, tag_id: number | null, tag_name: string | null, is_add: boolean): Promise<void> {
        let param: { department_id: number, tag_id?: number, tag_name?: string, is_add: number } = {
            department_id: department_id,
            is_add: is_add ? 1 : 0
        }
        if (tag_name) param.tag_name = tag_name
        if (tag_id) param.tag_id = tag_id

        await WebUtil.get('/department/tag', {
            params: param
        })
    }
}