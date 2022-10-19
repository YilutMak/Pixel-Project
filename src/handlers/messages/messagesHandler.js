import prisma from '../../controllers/_helpers/prisma.js'

const MessagesHandlers = (io, socket) => {
  const receiveMessage = (msg, user) => {
    io.emit('chat message', msg, user)
    console.log(`${user.data.username}: ${msg}`)

    const messageCreate = async () => {
      const dataToSave = {
        userId: user.data.id,
        message: msg,
        timeStamp: Date.now()
      }
      await prisma.messages.create({ data: dataToSave })
    }
    // console.log(msg, user)
    messageCreate(msg, user)
  }

  socket.on('chat message', receiveMessage)
}

export default MessagesHandlers
