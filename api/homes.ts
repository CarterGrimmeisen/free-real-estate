import { Home } from '@prisma/client'
import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import {
  ensureHomeAgent,
  ensureHomeExists,
  ensureHomeUnique,
} from './util/homes'

function register(router: TypedRouter<API>) {
  router.get('/homes', (_params, req) => {
    return req.prisma.home.findMany()
  })

  router.router.use('/homes', authenticate('AGENT'), ensureHomeExists())

  router.get('/homes/:id', async ({ id }, req) => {
    const home = await req.prisma.home.findUnique({
      where: {
        id,
      },
    })

    return home!
  })

  router.router.use('/homes', ensureHomeUnique())

  router.post('/homes', () => Promise.resolve({} as Home))

  router.router.use('/homes', ensureHomeAgent())

  router.put('/homes/:id', () => Promise.resolve({} as Home))

  router.delete('/homes/:id', () => Promise.resolve({} as Home))
}

export default { register }
