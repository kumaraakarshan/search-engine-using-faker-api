import React, { useState } from 'react';
import styles from './Product.module.css';

function Product({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.product}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      {isHovered && (
        <button className={styles.viewButton} onClick={() => console.log(`Viewing ${product.name}`)}>
          View Product
        </button>
      )}
    </div>
  );
}

export default Product;
