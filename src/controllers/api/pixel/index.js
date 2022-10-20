import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPixelIndex = async (req, res) => {
  try {
    const foundPixels = await prisma.pixel.findMany({
      distinct: ['y', 'x'],
      orderBy: [
        { y: 'asc' },
        { x: 'asc' },
        { timeStamp: 'desc' }
      ]
    })

    const groupedPixels = []

    foundPixels.forEach((pixel) => {
      const rowIndex = pixel.y
      const colIndex = pixel.x
      if (!groupedPixels[rowIndex]) groupedPixels[rowIndex] = []
      groupedPixels[rowIndex][colIndex] = pixel
    })

    return res.status(200).json({
      pixel: groupedPixels
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPixelIndex
