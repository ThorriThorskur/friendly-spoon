import React from 'react';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Magic Wish</h1>
      <p>
        Search for your favorite Magic: The Gathering cards and build your wishlist.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/search">
          <button style={{ margin: '0 10px' }}>Search Cards</button>
        </Link>
        <Link to="/wishlist">
          <button style={{ margin: '0 10px' }}>Your Wishlist</button>
        </Link>
      </div>
    </div>
  );
};

export default FrontPage;
