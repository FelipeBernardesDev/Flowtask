import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/env/index.js'

export default fp(async (fastify) => {
    fastify.register(fastifyJwt, {
        secret: env.JWT_SECRET,
        sign: {
            expiresIn: env.JWT_EXPIRES_IN,
        },
    })
})
