import { RegisterInput } from '@/http/schemas/auth/register.js'
import { registerService } from '@/services/auth/register.js'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function registerController(
    request: FastifyRequest<{ Body: RegisterInput }>,
    reply: FastifyReply,
) {
    const data = request.body

    const user = await registerService(data)

    return reply.status(201).send(user)
}
