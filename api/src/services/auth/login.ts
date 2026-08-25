import { UnauthorizedError } from '@/errors/index.js'
import { LoginInput } from '@/http/schemas/auth/login.js'
import { prisma } from '@/lib/prisma.js'
import { compare } from 'bcryptjs'

export async function loginService(data: LoginInput) {
    const email = data.email.trim().toLowerCase()

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        throw new UnauthorizedError('Invalid email or password!')
    }

    const passwordMatch = await compare(data.password, user.passwordHash)

    if (!passwordMatch) {
        throw new UnauthorizedError('Invalid email or password!')
    }

    const { passwordHash, ...safeUser } = user

    return safeUser
}
