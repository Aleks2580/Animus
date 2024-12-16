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
      <img src={product.image} alt={product.name} className={styles.image} />
      <h1 className={styles.name}>{product.name}</h1>
      <p className={styles.description}>{product.description}</p>
    </div>
  );
}
