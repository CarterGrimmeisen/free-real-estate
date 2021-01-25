import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { Router } from 'express'
import createError from 'http-errors'

import { authenticate } from './auth'

const router = Router()

router.use(authenticate())

router.get<never, Omit<User, 'password'>>('/', async (req, res) => {
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

  return res.json(user!)
})

router.put<never, Omit<User, 'password'>, Partial<User>>(
  '/',
  async (req, res, next) => {
    if (req.body.email) {
      const exists = await req.prisma.user.count({
        where: { email: req.body.email, id: { not: req.user!.id } },
      })

      if (exists)
        return next(
          createError(409, `User with email '${req.body.email}' already exists`)
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

    return res.json(user)
  }
)

router.delete('/', async (req, res) => {
  const user = await req.prisma.user.delete({
    where: { id: req.user!.id },
    select: {
      id: true,
      name: true,
      email: true,
      type: true,
    },
  })

  return res.clearCookie('userId').json(user)
})

export default router
