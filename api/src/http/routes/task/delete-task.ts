import { deleteTaskController } from '@/http/controllers/task/delete-task.js'
import { authenticate } from '@/http/hooks/authenticate.js'
import { taskIdParamSchema } from '@/http/schemas/task/task-params.js'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function deleteTaskRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().delete(
        '/:id',
        {
            onRequest: [authenticate],
            schema: {
                tags: ['Tasks'],
                summary: 'Delete a task',
                description: 'Deletes a task owned by the authenticated user',
                security: [
                    {
                        cookieAuth: [],
                    },
                ],
                params: taskIdParamSchema,
                response: {
                    200: z.object({
                        message: z.string(),
                    }),
                    400: z.object({
                        code: z.string(),
                        message: z.string(),
                        error: z.array(z.any()),
                    }),
                    500: z.object({
                        code: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        deleteTaskController,
    )
}
