import { TypedRouter } from 'crosswalk'
import * as z from 'zod'
import API from './api'
import { authenticate } from './util/auth'
import {
  ensureHomeAgent,
  ensureHomeExists,
  ensureHomeUnique,
} from './util/homes'

const numericString = (input = z.string()) =>
  input.transform((arg) => parseInt(arg))
const booleanString = (input = z.string()) =>
  input.transform((arg) => arg !== undefined)

const QuerySchema = z.object({
  skip: numericString(),
  priceMin: numericString(),
  priceMax: numericString(),
  zipcode: numericString(z.string().max(6)),
  agent: z.string(),
  school: z.string(),
  sqFootageMin: numericString(),
  sqFootageMax: numericString(),
  bedrooms: numericString(),
  bathrooms: numericString(),
  trending: booleanString(),
  popular: booleanString(),
})

function register(router: TypedRouter<API>) {
  router.get('/homes', (_params, req) => {
    const query = QuerySchema.partial().parse(req.query)

    return req.prisma.home.findMany({
      where: {
        price: {
          gte: query.priceMin,
          lte: query.priceMax,
        },
        zipcode: query.zipcode,
        agentId: query.agent,
        schools: {
          some: {
            name: query.school,
          },
        },
        sqfootage: {
          gte: query.sqFootageMin,
          lte: query.sqFootageMax,
        },
        bedrooms: query.bedrooms,
        bathrooms: query.bathrooms,
      },
      orderBy: query.popular
        ? { likeCount: 'desc' }
        : query.trending
        ? { dailyHits: 'desc' }
        : {},
      skip: query.skip,
      take: 20,
      include: {
        agent: true,
      },
    })
  })

  router.router.use('/homes/:mlsn', ensureHomeExists())

  router.get('/homes/:mlsn', async ({ mlsn }, req) => {
    const home = await req.prisma.home.update({
      where: {
        mlsn,
      },
      data: {
        dailyHits: {
          increment: 1,
        },
      },
      include: {
        agent: true,
      },
    })

    return home!
  })

  router.router.use('/homes/:mlsn/like', authenticate('USER'))

  router.post('/homes/:mlsn/like', async ({ mlsn }, _body, req) => {
    const count = await req.prisma.home.count({
      where: {
        mlsn,
        liked: {
          some: {
            id: req.user!.id,
          },
        },
      },
    })

    await req.prisma.home.update({
      where: { mlsn },
      data: {
        likeCount: count ? { decrement: 1 } : { increment: 1 },
        liked: count
          ? {
              disconnect: {
                id: req.user!.id,
              },
            }
          : {
              connect: {
                id: req.user!.id,
              },
            },
      },
    })

    return {
      liked: !count,
    }
  })

  router.router.use('/homes', authenticate('AGENT'), ensureHomeUnique())

  router.post('/homes', (_params, home, req) => {
    return req.prisma.home.create({
      data: {
        mlsn: home.mlsn,
        alarmInfo: home.alarmInfo,
        city: home.city,
        description: home.description,
        price: home.price,
        sqfootage: home.sqfootage,
        state: home.state,
        street: home.street,
        zipcode: home.zipcode,
        subdivision: home.subdivision,
        bedrooms: home.bedrooms,
        bathrooms: home.bathrooms,

        agent: {
          connect: {
            email: req.user?.email,
          },
        },

        schools: {
          connectOrCreate: home.schools.map((school) => ({
            where: { name: school.name },
            create: { name: school.name, type: school.type },
          })),
        },
      },
    })
  })

  router.router.use('/homes', ensureHomeAgent())

  router.put('/homes/:mlsn', ({ mlsn }, home, req) => {
    return req.prisma.home.update({
      where: {
        mlsn,
      },

      data: {
        alarmInfo: home.alarmInfo,
        description: home.description,
        price: home.price,
        sqfootage: home.sqfootage,
        subdivision: home.subdivision,

        agent: {
          connect: {
            id: home.agentId,
          },
        },

        schools: {
          upsert: home.schools?.map((school) => ({
            where: {
              name: school.name,
            },

            create: {
              name: school.name,
              type: school.type,
            },

            update: {
              type: school.type,
            },
          })),
        },
      },
    })
  })

  router.delete('/homes/:mlsn', ({ mlsn }, req) => {
    return req.prisma.home.delete({
      where: {
        mlsn,
      },
    })
  })
}

export default { register }
