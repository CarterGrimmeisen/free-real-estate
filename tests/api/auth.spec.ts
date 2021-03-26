import app from '@/api'
import { User } from '@prisma/client'
import request from 'supertest'

import { prisma } from '../util/prisma'

describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    const expected: User = {
      id: 'ckkycn3vo000001jw1z9jdj6k',
      email: 'jest@jest.jest',
      name: 'Jesty McJesterson',
      type: 'USER',
    }

    prisma.user.create.mockResolvedValue(expected)

    const result = await request(app).post('/auth/register').send({
      email: 'jest@jest.jest',
      name: 'Jesty McJesterson',
      password: 'Jest',
    })

    expect(prisma.user.create).toBeCalled()

    expect(result.body).toMatchObject(expected)

    expect(result.body.password).toBeUndefined()
  })
})
