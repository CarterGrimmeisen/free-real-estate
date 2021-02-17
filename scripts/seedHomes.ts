#!/usr/bin/env node

/* eslint-disable no-console */
import enquirer from 'enquirer'
import { PrismaClient, Home, SchoolType } from '@prisma/client'
import { hash } from 'bcryptjs'

import HOME_DATA from './home_data.json'

async function main() {
  const prisma = new PrismaClient()

  const homes: Home[] = []

  const { confirm } = await enquirer.prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: 'Would you like to clear the database before seeding?',
  })

  if (confirm) {
    await prisma.school.deleteMany()
    await prisma.home.deleteMany()
    await prisma.agent.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.auth.deleteMany()
    await prisma.user.deleteMany()
  }

  try {
    // eslint-disable-next-line no-unreachable-loop
    for (const home of HOME_DATA.Property) {
      homes.push(
        await prisma.home.create({
          include: {
            agent: true,
            schools: true,
          },
          data: {
            mlsn: home['MLS#'],
            price: +home['List Price'].replace(/[$,]/g, ''),
            sqfootage: +home['Square Footage'].split(' ')[0].replace(',', ''),
            street: home.street,
            city: home.city,
            state: home.state,
            zipcode: +home.zipcode,
            subdivision: home['Subdivision if applicable'],
            dailyHits: 0,
            alarmInfo: home['Home alarm information'],
            description:
              home[
                'Brief description of property: size of lot, dwelling type, and so forth'
              ],
            // TODO: Add actual bedroom and bathroom counts
            bedrooms: 0,
            bathrooms: 0,
            agent: {
              connectOrCreate: {
                where: { email: home['Listing Agent Email'] },
                create: {
                  email: home['Listing Agent Email'],
                  name: home['Listing Agent Name'],
                  phone: home['Listing Agent Phone'],
                  agency: {
                    connectOrCreate: {
                      where: { name: home['Listing Agency'] },
                      create: {
                        address: home['Listing Agency Address'],
                        name: home['Listing Agency'],
                        phone: home['Listing Agency Phone'],
                      },
                    },
                  },
                  user: {
                    create: {
                      name: home['Listing Agent Name'],
                      email: home['Listing Agent Email'],
                      auth: {
                        create: {
                          password: await hash(
                            home['Listing Agent Email'].split('@')[0],
                            10
                          ),
                        },
                      },
                      type: 'AGENT' as const,
                    },
                  },
                },
              },
            },

            schools: {
              connectOrCreate: home['School zones if applicable']
                .split(':')[1]
                .split(',')
                .filter((each) => each.includes('-'))
                .map((schoolString) => ({
                  where: {
                    name: schoolString.split('-')[1].trim(),
                  },

                  create: {
                    type: schoolString
                      .split('-')[0]
                      .trim()
                      .toUpperCase() as SchoolType,
                    name: schoolString.split('-')[1].trim(),
                  },
                })),
            },
          },
        })
      )
    }
  } catch (e) {
    console.error(e)
    console.error(
      '❗ Homes could not be created, check the error message present above and try again'
    )
    process.exit(1)
  }

  console.log(`✔️ Successfully created ${homes.length} homes`)
}

main().then(() => process.exit(0))
