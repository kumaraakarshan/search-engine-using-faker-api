import React from 'react';
import Product from './Product';
import styles from './ProductList.module.css';

function ProductList({ products }) {
  return (
    <div className={styles.productList}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} className={styles.productItem} />
        ))
      ) : null /* No "No products available" message */}
    </div>
  );
}

export default ProductList;
