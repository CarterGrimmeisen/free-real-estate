import { Home } from '@prisma/client'
import { HTTPError } from 'crosswalk'
import { RequestHandler } from 'express'

export const ensureHomeExists = (): RequestHandler<{ mlsn?: string }> =>
  async function (req, _res, next) {
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

export const ensureShowingExists = (): RequestHandler<{
  mlsn: string
  id?: string
}> =>
  async function (req, _res, next) {
    if (!req.params.id) return next()

    const count = await req.prisma.showing.count({
      where: { id: req.params.id },
    })

    if (count === 0)
      return next(new HTTPError(404, 'A showing with that ID does not exist'))

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
