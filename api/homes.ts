import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import {
  ensureHomeAgent,
  ensureHomeExists,
  ensureHomeUnique,
} from './util/homes'
import { prisma } from './util/prisma'

function register(router: TypedRouter<API>) {
  router.get('/homes', (_params, { query }, _res) => {
    return prisma.home.findMany({
      where: {
        price:
          query.priceMax || query.priceMin
            ? {
                gte: query.priceMin,
                lte: query.priceMax,
              }
            : undefined,
        zipcode: query.zipcode,
        agent: query.agent
          ? {
              name: {
                contains: query.agent,
              },
            }
          : undefined,
        schools: query.school
          ? {
              some: {
                name: query.school,
              },
            }
          : undefined,
        sqfootage:
          query.sqFootageMax || query.sqFootageMin
            ? {
                gte: query.sqFootageMin,
                lte: query.sqFootageMax,
              }
            : undefined,
        bedrooms: query.bedrooms,
        bathrooms: query.bathrooms,
      },
      orderBy: query.popular
        ? { liked: { count: 'desc' } }
        : query.trending
        ? { dailyHits: 'desc' }
        : {},
      skip: query.skip,
      take: query.take ?? 20,
      include: {
        agent: { include: { agency: true } },
        schools: true,
        files: {
          take: 1,
          where: {
            type: 'IMAGE',
          },
        },
      },
    })
  })

  router.router.use('/homes/:mlsn', ensureHomeExists())

  router.get('/homes/:mlsn', async ({ mlsn }) => {
    const home = await prisma.home.update({
      where: {
        mlsn,
      },
      data: {
        dailyHits: {
          increment: 1,
        },
      },
      include: {
        agent: { include: { agency: true } },
        schools: true,
      },
    })

    return home!
  })

  router.get('/homes/:mlsn/files', ({ mlsn }, req) => {
    return prisma.home
      .findUnique({
        where: { mlsn },
      })
      .files({ where: { type: req.query.type }, orderBy: { dateAdded: 'asc' } })
  })

  router.router.use('/homes/:mlsn/like', authenticate('USER'))

  router.post('/homes/:mlsn/like', async ({ mlsn }, _body, { user }) => {
    const count = await prisma.home.count({
      where: {
        mlsn,
        liked: {
          some: {
            id: user!.id,
          },
        },
      },
    })

    await prisma.home.update({
      where: { mlsn },
      data: {
        liked: count
          ? {
              disconnect: {
                id: user!.id,
              },
            }
          : {
              connect: {
                id: user!.id,
              },
            },
      },
    })

    return {
      liked: !count,
    }
  })

  router.router.use('/homes', authenticate('AGENT'))

  router.delete('/homes/:mlsn', async ({ mlsn }) => {
    await prisma.onDelete({
      model: 'Home',
      where: { mlsn },
    })

    return prisma.home.delete({
      where: {
        mlsn,
      },
      include: {
        agent: { include: { agency: true } },
        schools: true,
        files: true,
      },
    })
  })

  router.router.use('/homes', ensureHomeUnique())

  router.post('/homes', (_params, home, { user }) => {
    return prisma.home.create({
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
            email: user!.email,
          },
        },

        schools: {
          connectOrCreate: home.schools.map((school) => ({
            where: { name: school.name },
            create: {
              name: school.name,
              type: school.type,
              grades: school.grades,
            },
          })),
        },

        files: home.files
          ? {
              create: home.files.map((file) => ({
                name: file.name,
                type: file.type,
                mime: file.mime,
                contents: file.contents!,
              })),
            }
          : undefined,
      },
      include: {
        agent: { include: { agency: true } },
        schools: true,
      },
    })
  })

  router.router.use('/homes/:mlsn', ensureHomeAgent())

  router.get('/homes/:mlsn/showings', ({ mlsn }) => {
    return prisma.home.findUnique({ where: { mlsn } }).showings({
      include: {
        user: true,
        agent: { include: { agency: true } },
        home: true,
      },
    })
  })

  router.put('/homes/:mlsn', ({ mlsn }, home, { user }) => {
    return prisma.home.update({
      where: {
        mlsn,
      },

      data: {
        street: home.street,
        city: home.city,
        state: home.state,
        zipcode: home.zipcode,

        alarmInfo: home.alarmInfo,
        description: home.description,
        price: home.price,
        sqfootage: home.sqfootage,
        subdivision: home.subdivision,

        bedrooms: home.bedrooms,
        bathrooms: home.bathrooms,

        agent: {
          connect: {
            id: user!.agentProfile!.id,
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
              grades: school.grades,
            },

            update: {
              type: school.type,
            },
          })),
        },
      },
      include: {
        agent: { include: { agency: true } },
        schools: true,
      },
    })
  })
}

export default { register }
