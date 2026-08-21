import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import fastifyApiReference from '@scalar/fastify-api-reference'
import {
    serializerCompiler,
    validatorCompiler,
    jsonSchemaTransform,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { fastifyRateLimit } from '@fastify/rate-limit'
import { env } from '@/env/index.js'
import { logger } from '@/lib/logger.js'
import { errorHandler } from './error-handler.js'

export const app = fastify({
    loggerInstance: logger,
}).withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifyCors, {
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
})

app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
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
    transform: jsonSchemaTransform,
})

app.register(fastifyApiReference, {
    routePrefix: '/docs',
})
