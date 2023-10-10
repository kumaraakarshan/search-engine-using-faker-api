import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const handleSearch = () => {
    axios
      .get(`https://fakerapi.it/api/v1/products?_locale=en_US&_seed=12345&_quantity=50&name=${filter}`)
      .then((response) => {
        setProducts(response.data.data);
        setShowProducts(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
    
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  useEffect(() => {
    if (showProducts) {
      handleSearch();
    }
  }, [showProducts, handleSearch]); 
  

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for products"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
      {showProducts && (
        <div>
          {products.length > 0 ? (
            <ul className={styles.productList}>
              {products
                .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
                .map((product) => (
                  <li key={product.id} className={styles.productItem}>
                    {product.name}
                    <button
                      className={`${styles.wishlistButton} ${
                        wishlist.includes(product.id) ? styles.activeWishlist : ''
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
