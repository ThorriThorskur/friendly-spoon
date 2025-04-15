const express = require('express');
const router = express.Router();
const AccountController = require('../Controllers/AccountController');

// Registration route
router.post('/register', AccountController.register);

// Login route
router.post('/login', AccountController.login);

// Change password route
router.put('/change-password', AccountController.changePassword);

// Change username route
router.put('/change-username', AccountController.changeUserName);

// Change email route
router.put('/change-email', AccountController.changeEmail);

// Get account by id route
router.get('/:accountId', AccountController.getAccount);

// Delete account route
router.delete('/:accountId', AccountController.deleteAccount);

// Change dark mode setting route
router.put('/change-darkmode', AccountController.changeDarkMode);

module.exports = router;
