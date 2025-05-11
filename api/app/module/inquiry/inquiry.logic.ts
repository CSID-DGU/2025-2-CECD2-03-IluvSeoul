import { DB } from "../../../framework/control/DB";
import Category from "./data/category";

export namespace InquiryLogic {
    let categoryMap: Map<number, Category>;
    export async function init(session: DB.TP): Promise<void> {
        const cList = await Category.list(session);
        categoryMap = cList.reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, new Map<number, Category>([]))
    }
}