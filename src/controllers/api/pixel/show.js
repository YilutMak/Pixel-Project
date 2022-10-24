import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPixelShow = async (req, res) => {
  try {
    const { query: { x, y } } = req
    const foundPixel = await prisma.pixel.findFirst({
      where: {
        x: Number(x),
        y: Number(y)
      },
      include: {
        user: true
      },
      orderBy: [
        { timeStamp: 'desc' }
      ]
    })
    return res.status(200).json(foundPixel)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPixelShow
