import { loginController } from '@/http/controllers/auth/login.js'
import { loginSchema } from '@/http/schemas/auth/login.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function loginRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '',
        {
            schema: {
                tags: ['Auth'],
                summary: 'Login',
                description: 'Authenticates a user using their email and password. Upon successful authentication, an HTTP-only authentication cookie is set for subsequent authenticated requests.',
                body: loginSchema,
                response: {
                    200: z.object({
                        message: z.string(),
                    }),
                    400: z.object({
                        code: z.string(),
                        message: z.string(),
                        error: z.array(z.any()),
                    }),
                    401: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                    500: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        loginController,
    )
}
