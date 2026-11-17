import { Pool } from "pg";
import { loadConfig } from "./config";

const config = loadConfig({databaseUrl: true, jwtSecret: false});
export const pool = new Pool(
    {
        connectionString: config.databaseUrl,
        ssl: {rejectUnauthorized: false},
    }
);

export async function transaction(func: any, ...args: any[])
{
    const client = await pool.connect();
    try
    {
        await client.query("BEGIN");
        const result = await func(...args, client);
        await client.query("COMMIT");
        return result;
    }
    catch (e)
    {
        await client.query("ROLLBACK");
        throw e;
    }
    finally
    {
        client.release();
    }
}