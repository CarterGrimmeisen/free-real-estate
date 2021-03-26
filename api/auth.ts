import { Auth, User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { HTTPError, TypedRouter } from 'crosswalk'
import { sign } from 'jsonwebtoken'
import API from './api'
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
      },
    })

    if (!user)
      throw new HTTPError(401, 'Email/Password combination is incorrect')
    if (!(await verifyPassword(user, body.password)))
      throw new HTTPError(401, 'Email/Password combination is incorrect')

    res.cookie(
      'userId',
      sign(
        { id: user.id },
        process.env.JWT_SECRET ?? 'SUPER_SECRET_BACKUP_SECRET'
      ),
      {
        maxAge: 1209600,
        httpOnly: true,
      }
    )

    return { success: true }
  })

  router.post('/auth/register', async (_params, body) => {
    return prisma.user.create({
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
  })

  router.post('/auth/logout', (_params, _body, _req, res) => {
    res.clearCookie('userId')

    return Promise.resolve({
      success: true,
    })
  })
}

export default { register }
