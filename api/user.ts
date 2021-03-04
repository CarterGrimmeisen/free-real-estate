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

      res.clearCookie('userId')
    }

    return user
  })

  router.delete('/user', (_params, req, res) => {
    res.clearCookie('userId')

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
          agent: true,
          home: true,
        },
      })
  })
}

export default { register }
