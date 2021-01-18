import bodyParser from 'body-parser'
// import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'
import App from 'express'

import Homes from './homes'

const prisma = new PrismaClient()

const app = App()

app.use((req) => {
  req.prisma = prisma
})

app.use(bodyParser.json())
app.use(Homes)

export default app
