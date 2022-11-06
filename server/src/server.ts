import cors from '@fastify/cors';
import Fastify from 'fastify';
import { authRoutes, gameRoutes, guessRoutes, poolRoutes, userRoutes } from './routes';
import jwt from '@fastify/jwt'
import fastifyEnv from '@fastify/env'
import { options } from './config';

async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true, 
    })

    await fastify.register(fastifyEnv, options)
    //TODO; COLOCAR NO .ENV
    await fastify.register(jwt, {
        secret: fastify.config.SECRET_JWT,
    })

    await fastify.register(authRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(gameRoutes)
    await fastify.listen({ port: parseInt(fastify.config.PORT), host:'0.0.0.0'}).then(()=>console.log(
        `Server is Listening on port ${fastify.config.PORT}`
    ))
}

bootstrap()