import { Pool } from "pg";
import { loadConfig } from "./config";

const config = loadConfig({databaseUrl: true, jwtSecret: false});
export const pool = new Pool(
    {
        connectionString: config.databaseUrl,
        ssl: {rejectUnauthorized: false},
    }
);