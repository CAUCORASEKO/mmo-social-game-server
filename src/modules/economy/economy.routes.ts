import { FastifyInstance } from 'fastify';
import { JwtPayload } from '../auth/auth.plugin.js';
import {
  getBalance,
  grantCurrency,
  getTransactions,
  CurrencyType
} from './economy.service.js';

export async function economyRoutes(app: FastifyInstance) {
  // Get balance
  app.get(
    '/economy/balance',
    { preHandler: [app.authenticate] },
    async (request) => {
      const user = request.user as JwtPayload;
      return getBalance(user.id);
    }
  );

  // Grant currency (simula reward, quest, admin grant)
  app.post(
    '/economy/grant',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const user = request.user as JwtPayload;
      const { currency, amount, reason } = request.body as {
        currency?: CurrencyType;
        amount?: number;
        reason?: string;
      };

      if (!currency || !amount || !reason) {
        return reply.code(400).send({ error: 'Invalid payload' });
      }

      try {
        const tx = grantCurrency(user.id, currency, amount, reason);
        return tx;
      } catch (err) {
        return reply.code(400).send({ error: (err as Error).message });
      }
    }
  );

  // Get transaction history
  app.get(
    '/economy/transactions',
    { preHandler: [app.authenticate] },
    async (request) => {
      const user = request.user as JwtPayload;
      return getTransactions(user.id);
    }
  );
}