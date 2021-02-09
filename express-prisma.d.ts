import { Agent, PrismaClient, User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient
      user: (User & { agentProfile: Agent | null }) | null
    }
  }
}
