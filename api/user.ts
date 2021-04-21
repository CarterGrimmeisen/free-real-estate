import { hash } from 'bcryptjs'
import { HTTPError, TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { prisma } from './util/prisma'

function register(router: TypedRouter<API>) {
  router.router.use('/user', authenticate())

  router.get('/user', async (_params, req) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user!.id,
      },
      include: {
        agentProfile: {
          include: {
            agency: true,
          },
        },
      },
    })

    return user!
  })

  router.put('/user', async (_params, body, req, res) => {
    if (body.email) {
      const exists = await prisma.user.count({
        where: { email: req.body.email, id: { not: req.user!.id } },
      })

      if (exists)
        throw new HTTPError(
          409,
          `User with email '${req.body.email}' already exists`
        )
    }

    const user = await prisma.user.update({
      where: {
        id: req.user!.id,
      },

      data: {
        name: req.body.name,
        email: req.body.email,
        agentProfile:
          req.user!.type === 'AGENT'
            ? {
                update: {
                  name: req.body.name!,
                  email: req.body.email,
                },
              }
            : undefined,
      },
    })

    if (req.body.password) {
      await prisma.auth.update({
        where: {
          userId: req.user!.id,
        },
        data: {
          password: await hash(req.body.password, 10),
        },
      })

      res.clearCookie('session')
    }

    return user
  })

  router.delete('/user', async (_params, req, res) => {
    res.clearCookie('session')

    await prisma.onDelete({ model: 'User', where: { id: req.user!.id } })
    return prisma.user.delete({
      where: { id: req.user!.id },
    })
  })

  router.get('/user/showings', (_params, req) => {
    return prisma.user
      .findUnique({
        where: {
          id: req.user!.id,
        },
      })
      .showings({
        include: {
          user: true,
          agent: { include: { agency: true } },
          home: true,
        },
      })
  })

  router.get('/user/liked', (_params, { user, query }) => {
    return prisma.home.findMany({
      where: {
        liked: {
          some: {
            id: user!.id,
          },
        },
      },
      include: {
        agent: {
          include: {
            agency: true,
          },
        },
        schools: true,
        files: {
          where: { type: 'IMAGE' },
          take: 1,
        },
      },
      take: query.take ?? 9,
      skip: query.skip ?? 0,
    })
  })
}

export default { register }
