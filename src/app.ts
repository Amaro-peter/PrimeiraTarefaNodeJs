
import fastify from 'fastify';
import { appUserRoutes } from './routes/userRoutes/routes';
import { appPostRoutes } from './routes/postRoutes/postRoutes';

export const app = fastify();

app.register(appUserRoutes);

app.register(appPostRoutes);