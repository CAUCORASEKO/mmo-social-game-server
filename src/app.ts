import Fastify from 'fastify';
import authPlugin from './modules/auth/auth.plugin.js';
import { authRoutes } from './modules/auth/auth.routes.js';

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  // Plugins
  app.register(authPlugin);

  // Routes
  app.register(authRoutes);

  // Healthcheck
  app.get('/health', async () => {
    return {
      status: 'ok',
      service: 'mmo-social-game-server'
    };
  });

  return app;
}