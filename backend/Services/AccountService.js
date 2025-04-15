const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class AccountService {
  /**
   * Creates a new user (register).
   * @param {Object} accountData - Contains username, email, and password.
   * @returns The newly created user record.
   */
  static async createAccount({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const queryText = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(queryText, [username, email, hashedPassword]);
    return result.rows[0];
  }

  /**
   * Logs in by verifying credentials.
   * @param {Object} credentials - Contains username and password.
   * @returns The user object if login succeeds.
   */
  static async login({ username, password }) {
    const queryText = `SELECT * FROM users WHERE username = $1;`;
    const result = await db.query(queryText, [username]);
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    return user;
  }

  /**
   * Changes the password for a user.
   * First verifies the old password.
   * @param {Object} data - Contains accountId, oldPassword, and newPassword.
   * @returns The updated user record.
   */
  static async updatePassword({ accountId, oldPassword, newPassword }) {
    // Fetch the user
    const queryText = `SELECT * FROM users WHERE id = $1;`;
    const result = await db.query(queryText, [accountId]);
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    const user = result.rows[0];

    // Verify the old password
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new Error("Incorrect current password");
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    const updateQuery = `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING *;
    `;
    const updateResult = await db.query(updateQuery, [hashedNewPassword, accountId]);
    return updateResult.rows[0];
  }

  /**
   * Updates the username for a user.
   * @param {Object} data - Contains accountId and newUserName.
   * @returns The updated user record.
   */
  static async updateUserName({ accountId, newUserName }) {
    const updateQuery = `
      UPDATE users
      SET username = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await db.query(updateQuery, [newUserName, accountId]);
    return result.rows[0];
  }

  /**
   * Updates the email for a user.
   * @param {Object} data - Contains accountId and newEmail.
   * @returns The updated user record.
   */
  static async updateEmail({ accountId, newEmail }) {
    const updateQuery = `
      UPDATE users
      SET email = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await db.query(updateQuery, [newEmail, accountId]);
    return result.rows[0];
  }

  /**
   * Retrieves a user by ID.
   * @param {number|string} accountId - The unique identifier of the user.
   * @returns The user record.
   */
  static async getAccountById(accountId) {
    const queryText = `SELECT * FROM users WHERE id = $1;`;
    const result = await db.query(queryText, [accountId]);
    return result.rows[0];
  }

  /**
   * Deletes a user and all wishlist entries associated with it.
   * @param {number|string} accountId - The unique identifier of the user to delete.
   * @returns {Object} A message indicating the user was deleted.
   */
  static async deleteAccount(accountId) {
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      
      // Delete wishlists associated with the user.
      await client.query(
        'DELETE FROM wishlists WHERE user_id = $1',
        [accountId]
      );
      
      // Delete the user itself.
      await client.query(
        'DELETE FROM users WHERE id = $1',
        [accountId]
      );
      
      await client.query('COMMIT');
      return { message: 'User and associated wishlist entries deleted successfully.' };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async updateDarkMode({ accountId, darkmode }) {
    const updateQuery = `
      UPDATE users
      SET darkmode = $1
      WHERE id = $2
      RETURNING *;
    `;
    const result = await db.query(updateQuery, [darkmode, accountId]);
    return result.rows[0];
  }
}

module.exports = AccountService;