const db = require('../db');

class WishlistService {
  /**
   * Creates a new wishlist entry for a user.
   * @param {Object} wishlistData - Contains data like userId, cardId, and other card details.
   * @returns The newly created wishlist entry.
   */
  static async createWishlist(wishlistData) {
    const {
      userId,
      cardId,
      orcacle_id,
      name,
      image_uris,
      mana_cost,
      cmc,
      type_line,
      oracle_text,
      power,
      toughness,
      colors,
      color_identity,
      keywords,
      legalities,
      set_code,
      set_name,
      set_type,
      rarity,
      full_art,
      prices
    } = wishlistData;

    const queryText = `
      INSERT INTO wishlists (
        user_id, card_id, name, image_uris, mana_cost, cmc, type_line, oracle_text,
        power, toughness, colors, color_identity, keywords, legalities, set_code,
        set_name, set_type, rarity, full_art, prices
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20
      )
      RETURNING *;
    `;
    const params = [
      userId, cardId, orcacle_id, name, image_uris, mana_cost, cmc, type_line, oracle_text,
      power, toughness, colors, color_identity, keywords, legalities, set_code,
      set_name, set_type, rarity, full_art, prices
    ];
    const result = await db.query(queryText, params);
    return result.rows[0];
  }

  /**
   * Retrieves all wishlist entries for a specific user.
   * @param {string} userId - The id of the user.
   * @returns An array of wishlist entries.
   */
  static async getWishlistsForUser(userId, page = 1) {
    const limit = 20;
    const offset = (page - 1) * limit;
    const countResult = await db.query(
      'SELECT COUNT(*) FROM wishlists WHERE user_id = $1',
      [userId]
    );
    const totalCards = parseInt(countResult.rows[0].count, 10) || 0;
    const queryText = `
      SELECT *
      FROM wishlists
      WHERE user_id = $1
      ORDER BY id
      LIMIT $2
      OFFSET $3
    `;
    const result = await db.query(queryText, [userId, limit, offset]);
  
    return {
      data: result.rows,
      total_cards: totalCards
    };
  }
}
module.exports = WishlistService;
