import {WebUtil} from "@/util/web.util";
import {TypeUtil} from "@/util/type.util";

export namespace ModelService {
    export async function get<T>(con: new (data: any) => T, type: string): Promise<Array<T>> {
        return WebUtil.get('/model/detail', {
            params: {
                type: type
            }
        })
            .then(res => TypeUtil.toArray(res[type]).map(e => new con(e)))
            .catch(error => null)
    }
}