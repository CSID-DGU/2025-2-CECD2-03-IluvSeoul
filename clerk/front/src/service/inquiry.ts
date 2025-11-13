import Inquiry from "@/data/inquiry/inquiry";
import {TypeUtil} from "@/util/type.util";
import {WebUtil} from "@/util/web.util";
import InquiryTag from "@/data/inquiry/inquiry.tag";
import InquirySuggestDepartment from "@/data/inquiry/inquiry.suggest_department";

// Inquiry 에 관한 axios 액션 정의
export namespace InquiryService {
    export async function list(): Promise<Array<Inquiry>> {
        const res = await WebUtil.get('/inquiry/list')
        if (res === null) {
            return [];
        }
        return TypeUtil.toArray(res.inquiry_list).map(e => new Inquiry(e));
    }
    export async function detail(id: number): Promise<Inquiry> {
        const res = await WebUtil.get('/inquiry/detail', {
            params: {
                id: id
            }
        })

        return new Inquiry(res.inquiry).Init(res);
    }
    export async function assign(inquiry_id: number, department_id: number): Promise<Inquiry> {
        const res = await WebUtil.get('/inquiry/assign', {
            params: {
                id: inquiry_id,
                department_id: department_id
            }
        })
        return new Inquiry(res.inquiry).Init(res);
    }

    export async function create(user: string, phone: string, message: string): Promise<Inquiry> {
        const res = await WebUtil.post('/inquiry/create', Object.entries({
            user: user,
            phone: phone,
            message: message
        }).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&'), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        return new Inquiry(res.inquiry).Init(res);
    }
}