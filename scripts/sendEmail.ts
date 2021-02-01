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

const agents = await prisma.agent.findMany()

for (const agent of agents) {
  for (const house of agent.homes) {
    console.log(house)
  }

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USRN,
    to: agent.email,
    subject: 'You got 4 hits today!',
    html: 'can i use <em>html</em> perhaps?',
  }

  transporter.sendMail(mailOptions, (err, _) => {
    if (err) console.log(err)
    else console.log(`Email sent to ${agent.email}`)
  })
}
