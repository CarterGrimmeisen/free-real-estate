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

  // if ((process.env.NODE_ENV ?? 'development') !== 'development') {
  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, _) => {
      if (err) return reject(err)
      console.log(`Email sent to ${to}`)
      return resolve()
    })
  })
  // }
}
