import fastify from 'fastify';
import { appRoutes } from './http/routers';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  } else {
    // TODO: Here we should log to an external tool.
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});

//docker compose up -d
//npx prisma migrate dev
//npm run start:dev
