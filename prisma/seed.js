import Client from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new Client.PrismaClient()

const seed = async () => {
  const foundUser = await prisma.user.upsert({
    where: { username: 'tester' },
    update: {},
    create: {
      username: 'tester',
      email: 'test@test.com',
      passwordHash: await bcrypt.hash('123456', 10)
    }
  })

  await prisma.pixel.deleteMany({})
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      // eslint-disable-next-line
      await prisma.pixel.create({
        data: {
          x,
          y,
          RGB: '#FFFFFF',
          user: {
            connect: {
              id: foundUser.id
            }
          }
        }
      })
      console.log(`created x: ${x} | y: ${y}`)
    }
  }
}

seed()
