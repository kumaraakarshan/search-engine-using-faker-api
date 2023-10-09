import React from 'react';
import styles from './Product.module.css';

function Product({ product, className }) {
  return (
    <div className={`${styles.product} ${className}`}>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export default Product;
