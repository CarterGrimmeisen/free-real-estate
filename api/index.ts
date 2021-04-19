import Express from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'

import { apiSpecToOpenApi, TypedRouter } from 'crosswalk'

import APIJsonSchema from './schema.json'
import API from './api'

import Auth from './auth'
import User from './user'
import Homes from './homes'
import Files from './files'
import Showings from './showings'
import Feedback from './feedback'

import { authenticate } from './util/auth'
import { prisma } from './util/prisma'

const app = Express()

app.use(json({ limit: '3mb' }))
app.use(cookieParser())

const api = new TypedRouter<API>(app, APIJsonSchema)

User.register(api)
Auth.register(api)
Homes.register(api)
Files.register(api)
Showings.register(api)
Feedback.register(api)

api.assertAllRoutesRegistered()

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
  app.get('/users', async (_, res) => res.json(await prisma.user.findMany()))

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
