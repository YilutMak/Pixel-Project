import Client from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new Client.PrismaClient({
  log: ['info', 'query']
})

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
  const dataToSave = []
  for (let y = 0; y < 100; y += 1) {
    for (let x = 0; x < 100; x += 1) {
      dataToSave.push({
        x,
        y,
        RGB: '#FFFFFF',
        userId: foundUser.id
      })
      console.log(`added ${y} ${x}`)
    }
  }
  await prisma.pixel.createMany({
    data: dataToSave
  })
}

seed()
