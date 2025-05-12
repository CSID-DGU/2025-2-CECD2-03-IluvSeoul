import {WebUtil} from "@/util/web.util";
import {TypeUtil} from "@/util/type.util";

export default {
    async get<T>(con: new (data: any) => T, type: string): Promise<Array<T>> {
        const res = await WebUtil.get('/model/detail', {
            params: {
                type: type
            }
        })
        return TypeUtil.toArray(res[type]).map(e => new con(e));
    }
}