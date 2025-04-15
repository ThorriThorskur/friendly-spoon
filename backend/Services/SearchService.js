const axios = require('axios');

class SearchService {
  /**
   * Searches for cards using Scryfall's search endpoint and returns a paginated result.
   * @param {string} query - The card name search query.
   * @param {number} clientPage - The requested page number (defaults to 1). This is our custom pagination.
   * @returns {Object} An object containing total_cards, has_more, and an array of 10 card objects.
   */
  static async searchCardsByName(query, clientPage = 1) {
    const clientPageSize = 10;
    const scryfallPageSize = 175;
    const absoluteOffset = (clientPage - 1) * clientPageSize;
    const scryfallPageNumber = Math.floor(absoluteOffset / scryfallPageSize) + 1;
    const localOffset = absoluteOffset % scryfallPageSize;

    try {
      const response = await axios.get('https://api.scryfall.com/cards/search', {
        params: {
          q: query,
          page: scryfallPageNumber,
        },
      });
      
      const cards = response.data.data;
      const paginatedCards = cards.slice(localOffset, localOffset + clientPageSize);

      return {
        total_cards: response.data.total_cards,
        has_more: response.data.has_more,
        data: paginatedCards,
      };
    } catch (error) {
      throw new Error(error.response ? error.response.data.details : error.message);
    }
  }
}

module.exports = SearchService;