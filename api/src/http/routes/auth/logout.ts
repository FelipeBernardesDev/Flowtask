import { logoutController } from '@/http/controllers/auth/logout.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function logoutRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        '',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Auth'],
                summary: 'Logout',
                description: 'Clears the authentication cookie, ending the current session.',
                security: [
                    {
                        cookieAuth: [],
                    },
                ],
                response: {
                    200: z.object({
                        message: z.string(),
                    }),
                    401: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        logoutController,
    )
}
