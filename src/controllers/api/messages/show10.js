import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiMessageShow = async (req, res) => {
  try {
    const foundMessage = await prisma.messages.findMany({
      orderBy: [
        { timeStamp: 'desc' }
      ],
      include: {
        user: true
      }
    })

    return res.status(200).json(foundMessage)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiMessageShow
