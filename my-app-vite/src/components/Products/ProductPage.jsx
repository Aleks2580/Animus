import React, {useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../../constants/ProductsConstants";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { RiFocus3Line } from "react-icons/ri";
import { Tabs, Button } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io"
import styles from "./ProductPage.module.css";
import { useTranslation } from "react-i18next";


const { TabPane } = Tabs;

export default function ProductPage() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const products = useProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div className={styles.error}>Product not found!</div>;
  }
  
  return (
    <div className={styles.productPage}>
       <Link to='/products'>
       <Button className={styles.backButton} type="primary" icon={<IoIosArrowRoundBack className={styles.backButtonIcon} />} iconPosition='start'>
       {t("productPage.backButton")}
        </Button>
      </Link>
      {/* Product Section */}
      <section className={styles.productSection}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} className={styles.image} />
          {/* <div className={styles.features}>
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
          </div> */}
        </div>

        <div className={styles.productDetails}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.subname}>{product.subname}</p> {/* Added subname */}

          <div className={styles.priceSection}>
            <span className={styles.price}>{product.price}</span>
            <span className={styles.inStock}>{t("productPage.inStock")}</span>
          </div>

          <div className={styles.cartSection}>
            <div className={styles.quantityWrapper}>
              <button className={styles.addToCart}>-</button>
              <span>1</span>
              <button className={styles.addToCart}>+</button>
            </div>
            <button className={styles.addToCart}>{t("productPage.addToCart")}</button>
          </div>

          <div className={styles.disclaimer}>
            <p>
            {t("productPage.disclaimer")} {" "}
              <a href="#more" className={styles.moreLink}>
              {t("productPage.seeMore")}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className={styles.tabs}>
        <Tabs defaultActiveKey="description">
          <TabPane className={styles.productInfo} tab={t("productPage.tabs.description")} key="description">
            <div
              className={styles.productText}
              dangerouslySetInnerHTML={{ __html: product.description }} // Render HTML safely
            />
          </TabPane>
          <TabPane className={styles.productInfo} tab={t("productPage.tabs.dosage")} key="dosage">
            <div
              className={styles.productText}
              dangerouslySetInnerHTML={{ __html: product.dosage }} // Render HTML safely
            />
          </TabPane>
          <TabPane className={styles.productInfo} tab={t("productPage.tabs.research")} key="research">
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
