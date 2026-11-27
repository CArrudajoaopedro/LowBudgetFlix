import express, {Request, Response, NextFunction} from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { loadConfig } from "./config";
import { errorHandler } from "./errors/errorHandler";
import { AppError } from "./errors/AppErrors";
import authRoutes from "./auth/auth.routes";
import usuariosRoutes from "./usuarios/usuarios.routes";
import conteudosRoutes from "./conteudos/conteudos.routes";
import episodiosRoutes from "./episodios/episodios.routes";
import faixasRoutes from "./faixas/faixas.routes";
import categoriasRoutes from "./categorias/categorias.routes";
import artistasRoutes from "./artistas/artistas.routes";
import historicoRoutes from "./historico_visualizacao/historico_visualizacao.routes"
import avaliacoesRoutes from "./avaliacoes/avaliacoes.routes";

const config = loadConfig({databaseUrl: false, jwtSecret: false});
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
app.use(authRoutes);
app.use(usuariosRoutes);
app.use(conteudosRoutes);
app.use(episodiosRoutes);
app.use(faixasRoutes);
app.use(categoriasRoutes);
app.use(artistasRoutes);
app.use(historicoRoutes);
app.use(avaliacoesRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
    const err: AppError = new AppError("A rota solicitada não existe.",
    404, "ROUTE_NOT_FOUND");
    next(err);
});
app.use(errorHandler);
app.listen(config.port, () => {console.log(`Servidor rodando em http://localhost:${config.port}`)});