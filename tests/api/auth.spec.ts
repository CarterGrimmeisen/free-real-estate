import app from '@/api'
import { User } from '@prisma/client'
import request from 'supertest'

import { prisma } from '../util/prisma'

describe('POST /auth/register - Register Endpoint', () => {
  it('Register a user', async () => {
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

    expect(result.body).toMatchObject({ success: true })

    expect(result.body.password).toBeUndefined()
  })

  it('Failed validation on registration body', async () => {
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
    })

    expect(prisma.user.create).toBeCalled()

    expect(result.body).toMatchObject({
      error: "data should have required property 'password'",
      errors: [
        {
          dataPath: '',
          keyword: 'required',
          message: "should have required property 'password'",
          params: {
            missingProperty: 'password',
          },
          schemaPath: '#/required',
        },
      ],
      invalidRequest: {
        email: 'jest@jest.jest',
        name: 'Jesty McJesterson',
      },
    })
  })
})
