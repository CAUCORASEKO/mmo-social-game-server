import { FastifyInstance } from 'fastify';
import { getUserProfileById } from './users.service.js';
import { JwtPayload } from '../auth/auth.plugin.js';

export async function usersRoutes(app: FastifyInstance) {
  app.get(
    '/users/me',
    {
      preHandler: [app.authenticate]
    },
    async (request, reply) => {
      const user = request.user as JwtPayload;

      const profile = getUserProfileById(user.id);

      if (!profile) {
        return reply.code(404).send({ error: 'User profile not found' });
      }

      return profile;
    }
  );
}
