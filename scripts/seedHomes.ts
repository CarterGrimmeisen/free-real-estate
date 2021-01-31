#!/usr/bin/env node

/* eslint-disable no-console */
import Prisma from '@prisma/client'

import HOME_DATA from './home_data.json'

const prisma = new Prisma.PrismaClient()

const homes: Prisma.Home[] = []

try {
  for (const home of HOME_DATA.Property) {
    homes.push(
      await prisma.home.create({
        data: {
          mlsn: home['MLS#'],
          alarmInfo: home['Home alarm information'],
          city: home.city,
          dailyHits: 0,
          description:
            home[
              'Brief description of property: size of lot, dwelling type, and so forth'
            ],
          price: +home['List Price'].replace(/[$,]/, ''),
          sqfootage: +home['Square Footage'].replace(',', ''),
          state: home.state,
          street: home.street,
          zipcode: +home.zipcode,
          agent: {
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
                      name: home['Listing Agency'],
                    },
                    create: {
                      address: home['Listing Agency Address'],
                      name: home['Listing Agency'],
                      phone: home['Listing Agency Phone'],
                    },
                  },
                },
                user: {
                  connectOrCreate: {
                    where: {
                      email: home['Listing Agent Email'],
                    },

                    create: {
                      name: home['Listing Agent Name'],
                      email: home['Listing Agent Email'],
                      password: home['Listing Agent Email'].split('@')[0],
                      type: 'AGENT' as const,
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
          schools: {
            connectOrCreate: home['School zones if applicable']
              .split(':')[1]
              .split(',')
              .map((each) => ({
                where: {
                  name: each.split('-')[1].trim(),
                },

                create: {
                  name: each.split('-')[1].trim(),
                  type: each.split('-')[0].trim(),
                },
              })),
          },
          subdivision: home['Subdivision if applicable'],
        },
      })
    )
  }
} catch (e) {
  console.error(
    '❗ Homes could not be created, check the error message present above and try again'
  )
  process.exit(1)
}

console.log(`✔️ Successfully created ${homes.length} homes`)
