import prisma from '../../_helpers/prisma.js'
import handleErrors from '../../_helpers/handle-errors.js'

const controllersApiWishlistsIndex = async (req, res) => {
  try {
    // Filters
    const q = req.query.q || ''
    const orderBy = req.query.orderBy || 'id'
    const sortBy = req.query.sortBy || 'asc'

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      OR: [
        {
          title: {
            contains: q
          }
        }, {
          description: {
            contains: q
          }
        }
      ]
    }

    const totalWishlists = await prisma.wishlist.count({ where })
    const foundWishlists = await prisma.wishlist.findMany({
      take,
      skip,
      where,
      orderBy: {
        [orderBy]: sortBy
      }
    })

    return res.status(200).json({
      wishlists: foundWishlists,
      meta: { currentPage: page, totalPages: Math.ceil(totalWishlists / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiWishlistsIndex
