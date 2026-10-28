import dotenv from "dotenv"

dotenv.config()

export interface AppConfig
{
    port: number,
    databaseUrl?: string,
    jwtSecret?: string,
}

export interface AppConfigRequired
{
    databaseUrl: boolean,
    jwtSecret: boolean,
}

export function loadConfig(required: AppConfigRequired): AppConfig
{
    const databaseUrl: string | undefined = process.env.DATABASE_URL;
    if (!databaseUrl && required.databaseUrl)
    {
        console.error("Erro: DATABASE_URL não está definida.");
        process.exit(1);
    }
    const port: number = parseInt(process.env.PORT ?? "3000", 10);
    const jwtSecret: string | undefined = process.env.JWT_SECRET;
    if (!jwtSecret && required.jwtSecret)
    {
        console.error("Erro: JWT_SECRET não está definido.");
        process.exit(1);
    }
    return {
        port,
        databaseUrl,
        jwtSecret,
    };
}
