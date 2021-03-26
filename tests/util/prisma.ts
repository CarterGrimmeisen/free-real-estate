import { prisma as RealPrisma } from '@/api/util/prisma'
import { PrismaClient } from '@prisma/client'
import { MockProxy } from 'jest-mock-extended'

export const prisma = (RealPrisma as unknown) as PrismaClient &
  MockProxy<PrismaClient>

jest.mock('@/api/util/prisma.ts', () => require('@/tests/mocks/prisma.ts'))
