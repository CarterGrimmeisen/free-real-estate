import NodeMailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

/* eslint-disable no-console */

const transporter = NodeMailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.EMAIL_USRN,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendEmail = (
  to: string | string[],
  subject: string,
  html: string
) => {
  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USRN,
    to,
    subject,
    html,
  }

  if ((process.env.NODE_ENV ?? 'development') !== 'development') {
    transporter.sendMail(mailOptions, (err, _) => {
      if (err) console.log(err)
      else console.log(`Email sent to ${to}`)
    })
  }
}
