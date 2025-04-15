const express = require('express');
const router = express.Router();
const WishlistController = require('../Controllers/WishlistController');

// Route for creating a new wishlist entry.
router.post('/', WishlistController.addWishlist);

// Route for retrieving a user's wishlists
router.get('/:userId', WishlistController.getUserWishlists);

module.exports = router;