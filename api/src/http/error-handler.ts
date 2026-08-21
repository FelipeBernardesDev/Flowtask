import { AppError } from '@/errors/app-error.js'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

export function errorHandler(
    error: FastifyError | Error,
    request: FastifyRequest,
    reply: FastifyReply,
) {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            code: error.code,
            message: error.message,
        })
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            code: 'VALIDATION_ERROR',
            message: 'Validation error.',
            error: error.issues,
        })
    }

    request.log.error(error)
    return reply.status(500).send({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
    })
}
