import Fastify from 'fastify';
import authPlugin from './modules/auth/auth.plugin.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { usersRoutes } from './modules/users/users.routes.js';
import { inventoryRoutes } from './modules/inventory/inventory.routes.js';

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  // Plugins
  app.register(authPlugin);
  app.register(inventoryRoutes);

  // Routes
  app.register(authRoutes);
  app.register(usersRoutes);

  // Healthcheck
  app.get('/health', async () => {
    return {
      status: 'ok',
      service: 'mmo-social-game-server'
    };
  });

  return app;
}