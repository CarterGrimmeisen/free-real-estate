import { HTTPError, TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { prisma } from './util/prisma'
import { ensureShowingExistsAndParticipating } from './util/showings'

function register(router: TypedRouter<API>) {
  router.router.use('/showings', authenticate())

  router.post('/showings', async (_params, body, { user }) => {
    const home = await prisma.home.findUnique({
      where: { mlsn: body.homeMlsn },
    })

    if (!home) throw new HTTPError(400, 'The specified home does not exist')

    return prisma.showing.create({
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
            id: user!.id,
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
  router.get('/showings/:id', async ({ id }) => {
    const showing = await prisma.showing.findUnique({
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

  router.delete('/showings/:id', async ({ id }) => {
    await prisma.onDelete({ model: 'Showing', where: { id } })
    return prisma.showing.delete({
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
  router.put('/showings/:id', ({ id }, { confirmed }) => {
    return prisma.showing.update({
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
