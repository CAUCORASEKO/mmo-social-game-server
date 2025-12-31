import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export interface JwtPayload {
  id: string;
  role: 'player' | 'admin';
}

async function authPlugin(app: FastifyInstance) {
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me'
  });

  app.decorate(
    'authenticate',
    async (
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ error: 'Unauthorized' });
      }
    }
  );
}

export default fp(authPlugin);