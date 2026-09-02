import { AppError } from '@/errors/app-error.js'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { Prisma } from '@/generated/prisma/index.js'
import { ZodError } from 'zod'

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
            message: error.message,
            statusCode: error.statusCode,
            code: error.code,
        })
    }

    if (error instanceof ZodError) {
        return reply.status(400).send({
            code: 'VALIDATION_ERROR',
            message: 'Validation error.',
            error: error.issues,
        })
    }

    if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(400).send({
            code: 'VALIDATION_ERROR',
            message: 'Validation error',
            error: error.validation,
        })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return reply.status(409).send({
                    message: 'Register already exist',
                    statusCode: 409,
                    code: 'CONFLICT',
                })

            case 'P2025':
                return reply.status(404).send({
                    message: 'Register not found',
                    statusCode: 404,
                    code: 'NOT_FOUND',
                })
        }
    }

    request.log.error(error)
    return reply.status(500).send({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
    })
}
