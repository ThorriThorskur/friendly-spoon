const AccountService = require('../Services/AccountService');

class AccountController {
  // Registration endpoint: POST /api/accounts/register
  static async register(req, res) {
    try {
      const account = await AccountService.createAccount(req.body);
      res.status(201).json(account);
    } catch (error) {
      console.error("Error registering account:", error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }

  // Login endpoint: POST /api/accounts/login
  static async login(req, res) {
    try {
      const account = await AccountService.login(req.body);
      res.status(200).json(account);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(401).json({ error: error.message || 'Unauthorized' });
    }
  }

  // Change password endpoint: PUT /api/accounts/change-password
  static async changePassword(req, res) {
    try {
      const { accountId, oldPassword, newPassword } = req.body;
      const updatedAccount = await AccountService.updatePassword({ accountId, oldPassword, newPassword });
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(400).json({ error: error.message || 'Unable to change password' });
    }
  }

  // Change username endpoint: PUT /api/accounts/change-username
  static async changeUserName(req, res) {
    try {
      const { accountId, newUserName } = req.body;
      const updatedAccount = await AccountService.updateUserName({ accountId, newUserName });
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("Error changing username:", error);
      res.status(400).json({ error: error.message || 'Unable to change username' });
    }
  }

  // Change email endpoint: PUT /api/accounts/change-email
  static async changeEmail(req, res) {
    try {
      const { accountId, newEmail } = req.body;
      const updatedAccount = await AccountService.updateEmail({ accountId, newEmail });
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error("Error changing email:", error);
      res.status(400).json({ error: error.message || 'Unable to change email' });
    }
  }

  // Get account information endpoint: GET /api/accounts/:accountId
  static async getAccount(req, res) {
    try {
      const accountId = req.params.accountId;
      const account = await AccountService.getAccountById(accountId);
      res.status(200).json(account);
    } catch (error) {
      console.error("Error fetching account:", error);
      res.status(400).json({ error: error.message || 'Unable to fetch account' });
    }
  }

  static async deleteAccount(req, res) {
    try {
      const accountId = req.params.accountId;
      const response = await AccountService.deleteAccount(accountId);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error deleting account:", error);
      res.status(500).json({ error: error.message || 'Error deleting account' });
    }
  }

  static async changeDarkMode(req, res) {
    try {
      const { accountId, darkmode } = req.body;
      const updatedUser = await AccountService.updateDarkMode({ accountId, darkmode });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating dark mode:", error);
      res.status(400).json({ error: error.message || 'Unable to update dark mode' });
    }
  }
}

module.exports = AccountController;