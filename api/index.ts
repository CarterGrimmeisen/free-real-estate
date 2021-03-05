import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'

import { apiSpecToOpenApi, TypedRouter } from 'crosswalk'
import { PrismaClient } from '@prisma/client'

import APIJsonSchema from './schema.json'
import API from './api'

import Auth from './auth'
import User from './user'
import Homes from './homes'
import Showings from './showings'
import Feedback from './feedback'

import { authenticate } from './util/auth'

const prisma = new PrismaClient()

const app = Express()

app.use((req, _, next) => {
  req.prisma = prisma
  next()
})

app.use(bodyParser.json())
app.use(cookieParser())

const api = new TypedRouter<API>(app, APIJsonSchema)

User.register(api)
Auth.register(api)
Homes.register(api)
Showings.register(api)
Feedback.register(api)

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(
    apiSpecToOpenApi(APIJsonSchema, {
      basePath: '/api',
      info: {
        title: 'Free Real Estate',
        description:
          'Backend API powering the latest and greatest in real estate',
        version: '0.1',
      },
    })
  )
)

if (process.env.NODE_ENV !== 'production') {
  app.get('/users', async (req, res) =>
    res.json(await req.prisma.user.findMany())
  )

  app.get('/auth/userTest', authenticate(), (_, res) =>
    res.json({ working: true })
  )

  app.get('/auth/agentTest', authenticate('AGENT'), (_, res) =>
    res.json({ working: true })
  )

  app.get('/auth/adminTest', authenticate('ADMIN'), (_, res) =>
    res.json({ working: true })
  )
}

export default app
