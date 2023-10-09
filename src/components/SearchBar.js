import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

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

  useEffect(() => {
    if (showProducts) {
      handleSearch();
    }
  }, [showProducts]);

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
            <ul>
              {products
                .filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
                .map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;