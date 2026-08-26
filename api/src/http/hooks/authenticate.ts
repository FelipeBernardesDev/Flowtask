import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({
            onlyCookie: true,
        })
    } catch {
        return reply.status(401).send({
            code: 'UNAUTHORIZED',
            message: 'Unauthorized',
        })
    }
}
