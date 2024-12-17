import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../constants/ProductsConstants";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { productId } = useParams();
  const products = useProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div className={styles.error}>Product not found!</div>;
  }

  return (
    <div className={styles.productPage}>
      {/* Product Section */}
      <section className={styles.productSection}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.image} />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          
          {/* Pricing and Quantity */}
          <div className={styles.priceSection}>
            <span className={styles.price}>$30.00</span>
            <span className={styles.inStock}>In stock</span>
            <select className={styles.quantity}>
              <option value="1">1 Bottle</option>
              <option value="2">2 Bottles</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <div className={styles.cartSection}>
            <button className={styles.addToCart}>Add to Cart</button>
            <div className={styles.moreOptions}>
              <button className={styles.buyMore}>Buy More - Save More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className={styles.tabs}>
        <button className={styles.tabButton}>Description</button>
        <button className={styles.tabButton}>Dosage</button>
        <button className={styles.tabButton}>Research</button>
        <button className={styles.tabButton}>Reviews</button>
      </section>
      
      {/* Detailed Description */}
      <section className={styles.productInfo}>
        <h2>Buy {product.name} Online</h2>
        <p>Semax is a peptide nootropic used to support brain health and cognitive function.</p>
      </section>
    </div>
  );
}
