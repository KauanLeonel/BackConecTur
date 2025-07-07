import 'dotenv/config';
import express from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import conquistasRoutes from './routes/conquistasRoutes.js';
import cupomRoutes from './routes/cupomRoutes.js';
import empresaRoutes from './routes/empresaRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import eventoAdministradorRoutes from './routes/eventoAdministradorRoutes.js';
import eventoCidadaoRoutes from './routes/eventoCidadaoRoutes.js';
import favoritoRoutes from './routes/favoritoRoutes.js';
import historicoRoutes from './routes/historicoRoutes.js';
import localizacaoRoutes from './routes/localizacaoRoutes.js';
import lojaRoutes from './routes/lojaRoutes.js';
import missaoRoutes from './routes/missaoRoutes.js';
import notificacaoRoutes from './routes/notificacaoRoutes.js';
import preferenciasNotificacaoRoutes from './routes/preferenciasNotificacaoRoutes.js';
import sorteioRoutes from './routes/sorteioRoutes.js';
import configuracoesGeraisRoutes from './routes/configuracoesGeraisRoutes.js';
import { errorHandler } from "./middleware/errorsHandle.js"
import { logger } from "./middleware/logger.js"

const app = express();

//MidWare
app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/conquistas', conquistasRoutes);
app.use('/cupom', cupomRoutes);
app.use('/empresa', empresaRoutes);
app.use('/evento', eventoRoutes);
app.use('/eventoadministrador', eventoAdministradorRoutes);
app.use('/eventocidadao', eventoCidadaoRoutes);
app.use('/favorito', favoritoRoutes);
app.use('/historico', historicoRoutes);
app.use('/localizacao', localizacaoRoutes);
app.use('/loja', lojaRoutes);
app.use('/missao', missaoRoutes);
app.use('/notificacao', notificacaoRoutes);
app.use('/preferenciasnotificacao', preferenciasNotificacaoRoutes);
app.use('/sorteio', sorteioRoutes);
app.use('/configuracoesgerais', configuracoesGeraisRoutes);
//app.use("/task", taskRoutes)
app.use(errorHandler)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));