/* eslint-disable no-console */

import Prisma from '@prisma/client'
import NodeMailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const prisma = new Prisma.PrismaClient()

const transporter = NodeMailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.EMAIL_USRN,
    pass: process.env.EMAIL_PASS,
  },
})

const agents = await prisma.agent.findMany({
  include: {
    homes: true,
  },
})

console.log(agents)

for (const agent of agents) {
  let html: string = ''
  let totalHits: number = 0

  for (const house of agent.homes) {
    html += `<h1>${house.street} in ${house.city}, ${house.state} ${house.zipcode}</h1><br />Got <strong>${house.dailyHits}</strong> hits!<br />`
    totalHits += house.dailyHits

    await prisma.home.update({
      where: {
        mlsn: house.mlsn,
      },
      data: {
        dailyHits: 0,
      },
    })
  }

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USRN,
    to: agent.email,
    subject: `You got ${totalHits} hits today!`,
    html,
  }

  console.log(JSON.stringify(mailOptions))

  transporter.sendMail(mailOptions, (err, _) => {
    if (err) console.log(err)
    else console.log(`Email sent to ${agent.email}`)
  })
}

process.exit(0)
