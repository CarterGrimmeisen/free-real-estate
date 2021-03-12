import { onDeleteArgs, PrismaDelete } from '@paljs/plugins'
import { PrismaClient } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime'

class Prisma extends PrismaClient {
  // eslint-disable-next-line no-useless-constructor
  constructor(options?: PrismaClientOptions) {
    super(options)
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this)
    await prismaDelete.onDelete(args)
  }
}

export const prisma = new Prisma()
