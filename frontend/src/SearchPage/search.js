import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../xStyles/Search.css';

const getCardImage = (card) => {
  if (card.image_uris && card.image_uris.normal) {
    return card.image_uris.normal;
  } else if (
    card.card_faces &&
    card.card_faces[0] &&
    card.card_faces[0].image_uris &&
    card.card_faces[0].image_uris.normal
  ) {
    return card.card_faces[0].image_uris.normal;
  }
  return 'https://via.placeholder.com/200x280?text=No+Image';
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const [wishlistIds, setWishlistIds] = useState([]);
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const handleSearch = (page = 1) => {
    fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}&page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching search results');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search results:', data);
        setSearchResults(data.data);
        setTotalCards(data.total_cards);
        setCurrentPage(page);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  const loadWishlist = () => {
    if (user && user.id) {
      fetch(`http://localhost:3000/api/wishlists/${user.id}?page=1`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching wishlist');
          }
          return response.json(); // => { data: [...], total_cards: X }
        })
        .then(data => {
          const entries = data.data || [];
          const ids = entries.map(entry => entry.card_id);
          setWishlistIds(ids);
        })
        .catch(error => {
          console.error('Error fetching wishlist:', error);
        });
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const totalPages = Math.ceil(totalCards / 10);

  const addToWishlist = (card) => {
    if (!user) {
      alert('You must be logged in to add a card to your wishlist.');
      return;
    }
    if (wishlistIds.includes(card.id)) {
      alert('This card is already in your wishlist.');
      return;
    }
    
    const payload = {
      userId: user.id,
      cardId: card.id,
      oracle_id: card.oracle_id,
      name: card.name,
      image_uris: card.image_uris,
      mana_cost: card.mana_cost,
      cmc: card.cmc,
      type_line: card.type_line,
      oracle_text: card.oracle_text,
      power: card.power,
      toughness: card.toughness,
      colors: card.colors,
      color_identity: card.color_identity,
      keywords: card.keywords,
      legalities: card.legalities,
      set_code: card.set,  
      set_name: card.set_name,
      set_type: card.set_type || null,
      rarity: card.rarity,
      full_art: card.full_art,
      prices: card.prices
    };
  
    fetch('http://localhost:3000/api/wishlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add card to wishlist');
        }
        return response.json();
      })
      .then(data => {
        console.log('Card added to wishlist:', data);
        setWishlistIds(prevIds => [...prevIds, card.id]);
        alert(`${card.name} has been added to your wishlist!`);
      })
      .catch(error => {
        console.error('Error while adding card to wishlist:', error);
        alert('There was an error adding the card to your wishlist.');
      });
  };

  const handlePageChange = (page) => {
    handleSearch(page);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Search for Cards</h1>
      <input 
        type="text" 
        placeholder="Search for a card..." 
        style={{ width: '300px', padding: '10px' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        style={{ marginLeft: '10px', padding: '10px 20px' }}
        onClick={() => handleSearch(1)}
      >
        Search
      </button>
      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/wishlist">
          <button style={{ margin: '0 10px' }}>Your Wishlist</button>
        </Link>
      </div>

      {searchResults.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Results:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {searchResults.map((card, index) => (
              <div
                key={index}
                className="card-container"
                style={{
                  position: 'relative', 
                  margin: '10px', 
                  border: '1px solid #ccc', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  width: '200px'
                }}
              >
                <img 
                  src={getCardImage(card)}
                  alt={card.name}
                  style={{ width: '100%', display: 'block' }}
                />
                {wishlistIds.includes(card.id) ? (
                  <button 
                    className="plus-button"
                    disabled
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      backgroundColor: 'gray',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'default',
                      fontSize: '20px',
                      lineHeight: '30px',
                      textAlign: 'center',
                      opacity: 1  // Always visible if already added, inline override is fine here.
                    }}
                  >
                    ✓
                  </button>
                ) : (
                  <button 
                    className="plus-button"
                    onClick={() => addToWishlist(card)}
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '20px',
                      lineHeight: '30px',
                      textAlign: 'center',
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
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
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ 
                  margin: '0 5px', 
                  padding: '5px 10px', 
                  backgroundColor: '#fff',
                  border: '1px solid #000',
                  cursor: 'pointer'
                }}
              >
                &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;