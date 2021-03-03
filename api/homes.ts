import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import {
  ensureHomeAgent,
  ensureHomeExists,
  ensureHomeUnique,
} from './util/homes'

function register(router: TypedRouter<API>) {
  router.get('/homes', (_params, req, _res) => {
    return req.prisma.home.findMany({
      where: {
        price: {
          gte: req.query.priceMin,
          lte: req.query.priceMax,
        },
        zipcode: req.query.zipcode,
        agentId: req.query.agent,
        schools: {
          some: {
            name: req.query.school,
          },
        },
        sqfootage: {
          gte: req.query.sqFootageMin,
          lte: req.query.sqFootageMax,
        },
        bedrooms: req.query.bedrooms,
        bathrooms: req.query.bathrooms,
      },
      orderBy: req.query.popular
        ? { likeCount: 'desc' }
        : req.query.trending
        ? { dailyHits: 'desc' }
        : {},
      skip: req.query.skip,
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

  router.router.use('/homes', authenticate('AGENT'))

  router.delete('/homes/:mlsn', ({ mlsn }, req) => {
    return req.prisma.home.delete({
      where: {
        mlsn,
      },
    })
  })

  router.router.use('/homes', ensureHomeUnique())

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

  router.get('/homes/:mlsn/showings', ({ mlsn }, req) => {
    return req.prisma.home
      .findUnique({ where: { mlsn } })
      .showings({ include: { user: true, agent: true, home: true } })
  })

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
}

export default { register }
