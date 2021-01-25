#!/usr/bin/env node

/* eslint-disable no-console */
import Prisma from '@prisma/client'

import HOME_DATA from './home_data.json'

const prisma = new Prisma.PrismaClient()

/**
 * @type import('@prisma/client').Home[]
 */
let homes = []

try {
  for (const home of HOME_DATA) {
    homes += await prisma.home.create({
      data: {
        alarmInfo: home['Home alarm information'],
        city: home.city,
        dailyHits: 0,
        description:
          home[
            'Brief description of property: size of lot, dwelling type, and so forth'
          ],
        price: home.price,
        sqfootage: home['Square Footage'],
        state: home.state,
        street: home.street,
        zipcode: home.zipcode,
        listAgent: {
          connectOrCreate: {
            where: {
              email: home['Listing Agent Email'],
            },
            create: {
              email: home['Listing Agent Email'],
              name: home['Listing Agent Name'],
              phone: home['Listing Agent Phone'],
              agency: {
                connectOrCreate: {
                  where: {
                    address: home['Listing Agency Address'],
                  },
                  create: {
                    address: home['Listing Agency Address'],
                    name: home['Listing Agency'],
                    phone: home['Listing Agency Phone'],
                  },
                },
              },
            },
          },
        },
        rooms: {
          create: home['Room descriptions'].split(',').map((each) => ({
            name: each.split('-')[0].trim(),
            description: each.split('-')[1].trim(),
          })),
        },
        schools: home['School zones if applicable'],
        showAgent: {
          connectOrCreate: {
            where: {
              email: home['Listing Agent Email'],
            },
            create: {
              email: home['Listing Agent Email'],
              name: home['Listing Agent Name'],
              phone: home['Listing Agent Phone'],
              agency: {
                connectOrCreate: {
                  where: {
                    address: home['Listing Agency Address'],
                  },
                  create: {
                    address: home['Listing Agency Address'],
                    name: home['Listing Agency'],
                    phone: home['Listing Agency Phone'],
                  },
                },
              },
            },
          },
        },
        subdivision: home['Subdivision if applicable'],
      },
    })
  }
} catch (e) {
  console.error(
    '❗ Homes could not be created, check the error message present above and try again'
  )
  process.exit(1)
}

console.log(`✔️ Successfully created ${homes.length} homes`)
