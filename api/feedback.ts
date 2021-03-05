import { TypedRouter } from 'crosswalk'
import API from './api'
import { ensureHomeExists } from './util/homes'
import { ensureShowingExists } from './util/showings'
import { authenticate } from './util/auth'

function register(router: TypedRouter<API>) {
  router.router.use(
    '/showings/home/:mlsn/:userId/feedback',
    authenticate('USER')
  )

  // prettier-ignore
  // Madge
  router.router.use(
    '/showings/home/:mlsn/:userId/feedback',
    ensureHomeExists()
  )

  router.router.use(
    '/showings/home/:mlsn/:userId/feedback',
    ensureShowingExists()
  )

  router.get(
    '/showings/home/:mlsn/:userId/feedback',
    async ({ mlsn, userId }, req, _res) => {
      const feedback = await req.prisma.showing
        .findFirst({
          where: { homeMlsn: mlsn, userId },
        })
        .feedback()

      return feedback
    }
  )

  router.post(
    '/showings/home/:mlsn/:userId/feedback',
    async ({ mlsn, userId }, body, req) => {
      const { id } = (await req.prisma.showing.findFirst({
        where: { homeMlsn: mlsn, userId },
      }))!

      return await req.prisma.feedback.create({
        data: {
          isInterested: body.isInterested,
          experience: body.experience,
          priceOpinion: body.priceOpinion,
          notes: body.notes,
          showing: {
            connect: {
              id,
            },
          },
        },
        include: { showing: true },
      })
    }
  )
}

export default { register }
