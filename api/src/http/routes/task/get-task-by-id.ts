import { getTaskByIdController } from '@/http/controllers/task/get-task-by-id.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { taskIdParamSchema } from '@/http/schemas/task/task-params.js'
import { taskResponseSchema } from '@/http/schemas/task/task-response.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getTaskByIdRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/:id',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Get task by id',
                description: 'Returns the details of a specific task belonging to the authenticated user.',
                security: [
                    {
                        cookieAuth: [],
                    },
                ],
                params: taskIdParamSchema,
                response: {
                    200: taskResponseSchema,
                    404: z.object({
                        message: z.string(),
                        statusCode: z.number(),
                        code: z.string(),
                    }),
                    500: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        getTaskByIdController,
    )
}
