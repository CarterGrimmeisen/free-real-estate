import { HTTPError } from 'crosswalk'
import { RequestHandler } from 'express'
import { prisma } from './prisma'

export const ensureShowingExists = (): RequestHandler<{
  mlsn: string
  userId?: string
}> =>
  async function (req, _res, next) {
    const count = await prisma.showing.count({
      where: {
        homeMlsn: req.params.mlsn,
        OR: [
          {
            userId: req.params.userId,
            agentId: req.user!.agentProfile?.id,
          },
          {
            agentId: req.user!.agentProfile?.id,
          },
          {
            userId: req.user!.id,
          },
        ],
      },
    })

    if (count === 0)
      return next(
        new HTTPError(
          403,
          'You are not authorized to view/change this resource.'
        )
      )

    next()
  }
