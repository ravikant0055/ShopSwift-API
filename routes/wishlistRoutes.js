const express = require('express')
const router = express.Router()

const wishlistController = require('../controller/wishlistController')

router.get('/wishlists', wishlistController.getWishlist)
router.post('/addWishlist', wishlistController.addWishlist)

exports.routes = router