import prisma from '../../controllers/_helpers/prisma.js'

const CanvasHandlers = (io, socket) => {
  const receivePixel = async (pixelData, color, currentUser) => {
    console.log(`${currentUser.user.username}: Pixel(x:${pixelData.x},y:${pixelData.y}) changed to ${color}`)

    const dataToSave = {
      x: pixelData.x,
      y: pixelData.y,
      timeStamp: new Date(Date.now()),
      RGB: color,
      userId: currentUser.user.id
    }
    const newPixelData = await prisma.Pixel.create({ data: dataToSave })
    // console.log(msg, user)
    const timeStamp = new Date(Date.now())
    const UserTrigger = currentUser
    io.emit('pixel updated', newPixelData, color, UserTrigger, timeStamp)
  }

  socket.on('pixel update', receivePixel)
}

export default CanvasHandlers
