import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { ensureHomeExists } from './util/homes'
import { ensureShowingExists } from './util/showings'

function register(router: TypedRouter<API>) {
  router.router.use('/showings', authenticate())

  router.get('/showings/user', (_params, req) => {
    return req.prisma.user
      .findUnique({
        where: {
          id: req.user!.id,
        },
      })
      .showings({
        include: {
          agent: true,
          home: true,
          user: true,
        },
      })
  })

  router.router.use('/showings/home/:mlsn', ensureHomeExists())

  router.post('/showings/home/:mlsn', async ({ mlsn }, { date }, req) => {
    const agent = await req.prisma.home
      .findUnique({
        where: {
          mlsn,
        },
      })
      .agent()

    return await req.prisma.showing.create({
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
    const showing = await req.prisma.showing.findFirst({
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

    return req.prisma.showing.delete({
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

  router.get('/showings/home/:mlsn', ({ mlsn }, req) => {
    return req.prisma.home
      .findUnique({
        where: {
          mlsn,
        },
      })
      .showings({
        include: {
          agent: true,
          home: true,
          user: true,
        },
      })
  })

  router.put(
    '/showings/home/:mlsn/:userId',
    async ({ mlsn, userId }, { confirmed }, req) => {
      const showing = await req.prisma.showing.findFirst({
        where: { homeMlsn: mlsn, userId },
      })

      return req.prisma.showing.update({
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
