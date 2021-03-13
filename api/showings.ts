import { HTTPError, TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { prisma } from './util/prisma'
import { ensureShowingExistsAndParticipating } from './util/showings'
import { sendEmail } from './util/sendEmail'

function register(router: TypedRouter<API>) {
  router.router.use('/showings', authenticate())

  router.post('/showings', async (_params, body, { user }) => {
    const home = await prisma.home.findUnique({
      where: { mlsn: body.homeMlsn },
      include: { agent: true },
    })

    if (!home) throw new HTTPError(400, 'The specified home does not exist')

    const createdShowing = await prisma.showing.create({
      data: {
        date: body.date,
        agent: {
          connect: {
            id: home.agentId,
          },
        },
        home: {
          connect: {
            mlsn: body.homeMlsn,
          },
        },
        user: {
          connect: {
            id: user!.id,
          },
        },
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })

    let recipients: string[]

    if (user) recipients = [/* home.agent.email, */ user.email]
    else recipients = [] // home.agent.email

    const date = new Date(body.date)

    sendEmail(
      recipients,
      'Showing Scheduled',
      `<h1>You have a new showing scheduled!</h1><br /><h2>For ${
        home.street
      } in ${home.city}, ${home.state} ${
        home.zipcode
      }</h2><br/><h2>At ${date.toTimeString()} on ${date.toDateString()}</h2><br/>`
    )

    return createdShowing
  })

  router.router.use('/showings/:id', ensureShowingExistsAndParticipating())
  router.get('/showings/:id', async ({ id }) => {
    const showing = await prisma.showing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })

    return showing!
  })

  router.delete('/showings/:id', async ({ id }) => {
    await prisma.onDelete({ model: 'Showing', where: { id } })
    return prisma.showing.delete({
      where: {
        id,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })
  })

  router.router.use(authenticate('AGENT'))
  router.put('/showings/:id', ({ id }, { confirmed }) => {
    return prisma.showing.update({
      where: {
        id,
      },
      data: {
        confirmed,
      },
      include: {
        user: true,
        agent: true,
        home: true,
      },
    })
  })
}

export default { register }
