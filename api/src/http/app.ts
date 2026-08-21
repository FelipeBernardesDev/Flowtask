import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import fastifyApiReference from '@scalar/fastify-api-reference'

export const app = fastify({
    logger: true,
})

app.register(fastifySwagger, {
    openapi: {
        openapi: '3.0.0',
        info: {
            title: 'Flowtask API',
            description: 'Task management API',
            version: '1.0.0',
        },
    },
})

app.register(fastifyApiReference, {
    routePrefix: '/docs',
})
