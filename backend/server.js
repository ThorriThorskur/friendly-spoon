const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  res.send('Magic Wishlist Backend');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
