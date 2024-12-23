import React from "react";
import { Link } from "react-router-dom";
import styles from "./OneProduct.module.css";

export default function OneProduct({ id, image, name, subname }) {
  return (
    <Link to={`/products/${id}`} className={styles.link}>
      <div className={styles.product}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{subname}</p>
      </div>
    </Link>
  );
}

