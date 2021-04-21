/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'
import { sendEmail } from '../api/util/sendEmail'

async function main() {
  const prisma = new PrismaClient()

  const agents = await prisma.agent.findMany({
    include: {
      homes: true,
    },
  })

  console.log(agents)

  for (const agent of agents) {
    let html: string = ''
    let totalHits: number = 0

    for (const house of agent.homes) {
      html += `<h1>${house.street} in ${house.city}, ${house.state} ${house.zipcode}</h1><br />Got <strong>${house.dailyHits}</strong> hits!<br />`
      totalHits += house.dailyHits

      await prisma.home.update({
        where: {
          mlsn: house.mlsn,
        },
        data: {
          dailyHits: 0,
        },
      })
    }

    await sendEmail(agent.email, `You got ${totalHits} hits today!`, html)
  }
}

main().then(() => process.exit(0))
