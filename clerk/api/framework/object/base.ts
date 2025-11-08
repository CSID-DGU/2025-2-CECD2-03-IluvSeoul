import {DB} from "../control/DB";
import knex from "knex";
import getSession = DB.getSession;

export default class ObjectBase {
    constructor() {
        this.sessionMap = new Map();
    }

    private sessionMap: Map<DB.Type, knex.Knex.Transaction>

    public async getSession(type?: DB.Type): Promise<knex.Knex.Transaction> {
        type = type === undefined || type === null ? DB.Type.main : type;
        if (this.sessionMap.has(type)) {
            return this.sessionMap.get(type);
        }
        const session = await DB.getSession(type);
        this.sessionMap.set(type, session);
        return session;
    }

    public async rollback(type: DB.Type) {
        if (type == null) {
            return;
        }

        const session = this.sessionMap.get(type);
        if (session == null) {
            return;
        }

        await session.rollback();
        await DB.closeSession(session);

        this.sessionMap.delete(type);
    }

    public async rollbackAll() {
        for (const session of this.sessionMap.values()) {
            await session.rollback();
        }

        this.sessionMap.clear();
    }

    public async commit(type: DB.Type) {
        if (type == null) {
            return;
        }

        const session = this.sessionMap.get(type);
        if (session == null) {
            return;
        }

        await DB.closeSession(session);

        this.sessionMap.delete(type);
    }

    public async commitAll() {
        for (const session of this.sessionMap.values()) {
            await DB.closeSession(session);
        }

        this.sessionMap.clear();
    }

    public async getLastId(type: DB.Type): Promise<number> {
        return await DB.getLastId(await this.getSession(type));
    }

    public async list(type: DB.Type, namespace: string, query: string, data: object): Promise<any> {
        return await DB.list(await this.getSession(type), namespace, query, data);
    }
    public async select(type: DB.Type, namespace: string, query: string, data: object): Promise<any> {
        return await DB.select(await this.getSession(type), namespace, query, data);
    }
    public async update(type: DB.Type, namespace: string, query: string, data: object): Promise<any> {
        return await DB.update(await this.getSession(type), namespace, query, data);
    }
    public async insert(type: DB.Type, table: string, data: object): Promise<void> {
        return await DB.insert(await this.getSession(type), table, data);
    }
    public async insertReturning(type: DB.Type, table: string, data: object): Promise<number> {
        return await DB.insertReturning(await this.getSession(type), table, data);
    }
    public async delete(type: DB.Type, namespace: string, query: string, data: object): Promise<void> {
        return await DB.del(await this.getSession(type), namespace, query, data);
    }
}