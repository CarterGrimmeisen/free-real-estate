#!/usr/bin/env node

/* eslint-disable no-console */
import enquirer from 'enquirer'
import Prisma from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new Prisma.PrismaClient()

const { name, email, password, type } = await enquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: "👤 What is your new user's name?",
  },
  {
    type: 'input',
    name: 'email',
    message: "📧 What is your new user's email address?",
  },
  {
    type: 'password',
    name: 'password',
    message: "🔒 What is your new user's password?",
  },
  {
    type: 'select',
    name: 'type',
    message: "🔑 What is your new user's type?",
    initial: 0,
    choices: [
      { name: 'USER', message: 'User' },
      { name: 'AGENT', message: 'Agent' },
      { name: 'ADMIN', message: 'Admin' },
    ],
  },
])

const exists = await prisma.user.count({
  where: {
    email,
  },
})

if (exists) {
  console.error(
    `❗ User with email '${email}' already exists, please choose a different one and try again.`
  )
  process.exit(1)
}

let user
try {
  user = await prisma.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      type,
    },
  })
} catch (e) {
  console.error(e)
  console.error(
    `❗ User could not be created, check the error message present above and try again`
  )
}

if (user) {
  console.log(
    `✔️ User successfully created with email '${email}' and password '${password}'`
  )
} else {
  console.error(
    `❗ User could not be created, check the error message present above and try again`
  )
}

process.exit(0)
