import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPixelIndex = async (req, res) => {
  try {
    const foundPixel = await prisma.pixel.findMany({
      distinct: ['x', 'y'],
      orderBy: [
        { timeStamp: 'desc' },
        { y: 'asc' },
        { x: 'asc' }
      ]
    })

    return res.status(200).json({
      pixel: foundPixel
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPixelIndex
