import { getTasksController } from '@/http/controllers/task/get-tasks.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { getTasksQuerySchema } from '@/http/schemas/task/task-params.js'
import { taskResponseSchema } from '@/http/schemas/task/task-response.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getTasksRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Get tasks',
                description: 'Get all tasks from the authenticated user.',
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                querystring: getTasksQuerySchema,
                response: {
                    200: z.object({
                        tasks: z.array(taskResponseSchema),
                        meta: z.object({
                            page: z.number(),
                            pageSize: z.number(),
                            total: z.number(),
                            totalPages: z.number(),
                        }),
                    }),
                    500: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        getTasksController,
    )
}
