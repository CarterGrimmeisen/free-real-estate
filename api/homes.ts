import { Router } from 'express'

const router = Router()

router.route('/homes').get((_, res) => {
  res.json({ data: 'data' })
})

export default router
