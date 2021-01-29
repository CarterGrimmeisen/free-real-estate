import { Agent, PrismaClient, User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient
      user: Omit<User & { agentProfile: Agent | null }, 'password'> | null
    }
  }
}
