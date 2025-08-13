
import fastify from 'fastify';
import { appUserRoutes } from './core/routes/userRoutes/routes';
import { appPostRoutes } from './core/routes/postRoutes/postRoutes';

export const app = fastify();

app.register(appUserRoutes);

app.register(appPostRoutes);