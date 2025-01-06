import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../constants/ProductsConstants";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { RiFocus3Line } from "react-icons/ri";
import { Tabs } from "antd";
import styles from "./ProductPage.module.css";

const { TabPane } = Tabs;

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
          <div className={styles.features}>
            <div className={styles.iconBox}>
              <MdOutlineEnergySavingsLeaf className={styles.icon} />
              <p>AUTHENTIC PRODUCTS</p>
            </div>
            <div className={styles.iconBox}>
              <IoBodyOutline className={styles.icon} />
              <p>GMP QUALITY</p>
            </div>
            <div className={styles.iconBox}>
              <RiFocus3Line className={styles.icon} />
              <p>15% CRYPTO DISCOUNT</p>
            </div>
          </div>
        </div>

        <div className={styles.productDetails}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.subname}>{product.subname}</p> {/* Added subname */}

          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price}</span>
            <span className={styles.inStock}>In stock</span>
          </div>

          <div className={styles.cartSection}>
            <div className={styles.quantityWrapper}>
              <button className={styles.addToCart}>-</button>
              <span>1</span>
              <button className={styles.addToCart}>+</button>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>

          <div className={styles.disclaimer}>
            <p>
              All statements on this page are for informational purposes only
              and have not been evaluated. This product is not intended to
              diagnose, treat, cure, or prevent any disease. Before using this
              product, consulting a qualified MD is mandatory.{" "}
              <a href="#more" className={styles.moreLink}>
                See more.
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className={styles.tabs}>
        <Tabs defaultActiveKey="description">
          <TabPane className={styles.productInfo} tab="Description" key="description">
            <div
              className={styles.productText}
              dangerouslySetInnerHTML={{ __html: product.description }} // Render HTML safely
            />
          </TabPane>
          <TabPane className={styles.productInfo} tab="Dosage" key="dosage">
            <div
              className={styles.productText}
              dangerouslySetInnerHTML={{ __html: product.dosage }} // Render HTML safely
            />
          </TabPane>
          <TabPane className={styles.productInfo} tab="Research" key="research">
            <div
              className={styles.productText}
              dangerouslySetInnerHTML={{ __html: product.research }} // Render HTML safely
            />
          </TabPane>
        </Tabs>
      </section>
    </div>
  );
}
