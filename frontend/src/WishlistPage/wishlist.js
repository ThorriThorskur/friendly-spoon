import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [totalCards, setTotalCards] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const userId = 1;
  const fetchWishlist = (page = 1) => {
    fetch(`https://friendly-spoon-2bsi.onrender.com/api/wishlists/${userId}?page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        return response.json();
      })
      .then(data => {
        // data = { data: [...], total_cards: number }
        setWishlistItems(data.data || []);
        setTotalCards(data.total_cards || 0);
        setCurrentPage(page);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  };

  useEffect(() => {
    fetchWishlist(1);
  }, []);

  const totalPages = Math.ceil(totalCards / 20);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>You have no cards in your wishlist.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {wishlistItems.map(item => {
            const cardImage = item.image_uris?.normal || 'https://via.placeholder.com/200x280?text=No+Image';
            return (
              <div key={item.id} style={{ margin: '10px' }}>
                <img
                  src={cardImage}
                  alt={item.name}
                  style={{ width: '200px' }}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: '2rem' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => fetchWishlist(pageNum)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: pageNum === currentPage ? '#ccc' : '#fff',
                border: '1px solid #000',
                cursor: 'pointer'
              }}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/search">
          <button style={{ margin: '0 10px' }}>Search for Cards</button>
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;