import prisma from '../../controllers/_helpers/prisma.js'

const CanvasHandlers = (io, socket) => {
  const receivePixel = (pixelData, color, currentUser) => {
    console.log(`${currentUser.user.username}: Pixel(x:${pixelData.x},y:${pixelData.y}) changed to ${color}`)

    const pixelUpdate = async () => {
      const dataToSave = {
        x: pixelData.x,
        y: pixelData.y,
        timeStamp: new Date(Date.now()),
        RGB: color,
        userId: currentUser.user.id
      }
      await prisma.Pixel.create({ data: dataToSave })
    }
    // console.log(msg, user)
    pixelUpdate(pixelData, color, currentUser)
    const timeStamp = new Date(Date.now())
    io.emit('pixel updated', pixelData, color, currentUser, timeStamp)
  }

  socket.on('pixel update', receivePixel)
}

export default CanvasHandlers
