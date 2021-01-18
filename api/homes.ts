import { Router } from 'express'

// import HOME_DATA from './home_data.json'

const router = Router()

router.get('/homes', async (req, res) => {
  // res.json(await Home.find())
  // const user = await User.findOne()

  console.log('WAITING FOR SOMETHING')
  const user = await req.prisma.user.findFirst()

  console.log('DONE WAITING FOR SOMETHING')
  res.json(user)
})

router.post('/homes', async (req, res) => {
  // await Home.remove({})
  // Home.find({  })
  // const user = await User.create({
  //   username: 'Hello',
  //   email: 'hello@world.com',
  //   type: 'admin',
  //   hash: '123456789',
  // })
  console.log('WAITING FOR SOMETHING')
  const user = await req.prisma.user.create({
    data: {
      name: 'Hello World',
      email: 'hello@world.com',
      type: 'ADMIN',
      hash: '123456789',
    },
  })

  res.json(user)
})

export default router
