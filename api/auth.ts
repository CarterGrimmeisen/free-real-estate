import { Auth, User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { HTTPError, TypedRouter } from 'crosswalk'
import { sign } from 'jsonwebtoken'
import API from './api'
import { authenticate } from './util/auth'
import { prisma } from './util/prisma'

const verifyPassword = (
  user: User & { auth: Auth | null },
  password: string
) => {
  return compare(password, user.auth!.password)
}

function register(router: TypedRouter<API>) {
  router.post('/auth/login', async (_params, body, _, res) => {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      include: {
        auth: true,
        agentProfile: {
          include: {
            agency: true,
          },
        },
      },
    })

    if (!user)
      throw new HTTPError(401, 'Email/Password combination is incorrect')
    if (!(await verifyPassword(user, body.password)))
      throw new HTTPError(401, 'Email/Password combination is incorrect')

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
      agentProfile: user.agentProfile,
    }

    res.cookie(
      'session',
      sign(payload, process.env.JWT_SECRET ?? 'SUPER_SECRET_BACKUP_SECRET'),
      {
        maxAge: 1209600,
      }
    )

    return { success: true }
  })

  router.post('/auth/register', async (_params, body) => {
    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        auth: {
          create: {
            password: await hash(body.password, 10),
          },
        },
        type: 'USER',
      },
    })

    return { success: true }
  })

  router.post('/auth/logout', (_params, _body, _req, res) => {
    res.clearCookie('session')

    return Promise.resolve({ success: true as const })
  })

  router.router.use('/auth/check', authenticate())
  router.get('/auth/check', () => {
    return Promise.resolve({ success: true as const })
  })
}

export default { register }
