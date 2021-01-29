import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { HTTPError, TypedRouter } from 'crosswalk'
import { sign } from 'jsonwebtoken'
import API from './api'

const verifyPassword = (user: User, password: string) => {
  return compare(password, user.password)
}

function register(router: TypedRouter<API>) {
  router.post('/auth/login', async (_params, body, req, res) => {
    const user = await req.prisma.user.findUnique({
      where: {
        email: body.email,
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

  router.post('/auth/register', async (_params, body, req) => {
    return req.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await hash(body.password, 10),
        type: 'USER',
      },

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
