import { Agency, Agent, User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user:
        | (User & { agentProfile: (Agent & { agency: Agency }) | null })
        | null
    }
  }
}
