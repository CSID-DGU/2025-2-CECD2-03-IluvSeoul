import * as path from "path";
import knex from "knex";
import QueryMap, {loadQueries} from "./queries";

export namespace DB {
    export enum Type {
        main
    }
    export type TP = Type | knex.Knex.Transaction;
    export type SqlSession = knex.Knex.Transaction;

    const connections: Map<Type, knex.Knex> = new Map();
    const typeMap: Map<string, Type> = new Map([['MAIN', Type.main]]);
    let queryMap: QueryMap;
    export async function init() {
        queryMap = loadQueries(path.resolve(process.cwd(), 'query'))

        for (const fp of ['MAIN']) {
            connections.set(typeMap.get(fp), knex({
                client: 'mysql2',
                connection: {
                    host: process.env[fp + '.DB.HOST'],
                    port: parseInt(process.env[fp + '.DB.PORT']),
                    user: process.env[fp + '.DB.USER'],
                    password: process.env[fp + '.DB.PASSWORD'],
                    database: process.env[fp + '.DB.DATABASE'],
                    charset: 'utf8',
                },
                pool: {
                    min: 0,
                    max: parseInt(process.env[fp + '.DB.POOL'])
                }
                })
            );
        }
    }

    export async function getSession(type?: TP): Promise<SqlSession> {
        if (type == null) {
            return connections.get(Type.main).transaction();
        }
        if (typeof type === 'number' && Object.values(Type).includes(type)) return await connections.get(type as Type).transaction();
        return <knex.Knex.Transaction>type;
    }

    export function getQuery(namespace: string, sql: string): string {
        return queryMap.get(namespace, sql);
    }

    export async function closeSession(session: knex.Knex.Transaction) {
        await session.commit();
        await session.destroy();
    }

    export async function getLastId(session: knex.Knex.Transaction): Promise<number> {
        const row = await select(session, 'system', 'last-id', null);
        return row[0].id;
    }

    export async function list(type: TP, namespace: string, query: string, data: object): Promise<any> {
        const connection = await getSession(type);
        const row = data ? await connection.raw(getQuery(namespace, query), data) : await connection.raw(getQuery(namespace, query));
        if (Array.isArray(row) && row.length > 0) {
            return row[0];
        }
        return null;
    }

    export async function select(type: TP, namespace: string, query: string, data: object): Promise<any> {
        const connection = await getSession(type);
        const row = (await connection.raw(getQuery(namespace, query), data))[0];
        if (Array.isArray(row) && row.length > 0) {
            return row[0];
        }
        return null;
    }

    export async function update(type: TP, namespace: string, query: string, data: object): Promise<any> {
        const connection = await getSession(type);
        return (await connection.raw(getQuery(namespace, query), data))[0];
    }

    export async function insertReturning(type: TP, table: string, data: object): Promise<number> {
        const connection = await getSession(type);
        const row = await connection(table).insert(data).then(result => result);
        return row[0];
    }

    export async function insert(type: TP, table: string, data: object): Promise<void> {
        const connection = await getSession(type);
        await connection(table).insert(data);
    }


    export async function del(type: TP, namespace: string, query: string, data: object): Promise<void> {
        const connection = await getSession(type);
        await connection.raw(getQuery(namespace, query), data)
    }
}