import express from "express";
import { loadConfig } from "./config";

const config = loadConfig({databaseUrl: false, jwtSecret: false});
const app = express();
app.use(express.json());
app.listen(config.port, () => {console.log(`Escutando na porta: ${config.port}`)});