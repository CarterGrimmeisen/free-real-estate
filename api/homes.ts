import { Router } from 'express'
import createError from 'http-errors'
import { authenticate } from './auth'

const router = Router()

router.get('/', async (req, res) => {
  const homes = await req.prisma.home.findMany()

  return res.json(homes)
})

router.get<{ id: string }>('/homes/:id', async (req, res, next) => {
  const home = await req.prisma.home.findUnique({
    where: {
      id: req.params.id,
    },

    include: {
      listAgent: true,
      showAgent: true,
      rooms: true,
    },
  })

  if (!home) return next(createError(404, 'Could not find house specified'))

  return res.json(home)
})

router.use(authenticate('AGENT'))

router.post('/')
router.put('/:id')
router.delete('/:id')

export default router
