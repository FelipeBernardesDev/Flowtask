import { registerController } from '@/http/controllers/auth/register.js'
import { registerSchema } from '@/http/schemas/auth/register.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function registerRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '',
        {
            schema: {
                tags: ['Auth'],
                summary: 'Register',
                description:
                    'Creates a new user account with name, email and password. Returns the created user on success.',
                body: registerSchema,
                response: {
                    201: z.object({
                        id: z.uuid(),
                        name: z.string(),
                        email: z.email(),
                        createdAt: z.date(),
                    }),
                    400: z.object({
                        code: z.string(),
                        message: z.string(),
                        error: z.array(z.any()),
                    }),
                    409: z.object({
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
        registerController,
    )
}
