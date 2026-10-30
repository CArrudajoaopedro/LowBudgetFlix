import express, {Request, Response, NextFunction} from "express";
import { loadConfig } from "./config";
import { errorHandler } from "./errors/errorHandler";
import { AppError } from "./errors/AppErrors";
import authRoutes from "./auth/auth.routes";
import usuariosRoutes from "./usuarios/usuarios.routes";

const config = loadConfig({databaseUrl: false, jwtSecret: false});
const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(usuariosRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
    const err: AppError = new AppError("A rota solicitada não existe.",
    404, "ROUTE_NOT_FOUND");
    next(err);
});
app.use(errorHandler);
app.listen(config.port, () => {console.log(`Servidor rodando em http://localhost:${config.port}`)});