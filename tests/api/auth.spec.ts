// import { Agent } from 'http'
import app from '@/api'
import { User /*, Showing, Agent, Home */ } from '@prisma/client'
import request from 'supertest'
// import { sign } from 'jsonwebtoken'
import { prisma } from '../util/prisma'
// import { sendEmail } from '../../api/util/sendEmail'

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

/* describe('POST /showings - test whether showings works properly', () => {
  it('Create showing and send email', async () => {
    const expected: Showing & { user: User; agent: Agent; home: Home } = {
      id: 'ckmqsp93o00103rzerbofx2i9',
      confirmed: null,
      date: new Date(),
      userId: 'cklx060x70159zozeil9lklqe',
      agentId: 'cklx0601v0042zoze1vlpktm5',
      homeMlsn: '1234567',
      user: {
        id: 'cklx060x70159zozeil9lklqe',
        name: 'Vick Vinegar',
        email: 'pal0009@uah.edu',
        type: 'AGENT',
      },
      agent: {
        id: 'cklx0601v0042zoze1vlpktm5',
        name: 'Dill Pickles',
        phone: '(395) 765-8238',
        email: 'pal0009@uah.edu',
        agencyId: 'cklx0601v0043zoze579n0q6z',
        userId: 'cklx0601w0045zoze39juctby',
      },
      home: {
        mlsn: '1234567',
        agentId: 'cklx0601v0042zoze1vlpktm5',
        price: 179900,
        sqfootage: 1403,
        street: '342 Liberty Dr.',
        city: 'Huntsville',
        state: 'AL',
        zipcode: 35649,
        subdivision: 'No Subdivision or HOA',
        dailyHits: 0,
        alarmInfo:
          'Lock box on front and back door: code 3321                              Security: Motion sensored security lights',
        description:
          "Moving Ready!! Enjoy living on your own terms in this 3-bedroom/2-bath home. You'll enjoy a master suite with walk-in closet, great room with fireplace, kitchen with new granite countertops, Backsplash, and Brand New Stainless Steel Appliances. This home also offer new Floors, fresh paint, **NEW Roof**, and New Ductwork.  Facts and Features: Type - residential/family, Bedrooms - 3 bedrooms, Bathrooms - 2 full bath, Year Built - 1986, Heating - Central 1 and Fireplace, Cooling - Central 1, Parking - two car garage, Flooring - lamite, Sewer Information - septic tank, Fencing - chain link fence enclosing back yard, Lot - .51 acres, Price/sqft - $128, Applicances Included - range, dishwasher, microwave, Total Interior Living Area - 1,403 sqft, ",
        bedrooms: 0,
        bathrooms: 0,
        likeCount: 0,
      },
    }

    const finduniqueexpected: User = {
      id: 'cklx060x70159zozeil9lklqe',
      name: 'Vick Vinegar',
      email: 'pal0009@uah.edu',
      type: 'AGENT',
    }

    prisma.user.findUnique.mockResolvedValue(finduniqueexpected)
    prisma.showing.create.mockResolvedValue(expected)

    const sign_ = sign(
      { id: 'cklx060x70159zozeil9lklqe' },
      process.env.JWT_SECRET ?? 'SUPER_SECRET_BACKUP_SECRET'
    )

    const result = await request(app)
      .post('/showings')
      .set('Cookie', `userId=${sign_}`)
      .send({
        homeMlsn: '1234567',
        date: new Date(),
      })

    // eslint-disable-next-line no-console
    console.log(result)

    expect(prisma.showing.create).toBeCalled()
    expect(sendEmail).toBeCalled()

    expect(result.body).toMatchObject(expected)

    expect(result.body.user.password).toBeUndefined()
  })
}) */
