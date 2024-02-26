const express = require('express')
const router = express.Router()

const wishlistController = require('../controller/wishlistController')

router.get('/wishlist', wishlistController.getUserWishlist)
router.post('/wishlist/add/:userId/:productId', wishlistController.addWishlist)
router.post('/wishlist/remove/:userId/:productId', wishlistController.removeProductFromWishlist)

exports.routes = router