import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { ensureHomeExists } from './util/homes'
import { prisma } from './util/prisma'
import { ensureShowingExists } from './util/showings'

function register(router: TypedRouter<API>) {
  router.router.use('/showings', authenticate())

  router.get('/showings/user', (_params, req) => {
    return prisma.showing.findMany({
      where: {
        userId: req.user!.id,
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        agent: true,
        home: true,
        user: true,
      },
    })
  })

  router.router.use('/showings/home/:mlsn', ensureHomeExists())

  router.post('/showings/home/:mlsn', async ({ mlsn }, { date }, req) => {
    const agent = await prisma.home
      .findUnique({
        where: {
          mlsn,
        },
      })
      .agent()

    return await prisma.showing.create({
      data: {
        date,
        confirmed: null,
        home: {
          connect: {
            mlsn,
          },
        },
        agent: {
          connect: {
            id: agent!.id,
          },
        },
        user: {
          connect: {
            id: req.user!.id,
          },
        },
      },
      include: {
        agent: true,
        home: true,
        user: true,
      },
    })
  })

  router.router.use('/showings/home/:mlsn', ensureShowingExists())

  router.delete('/showings/home/:mlsn', async ({ mlsn }, req) => {
    const showing = await prisma.showing.findFirst({
      where: {
        homeMlsn: mlsn,
        OR: [
          {
            userId: req.user!.id,
          },
          {
            agentId: req.user!.agentProfile?.id,
          },
        ],
      },
    })

    return prisma.showing.delete({
      where: {
        id: showing!.id,
      },
      include: {
        agent: true,
        home: true,
        user: true,
      },
    })
  })

  router.router.use('/showings/home/:mlsn', authenticate('AGENT'))

  router.get('/showings/home/:mlsn', ({ mlsn }) => {
    return prisma.showing.findMany({
      where: {
        homeMlsn: mlsn,
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        agent: true,
        home: true,
        user: true,
      },
    })
  })

  router.put(
    '/showings/home/:mlsn/:userId',
    async ({ mlsn, userId }, { confirmed }) => {
      const showing = await prisma.showing.findFirst({
        where: { homeMlsn: mlsn, userId },
      })

      return prisma.showing.update({
        where: { id: showing!.id },
        data: { confirmed },
        include: {
          agent: true,
          home: true,
          user: true,
        },
      })
    }
  )
}

export default { register }
