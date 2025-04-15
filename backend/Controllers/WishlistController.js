const WishlistService = require('../Services/WishlistService');

class WishlistController {
  /**
   * Handles POST requests to add a new wishlist entry.
   */
  static async addWishlist(req, res) {
    try {
      const wishlist = await WishlistService.createWishlist(req.body);
      res.status(201).json(wishlist);
    } catch (error) {
      console.error("Error creating wishlist entry:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Handles GET requests to retrieve a user's paginated wishlist.
   * Expects a URL parameter for userId and an optional query parameter "page".
   */
  static async getUserWishlists(req, res) {
    try {
      const userId = req.params.userId;
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      const wishlistData = await WishlistService.getWishlistsForUser(userId, page);
      // wishlistData is now { data: [...], total_cards: N }
  
      res.status(200).json(wishlistData);
    } catch (error) {
      console.error("Error retrieving wishlists:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = WishlistController;
