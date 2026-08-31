import { updateTaskController } from '@/http/controllers/task/update-task.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { taskIdParamSchema } from '@/http/schemas/task/task-params.js'
import { taskResponseSchema } from '@/http/schemas/task/task-response.js'
import { updateTaskSchema } from '@/http/schemas/task/update-task.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function updateTaskRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().patch(
        '/:id',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Update a task',
                description: 'Update a task from the authenticated user.',
                security: [
                    {
                        cookieAuth: [],
                    },
                ],
                params: taskIdParamSchema,
                body: updateTaskSchema,
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
        updateTaskController,
    )
}
