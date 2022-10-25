import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPixelShow = async (req, res) => {
  try {
    const foundPixel = await prisma.pixel.findMany({
      orderBy: [
        { timeStamp: 'desc' }
      ],
      include: {
        user: true
      }
    })

    return res.status(200).json(foundPixel)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPixelShow
