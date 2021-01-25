import { Router, RequestHandler } from 'express'
import { hash, compare } from 'bcryptjs'
import createError from 'http-errors'

import { sign, verify } from 'jsonwebtoken'

import { User, UserType } from '@prisma/client'

const router = Router()

export const authenticate = (type?: UserType): RequestHandler => async (
  req,
  _,
  next
) => {
  if (!req.cookies.userId)
    return next(createError(401, 'User is not authenticated'))

  const data = verify(
    req.cookies.userId as string,
    process.env.JWT_SECRET ?? 'SUPER_SECRET_BACKUP_SECRET'
  ) as { id: string }

  if (typeof data === 'string')
    return next(createError(400, 'Bad cookie format'))

  if (!data) next(createError(401, 'User is not authenticated'))

  const user = await req.prisma.user.findUnique({
    where: { id: data.id },

    select: {
      id: true,
      name: true,
      email: true,
      type: true,
    },
  })

  if (!user) return next(createError(401, 'User is not authenticated'))

  req.user = user

  if (type) {
    const equalOrGreater = {
      USER: ['USER', 'AGENT', 'ADMIN'],
      AGENT: ['AGENT', 'ADMIN'],
      ADMIN: ['ADMIN'],
    }

    if (!equalOrGreater[type].includes(req.user.type)) {
      return next(
        createError(403, 'User is not authorized to access this resource')
      )
    }
  }

  next()
}

const verifyPassword = (user: User, password: string) => {
  return compare(password, user.password)
}

router.post<never, { success: true }, { email: string; password: string }>(
  '/login',
  async (req, res, next) => {
    const user = await req.prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (!user)
      return next(createError(401, 'Email/Password combination is incorrect'))
    if (!(await verifyPassword(user, req.body.password)))
      return next(createError(401, 'Email/Password combination is incorrect'))

    res
      .status(200)
      .cookie(
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
      .json({ success: true })
  }
)

router.post<never, Omit<User, 'password'>, Omit<User, 'id' | 'type'>>(
  '/register',
  async (req, res, next) => {
    const exists = await req.prisma.user.count({
      where: {
        email: req.body.email,
      },
    })

    if (exists) {
      next(
        createError(409, `User with email '${req.body.email}' already exists`)
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await req.prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hash(req.body.password, 10),
        type: 'USER',
      },

      select: {
        id: true,
        name: true,
        email: true,
        type: true,
      },
    })

    return res.json(user)
  }
)

router.post('/logout', (_, res) =>
  res.clearCookie('userId').json({ success: true })
)

if (process.env.NODE_ENV !== 'production') {
  router.get('/users', async (req, res) =>
    res.json(await req.prisma.user.findMany())
  )

  router.get('/auth/userTest', authenticate(), (_, res) =>
    res.json({ working: true })
  )

  router.get('/auth/agentTest', authenticate('AGENT'), (_, res) =>
    res.json({ working: true })
  )

  router.get('/auth/adminTest', authenticate('ADMIN'), (_, res) =>
    res.json({ working: true })
  )
}

export default router
