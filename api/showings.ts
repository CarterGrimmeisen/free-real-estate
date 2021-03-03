import { HTTPError, TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { ensureShowingExistsAndParticipating } from './util/showings'

function register(router: TypedRouter<API>) {
  router.router.use('/showings', authenticate())

  router.post('/showings', async (_params, body, req) => {
    const home = await req.prisma.home.findUnique({
      where: { mlsn: body.homeMlsn },
    })

    if (!home) throw new HTTPError(400, 'The specified home does not exist')

    return req.prisma.showing.create({
      data: {
        date: body.date,
        agent: {
          connect: {
            id: home.agentId,
          },
        },
        home: {
          connect: {
            mlsn: body.homeMlsn,
          },
        },
        user: {
          connect: {
            id: req.user!.id,
          },
        },
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })
  })

  router.router.use('/showings/:id', ensureShowingExistsAndParticipating())
  router.get('/showings/:id', async ({ id }, req) => {
    const showing = await req.prisma.showing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })

    return showing!
  })

  router.delete('/showings/:id', ({ id }, req) => {
    return req.prisma.showing.delete({
      where: {
        id,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })
  })

  router.router.use(authenticate('AGENT'))
  router.put('/showings/:id', ({ id }, { confirmed }, req) => {
    return req.prisma.showing.update({
      where: {
        id,
      },
      data: {
        confirmed,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })
  })
}

export default { register }
