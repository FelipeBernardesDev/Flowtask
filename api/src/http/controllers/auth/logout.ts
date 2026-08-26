import { FastifyReply, FastifyRequest } from 'fastify'

export async function logoutController(request: FastifyRequest, reply: FastifyReply) {
    return reply
        .clearCookie('access_token', {
            path: '/',
        })
        .status(200)
        .send({
            message: 'Logout successful',
        })
}
