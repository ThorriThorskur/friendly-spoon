const express = require('express');
const router = express.Router();
const SearchController = require('../Controllers/SearchController');

// GET /api/search?q=<card name>&page=<clientPage>
router.get('/', SearchController.search);

module.exports = router;
