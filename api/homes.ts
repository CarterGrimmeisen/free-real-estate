import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import {
  ensureHomeAgent,
  ensureHomeExists,
  ensureHomeUnique,
} from './util/homes'

function register(router: TypedRouter<API>) {
  router.get('/homes', (_params, req) => {
    return req.prisma.home.findMany()
  })

  router.router.use('/homes', ensureHomeExists())

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
    })

    return home!
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
