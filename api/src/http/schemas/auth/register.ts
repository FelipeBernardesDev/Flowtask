import { z } from 'zod'

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must contain at least 3 characters.')
        .max(100, 'Name must contain at most 100 characters.'),

    email: z.email('Insert a valid email.').trim().toLowerCase(),

    password: z
        .string()
        .min(8, 'Password must contain at least 8 characters.')
        .max(128, 'Password must contain at most 128 characters.')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .regex(/[0-9]/, 'Password must contain at least one number.')
        .regex(/^\S+$/, 'Password must not contain spaces.'),
})

export type RegisterInput = z.infer<typeof registerSchema>
