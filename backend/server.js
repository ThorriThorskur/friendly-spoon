require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const accountRoutes = require('./Routes/AccountRoutes');
const wishlistRoutes = require('./Routes/WishlistRoutes');
const searchRoutes = require('./Routes/SearchRoutes');

app.use('/api/accounts', accountRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Magic Wishlist API' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
