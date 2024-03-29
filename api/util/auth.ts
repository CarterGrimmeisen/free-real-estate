import { UserType } from '@prisma/client'
import { HTTPError } from 'crosswalk'
import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { prisma } from './prisma'

export const authenticate = (type?: UserType): RequestHandler =>
  async function (req, _res, next) {
    if (!req.cookies.session)
      return next(new HTTPError(401, 'User is not authenticated'))

    if (!req.user) {
      const data = verify(
        req.cookies.session as string,
        process.env.JWT_SECRET ?? 'SUPER_SECRET_BACKUP_SECRET'
      ) as { id: string }

      if (typeof data === 'string')
        return next(new HTTPError(400, 'Bad cookie format'))

      if (!data) return next(new HTTPError(401, 'User is not authenticated'))

      const user = await prisma.user.findUnique({
        where: { id: data.id },

        select: {
          agentProfile: {
            include: {
              agency: true,
            },
          },
          id: true,
          name: true,
          email: true,
          type: true,
        },
      })

      if (!user) return next(new HTTPError(401, 'User is not authenticated'))

      req.user = user
    }

    if (type) {
      const equalOrGreater = {
        USER: ['USER', 'AGENT', 'ADMIN'],
        AGENT: ['AGENT', 'ADMIN'],
        ADMIN: ['ADMIN'],
      }

      if (!equalOrGreater[type].includes(req.user!.type)) {
        return next(
          new HTTPError(403, 'User is not authorized to access this resource')
        )
      }
    }

    return next()
  }
