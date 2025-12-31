import { FastifyInstance } from 'fastify';
import { hashPassword, verifyPassword } from './auth.service.js';
import { saveUserProfile } from '../users/users.service.js';

interface UserRecord {
  id: string;
  username: string;
  passwordHash: string;
  role: 'player' | 'admin';
}

// ⚠️ Simulación de base de datos (temporal)
const users = new Map<string, UserRecord>();

export async function authRoutes(app: FastifyInstance) {
  // Register
  app.post('/auth/register', async (request, reply) => {
    const { username, password } = request.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return reply.code(400).send({ error: 'Username and password required' });
    }

    if (users.has(username)) {
      return reply.code(409).send({ error: 'User already exists' });
    }

    const passwordHash = await hashPassword(password);

    const user: UserRecord = {
      id: crypto.randomUUID(),
      username,
      passwordHash,
      role: 'player'
    };

    // Guardamos credenciales (Auth)
    users.set(username, user);

    // 🔑 Guardamos perfil (Users module)
    saveUserProfile({
      id: user.id,
      username: user.username,
      role: user.role
    });

    const token = app.jwt.sign({
      id: user.id,
      role: user.role
    });

    return {
      token
    };
  });

  // Login
  app.post('/auth/login', async (request, reply) => {
    const { username, password } = request.body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return reply.code(400).send({ error: 'Username and password required' });
    }

    const user = users.get(username);

    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = app.jwt.sign({
      id: user.id,
      role: user.role
    });

    return {
      token
    };
  });
}