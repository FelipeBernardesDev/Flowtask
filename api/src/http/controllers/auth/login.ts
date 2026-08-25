import { env } from '@/env/index.js'
import { LoginInput } from '@/http/schemas/auth/login.js'
import { loginService } from '@/services/auth/login.js'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function loginController(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply,
) {
    const data = request.body

    const user = await loginService(data)

    const token = await reply.jwtSign({
        sub: user.id,
    })

    return reply
        .setCookie('token', token, {
            httpOnly: true,
            secure: env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })
        .send({
            message: 'Login successful',
        })
}
