import { Home } from '@prisma/client'
import { HTTPError } from 'crosswalk'
import { RequestHandler } from 'express'
import { prisma } from './prisma'

export const ensureHomeExists = (): RequestHandler<{ mlsn?: string }> =>
  async function (req, _res, next) {
    if (!req.params.mlsn) return next()

    const count = await prisma.home.count({
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
    if (req.method !== 'post' && req.method !== 'put') return next()

    const count = await prisma.home.count({
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

export const ensureHomeAgent = (
  location: 'path' | 'body' = 'path'
): RequestHandler<{ mlsn: string }, any, { homeMlsn: string }> =>
  async function (req, _res, next) {
    const count = await prisma.home.count({
      where: {
        mlsn: location === 'path' ? req.params.mlsn : req.body.homeMlsn,
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
