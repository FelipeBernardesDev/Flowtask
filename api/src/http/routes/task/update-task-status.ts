import { updateTaskStatusController } from '@/http/controllers/task/update-task-status.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { taskIdParamSchema } from '@/http/schemas/task/task-params.js'
import { taskResponseSchema } from '@/http/schemas/task/task-response.js'
import { taskStatusSchema } from '@/http/schemas/task/task-status.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateTaskStatusRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/:id/status',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Update task status',
                description: 'Updates the status of a task belonging to the authenticated user.',
                security: [
                    {
                        cookieAuth: [],
                    },
                ],
                params: taskIdParamSchema,
                body: taskStatusSchema,
                response: {
                    200: taskResponseSchema,
                    400: z.object({
                        message: z.string(),
                        code: z.string(),
                        error: z.array(z.any()),
                    }),
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
        updateTaskStatusController,
    )
}
