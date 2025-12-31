import { FastifyInstance } from 'fastify';
import { JwtPayload } from '../auth/auth.plugin.js';
import {
  addItemToInventory,
  getInventoryByOwner,
  ItemRarity
} from './inventory.service.js';

export async function inventoryRoutes(app: FastifyInstance) {
  // Get inventory
  app.get(
    '/inventory',
    { preHandler: [app.authenticate] },
    async (request) => {
      const user = request.user as JwtPayload;
      return getInventoryByOwner(user.id);
    }
  );

  // Add item (simula drop / reward / admin grant)
  app.post(
    '/inventory/add-item',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const user = request.user as JwtPayload;
      const { type, rarity, quantity } = request.body as {
        type?: string;
        rarity?: ItemRarity;
        quantity?: number;
      };

      if (!type || !rarity || !quantity) {
        return reply.code(400).send({ error: 'Invalid item payload' });
      }

      const item = addItemToInventory(user.id, {
        type,
        rarity,
        quantity
      });

      return item;
    }
  );
}