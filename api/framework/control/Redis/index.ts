import {createClient} from 'redis';
import {RedisClientType} from "@redis/client/dist/lib/client";
export namespace Redis {
    let client: RedisClientType;
    export async function init(): Promise<void> {
        client = createClient({
            username: 'default',
            password: process.env['REDIS.PW'],
            socket: {
                host: process.env['REDIS.HOST'],
                port: parseInt(process.env['REDIS.PORT']),
            }
        });
    }

    export async function getConnection(): Promise<RedisClientType> {
        await client.connect();
        return client;
    }

    export async function closeConnection(): Promise<void> {
        await client.disconnect();
    }
}