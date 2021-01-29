import { hash } from 'bcryptjs'
import { HTTPError, TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'

function register(router: TypedRouter<API>) {
  router.router.use('/user', authenticate())

  router.get('/user', async (_params, req) => {
    const user = await req.prisma.user.findUnique({
      where: {
        id: req.user!.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        type: true,
      },
    })

    return user!
  })

  router.put('/user', async (_params, body, req, res) => {
    if (body.email) {
      const exists = await req.prisma.user.count({
        where: { email: req.body.email, id: { not: req.user!.id } },
      })

      if (exists)
        throw new HTTPError(
          409,
          `User with email '${req.body.email}' already exists`
        )
    }

    const user = await req.prisma.user.update({
      where: {
        id: req.user!.id,
      },

      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
          ? await hash(req.body.password, 10)
          : undefined,
      },

      select: {
        id: true,
        name: true,
        email: true,
        type: true,
      },
    })

    if (req.body.password) res.clearCookie('userId')

    return user
  })

  router.delete('/user', (_params, req, res) => {
    res.clearCookie('userId')

    return req.prisma.user.delete({
      where: { id: req.user!.id },

      select: {
        id: true,
        name: true,
        email: true,
        type: true,
      },
    })
  })
}

export default { register }
