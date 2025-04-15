const SearchService = require('../Services/SearchService');

class SearchController {
  /**
   * Handles GET requests for card search.
   * Expects query parameters:
   *   - q: The card search query.
   *   - page: (Optional) The page number for pagination (defaults to 1).
   */
  static async search(req, res) {
    try {
      const query = req.query.q;
      const page = req.query.page ? parseInt(req.query.page, 10) : 1;
      
      if (!query) {
        return res.status(400).json({ error: "Missing query parameter: q" });
      }

      const results = await SearchService.searchCardsByName(query, page);
      res.status(200).json(results);
    } catch (error) {
      console.error("Error during card search:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
}

module.exports = SearchController;
