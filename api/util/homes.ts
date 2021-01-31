import { Home } from '@prisma/client'
import { HTTPError } from 'crosswalk'
import { RequestHandler } from 'express'

export const ensureHomeExists = (): RequestHandler<{ mlsn?: string }> =>
  async function (req, _response, next) {
    if (!req.params.mlsn) return next()

    const count = await req.prisma.home.count({
      where: {
        mlsn: req.params.mlsn,
      },
    })

    if (count === 0)
      return next(new HTTPError(404, 'That home count not be found'))

    next()
  }

export const ensureHomeUnique = (): RequestHandler<never, never, Home> =>
  async function (req, _res, next) {
    const count = await req.prisma.home.count({
      where: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
      },
    })

    if (count !== 0)
      return next(new HTTPError(409, 'A home at that address already exists'))

    next()
  }

export const ensureHomeAgent = (): RequestHandler<{ mlsn: string }> =>
  async function (req, _res, next) {
    const count = await req.prisma.home.count({
      where: {
        mlsn: req.params.mlsn,
        agentId: req.user!.agentProfile?.id,
      },
    })

    if (count === 0)
      return next(
        new HTTPError(
          403,
          'You are not authorized to make changes to this property'
        )
      )

    next()
  }