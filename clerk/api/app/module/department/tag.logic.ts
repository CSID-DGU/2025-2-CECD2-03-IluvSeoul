import RequestObject from "../../../framework/object/request.object";
import Tag from "./data/tag";
import {ModelLogic} from "../model/model.logic";

export namespace TagLogic {
    export async function create(request: RequestObject, name: string): Promise<number> {
        const list = await Tag.list(await request.getSession())
        const tag = new Tag({id: list.reduce((a, b) => a > b.id ? a : b.id, 0) + 1, name: name});
        await Tag.insert(request, tag)
        await request.commitAll()

        await ModelLogic.reloadAll(await request.getSession())

        return tag.id;
    }
}