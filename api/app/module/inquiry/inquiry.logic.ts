import { DB } from "../../../framework/control/DB";
import Category from "./data/category";
import RequestObject from "../../../framework/object/request.object";
import Inquiry from "./data/inquiry";

export namespace InquiryLogic {
    let categoryMap: Map<number, Category>;
    export async function init(session: DB.TP): Promise<void> {
        const cList = await Category.list(session);
        categoryMap = cList.reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, new Map<number, Category>([]))
    }

    export async function list(request: RequestObject): Promise<void> {
        request.setData("inquiry_list", await Inquiry.list(request))
    }

    export async function detail(request: RequestObject, id: number): Promise<void> {
        request.setData("inquiry", await Inquiry.select(request, id))
    }
}