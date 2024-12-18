import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../constants/ProductsConstants";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { RiFocus3Line } from "react-icons/ri";
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
          {/* Features Icons */}
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
          <p className={styles.description}>{product.description}</p>

          {/* Pricing */}
          <div className={styles.priceSection}>
            <span className={styles.price}>$30.00</span>
            <span className={styles.inStock}>In stock</span>
          </div>

          {/* Add to Cart */}
          <div className={styles.cartSection}>
            <div className={styles.quantityWrapper}>
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>

          {/* General Info Disclaimer */}
          <div className={styles.disclaimer}>
            <p>
              All statements on this page are for informational purposes only
              and have not been evaluated. This product is not intended to
              diagnose, treat, cure, or prevent any disease. Before using this
              product, consulting a qualified MD is mandatory.{" "}
              <a href="#more" className={styles.moreLink}>See more.</a>
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.tabs}>
        <button className={styles.tabButton}>Description</button>
        <button className={styles.tabButton}>Dosage</button>
        <button className={styles.tabButton}>Research</button>
        <button className={styles.tabButton}>Reviews</button>
      </section>

      {/* Product Description */}
      <section className={styles.productInfo}>
        <h2>Buy {product.name} Online</h2>
        <p>
        Piracetam is a nootropic supplement that is used to improve cognitive function. It is a derivative of gamma-amino-butyric acid (GABA) with an effect on the central nervous system (CNS). Piracetam is also used in the complex therapy of medical conditions with brain function impairment.

Piracetam was first created in 1964 by a team of scientists under the guidance of Dr Giurgea. It is often called “the grandfather of all nootropics”.

Over the last four decades, Piracetam under the brand name Nootropil has been extensively studied and it is currently approved for use in over 100 countries.

PIRACETAM (NOOTROPIL) RESEARCH
Piracetam clinical studies and research focus on the elderly with dementia, schizophrenia, and other related neurodegenerative and cognitive disorders, or brain injury cases. Go to the Research tab for links to scientific papers including animal and human studies.

WHAT ARE PIRACETAM BENEFITS & EFFECTS?
Piracetam is a nootropic supplement that is used to improve cognitive function. It is believed to help with memory, learning, focus, and concentration. Some people also take Piracetam to help with anxiety and depression.

Piracetam is often used by healthy individuals searching for safe and mild cognitive improvement. But it is mostly prescribed to older patients, children, and adults who want to relieve the following symptoms:

Symptomatic treatment of various memory disorders;
Psychoorganic syndrome with asthenia;
Alcoholic psycho-organic syndrome;
Treatment-resistant depressions;
Other conditions, characterized by lowered intellectual functioning.
Piracetam’s effects also include preventing blood clotting issues, increasing longevity, and maintaining mental abilities in older patients. It was also found to improve communication between the two hemispheres of the brain.

PIRACETAM (NOOTROPIL) SAFETY
Piracetam (Nootropil) is deemed to be safe and well-tolerated by most users. Piracetam reviews are available in the Reviews tab.

WHERE TO BUY PIRACETAM (NOOTROPIL)?
Piracetam is a popular nootropic supplement that is available for purchase from different vendors. You can order Piracetam OTC in some countries. There are different forms of Piracetam available to source: powder, pills, solution. CosmicNootropic offers Piracetam capsules and ampoules in the US and worldwide.

Also check out Piracetam combination nootropics:


        </p>
      </section>
    </div>
  );
}
