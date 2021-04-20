import { join } from 'path'
import { TypedRouter } from 'crosswalk'
import API from './api'
import { authenticate } from './util/auth'
import { ensureHomeAgent } from './util/homes'
import { prisma } from './util/prisma'

function register(router: TypedRouter<API>) {
  router.router.use('/files', authenticate('AGENT'), ensureHomeAgent('body'))

  // TODO Finish implementing pdf generation
  router.post('/files', (_params, file) => {
    return prisma.file.create({
      data: {
        name: file.name!,
        type: file.type,
        mime: file.mime!,
        contents: file.contents!,

        home: {
          connect: {
            mlsn: file.homeMlsn,
          },
        },
      },
    })
  })

  router.router.post('/files/gen', async (req, res) => {
    const { write }: typeof import('pdf-fill-form') = require('pdf-fill-form')
    const { mlsn } = req.body
    const { type } = req.query

    const home = (await prisma.home.findUnique({
      where: { mlsn },
      include: { agent: { include: { agency: true } } },
    }))!

    const { agent } = home!
    const { agency } = agent

    const d = new Date()
    const date = d.toLocaleDateString('en-US')

    const fmt = (num: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(num)

    let result: Buffer
    if (type === 'ClosingDisclosure') {
      result = await write(
        join(__dirname, 'documents/ClosingDisclosure.pdf'),
        {
          Text103: date,
          Text104: date,
          Text105: date,
          Text106: agent.name,
          Text107: home.mlsn,
          Text108: `${home.street} ${home.city}, ${home.state} ${home.zipcode}`,
          Text109: fmt(home.price),
          Text7: fmt(home.price),
          Text97: fmt(0),
          'Text96.19': fmt(home.price),
          'Check Box114': true,
          Text102: fmt(home.price * 0.2),

          Text89: agency.name,
          Text90: agency.address,
          Text92: agent.name,
          Text94: agent.email,
          Text95: agent.phone,
        },
        {
          save: 'pdf',
          cores: 4,
          scale: 0.2,
          antialias: true,
        }
      )
    } else if (type === 'PurchaseAgreement') {
      result = await write(
        join(__dirname, 'documents/PurchaseAgreement.pdf'),
        {
          'I The Parties This Real Estate Purchase Agreement Agreement made on': `${d.toLocaleDateString(
            'en-US',
            { month: 'long' }
          )} ${d.getDate()}`,
          20: d.getFullYear() % 100,
          'Seller with a mailing address of': home.street,
          'City of_2': home.city,
          'State of_2': home.state,
          'Street Address': `${home.street} ${home.city}, ${home.state} ${home.zipcode}`,
          undefined_5: fmt(home.price).slice(1),
          undefined_6: home.price.toString(),
        },
        {
          save: 'pdf',
          cores: 4,
          scale: 0.2,
          antialias: true,
        }
      )
    } else if (type === 'RepairRequest') {
      result = await write(
        join(__dirname, 'documents/RepairRequest.pdf'),
        {
          'For the Purchase and Sale Agreement dated': d.toDateString(),
          'For the Property located at': `${home.street} ${home.city}, ${home.state} ${home.zipcode}`,
          Page: 1,
          of: 1,
        },
        {
          save: 'pdf',
          cores: 4,
          scale: 0.2,
          antialias: true,
        }
      )
    } else {
      result = Buffer.from('')
    }

    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename=' + type + '.pdf',
      'Content-Type': 'text/plain',
      'Content-Length': result.length,
    })

    res.end(result)
  })

  router.router.get('/files/:id', async (req, res) => {
    const { id } = req.params
    const file = await prisma.file.findUnique({ where: { id } })
    const fileContents = Buffer.from(file!.contents, 'base64')

    res.writeHead(200, {
      'Content-Disposition': 'attachment; filename=' + file!.name,
      'Content-Type': 'text/plain',
      'Content-Length': fileContents.length,
    })

    res.end(fileContents)
  })

  router.delete('/files/:id', ({ id }) => {
    return prisma.file.delete({ where: { id } })
  })
}

export default { register }
