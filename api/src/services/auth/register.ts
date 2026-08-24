import { ConflictError } from '@/errors/index.js'
import { RegisterInput } from '@/http/schemas/auth/register.js'
import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'

export async function registerService(data: RegisterInput) {
    const email = data.email.trim().toLowerCase()

    const alreadyExist = await prisma.user.findUnique({
        where: { email },
    })

    if (alreadyExist) {
        throw new ConflictError('User already exist.')
    }

    const passwordHash = await hash(data.password, 10)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    })

    return user
}
