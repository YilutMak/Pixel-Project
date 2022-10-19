import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiPixelShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundWishlist = await prisma.wishlist.findUnique({ where: { id: Number(id) }, rejectOnNotFound: true })
    return res.status(200).json(foundWishlist)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiPixelShow
