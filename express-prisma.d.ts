import { Agent, User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user: (User & { agentProfile: Agent | null }) | null
    }
  }
}
