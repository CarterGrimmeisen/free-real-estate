import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { ensureHomeAgent } from './util/homes'
import { prisma } from './util/prisma'

function register(router: TypedRouter<API>) {
  router.router.use('/files', authenticate('AGENT'), ensureHomeAgent('body'))

  router.post('/files', (_params, file) => {
    return prisma.file.create({
      data: {
        type: file.type,
        mime: file.mime,
        contents: file.contents,

        home: {
          connect: {
            mlsn: file.homeMlsn,
          },
        },
      },
    })
  })

  router.delete('/files/:id', ({ id }) => {
    return prisma.file.delete({ where: { id } })
  })
}

export default { register }
