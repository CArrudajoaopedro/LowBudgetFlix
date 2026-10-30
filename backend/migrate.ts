import { loadConfig } from "./src/config";
import {Client} from "pg";
import fs from "fs";
import path from "path";

async function migrate()
{
    const config = loadConfig({databaseUrl: true, jwtSecret: false});
    const client = new Client({
        connectionString: config.databaseUrl,
        ssl: {rejectUnauthorized: false},
    });
    try
    {
        await client.connect();
        const migrations_dir: string = path.join(__dirname, "migrations");
        const fileNameCompare = (a: string, b: string) => {return parseInt(a) - parseInt(b)};
        const files = fs.readdirSync(migrations_dir).sort(fileNameCompare);
        for (let i = 0; i < files.length; i++)
        {
            if (!files[i].endsWith(".sql"))
            {
                continue;
            }
            const sql: string = fs.readFileSync(path.join(migrations_dir, files[i]), "utf-8");
            console.log(`Executando: ${files[i]}`);
            try
            {
                await client.query("BEGIN TRANSACTION");
                await client.query(sql);
                await client.query("COMMIT");
            }
            catch (error: any)
            {
                await client.query("ROLLBACK");
                console.error(`Erro ao executar a migration ${files[i]}`);
                throw error;
            }
        }
        console.log("Migrations executadas com sucesso.");
    }
    catch (error: any)
    {
        console.error(error.message);
    }
    finally
    {
        await client.end();
    }
}

migrate();