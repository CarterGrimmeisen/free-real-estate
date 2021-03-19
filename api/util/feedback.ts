import { RequestHandler } from 'express'
import { HTTPError } from 'crosswalk'
import { prisma } from './prisma'

export const ensureFeedbackExists = (): RequestHandler<{
  id: string
}> =>
  async function (req, _res, next) {
    const count = await prisma.feedback.count({ where: { id: req.params.id } })

    if (!count)
      return next(new HTTPError(404, 'Feedback not found for that resource'))

    next()
  }
