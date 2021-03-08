import { TypedRouter } from 'crosswalk'
import API from './api'
import { ensureHomeExists } from './util/homes'
import { ensureShowingExistsAndParticipating } from './util/showings'
import { authenticate } from './util/auth'
import { prisma } from './util/prisma'

function register(router: TypedRouter<API>) {
  router.router.use('/showings/:id/feedback', authenticate('USER'))

  router.router.use('/showings/:id/feedback', ensureHomeExists())

  router.router.use(
    '/showings/:id/feedback',
    ensureShowingExistsAndParticipating()
  )

  router.get('/showings/:id/feedback', async ({ id }) => {
    const feedback = await prisma.showing
      .findFirst({
        where: { id },
      })
      .feedback()

    return feedback
  })

  router.post('/showings/:id/feedback', async ({ id }, body) => {
    const { id: showingId } = (await prisma.showing.findFirst({
      where: { id },
    }))!

    return await prisma.feedback.create({
      data: {
        isInterested: body.isInterested,
        experience: body.experience,
        priceOpinion: body.priceOpinion,
        notes: body.notes,
        showing: {
          connect: {
            id: showingId,
          },
        },
      },
      include: { showing: true },
    })
  })
}

export default { register }
