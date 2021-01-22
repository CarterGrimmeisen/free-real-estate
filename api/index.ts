import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { PrismaClient } from '@prisma/client'

import Homes from './homes'
import Auth /*, { authenticate } */ from './auth'
import User from './user'

const prisma = new PrismaClient()

const app = Express()

app.use((req, _, next) => {
  req.prisma = prisma
  next()
})

app.use(bodyParser.json())
app.use(cookieParser())
app.use('/auth', Auth)
app.use('/homes', Homes)
app.use('/user', User)

export default app
