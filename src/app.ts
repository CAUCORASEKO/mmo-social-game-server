import Fastify from 'fastify';
import authPlugin from './modules/auth/auth.plugin.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { usersRoutes } from './modules/users/users.routes.js';
import { inventoryRoutes } from './modules/inventory/inventory.routes.js';
import { economyRoutes } from './modules/economy/economy.routes.js';
import cors from '@fastify/cors';

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  // Plugins
  app.register(authPlugin);
  app.register(inventoryRoutes);
  app.register(economyRoutes);
  app.register(cors, {
  origin: 'http://localhost:5173',
  credentials: true
});

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