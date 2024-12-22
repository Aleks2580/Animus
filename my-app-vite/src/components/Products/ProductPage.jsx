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

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className={styles.productPage}>
      {/* Product Section */}
      <section className={styles.productSection}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
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

          <div className={styles.priceSection}>
            <span className={styles.price}>$30.00</span>
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

      {/* Tabs */}
      <section className={styles.tabs}>
        <Tabs
          defaultActiveKey="description"
         
   
         
        >
          <TabPane
            className={styles.productInfo}
            tab="Description"
            key="description"
            
          >
            <div className={styles.productText}>
              What is Phenylpiracetam? Phenylpiracetam is a Russian drug that is
              used in some countries to treat a variety of medical conditions
              such as cerebral stroke, traumatic brain injury, and
              neurodegenerative diseases. Phenylpiracetam is also anecdotally
              used to improve cognitive function and memory. Nanotropil or
              Phenotropil are factory produced brand-names of Phenylpiracetam.
              Phenylpiracetam, originally known as Phenotropil, was developed by
              Soviet researchers for astronauts in the 1980s – read more about
              top nootropics that can take you to the Moon. What does
              Phenylpiracetam do to the Brain? According to the manufacturer’s
              instructions, Phenylpiracetam has a positive effect on the
              metabolic processes and blood circulation in the brain. The drug
              is claimed to increase the content of noradrenaline, dopamine, and
              serotonin in the brain. The manufacturer gives promises that
              Phenylpiracetam can activate the integrative activity of the
              brain, promote memory consolidation, improve concentration and
              mental activity, facilitate learning processes, accelerate
              information transfer between the cerebral hemispheres, and
              increase the resistance of brain tissue to hypoxia and toxic
              effects. [1]
            </div>
          </TabPane>
          <TabPane className={styles.productInfo} tab="Dosage" key="dosage">
            <div className={styles.productText}>
              Contraindications Individual intolerance. It is not recommended
              for children, pregnant and lactating ladies due to the lack of
              clinical research data. With caution: Patients with severe liver
              and kidneys diseases, severe arterial hypertension, severe
              atherosclerosis, previous panic attacks, and acute psychotic
              states accompanied by psychomotor agitation (due to the possible
              exacerbation of anxiety, panic, hallucinations, and delirium), as
              well as patients prone to allergic reactions to nootropic drugs of
              the pyrrolidone group. Phenylpiracetam Dosage & How to Use
              Phenylpiracetam doses may vary between 100 mg and 300 mg. Most
              common Phenylpiracetam dose is 100 mg taken once a day, every
              morning after meals. The usual Phenylpiracetam course duration is
              from 2 weeks to 3 months, on average 30 days. The nootropic
              supplement should not be taken after 4 pm. One pack of Nanotropil
              (Phenylpiracetam) contains either 10 or 30 pills, each with 100 mg
              of the active ingredient. If you buy Phenylpiracetam 1 pack (30
              pills) it will be sufficient for 30 days of administration. To
              obtain detailed information about effects and dosages, please read
              the official instructions below. What are Phenylpiracetam Side
              effects? Phenylpiracetam is a potent nootropic that has a range of
              potential side effects, although they are said to be rare. During
              the first 1–3 days of admission, some patients may suffer
              psychomotor agitation, hyperemia of the skin, warm flashes, and
              hypertension. It is important to consult with a doctor before
              taking any preparation. If Phenylpiracetam is taken after 3 pm, it
              may cause insomnia. In patients with severe psycho emotional
              exhaustion, Phenylpiracetam may cause drowsiness. PHENYLPIRACETAM
              OFFICIAL INSTRUCTION
            </div>
          </TabPane>
          <TabPane className={styles.productInfo} tab="Research" key="research">
            <div className={styles.productText}>
              Bobkov et al (1983) [Pharmacological characteristics of a new
              phenyl analog of piracetam–4-phenylpiracetam]
              https://pubmed.ncbi.nlm.nih.gov/6403074/ Ratnikov et al (1985)
              [Effect of piracetam derivatives on antibody formation]
              https://pubmed.ncbi.nlm.nih.gov/4063506/ PP Kalinskiĭ, VV Nazarov
              (2007) Use of phenotropil in the treatment of asthenic syndrome
              and autonomic disturbances in the acute period of mild cranial
              brain trauma https://pubmed.ncbi.nlm.nih.gov/18689001/ А Malykh
              (2010) Piracetam and piracetam-like drugs: from basic science to
              novel clinical applications to CNS disorders
              https://pubmed.ncbi.nlm.nih.gov/20166767/ Koval’chuk et al (2010)
              [Efficacy of phenotropil in the rehabilitation of stroke patients]
              https://pubmed.ncbi.nlm.nih.gov/21626817/ V I Akhapkina, R V
              Akhapkin (2013) [Identification and evaluation of the neuroleptic
              activity of phenotropil] https://pubmed.ncbi.nlm.nih.gov/23994920/
              Zvejniece et al (2017). S-phenylpiracetam, a selective DAT
              inhibitor, reduces body weight gain without influencing locomotor
              activity. https://pubmed.ncbi.nlm.nih.gov/28743458/
            </div>
          </TabPane>
        </Tabs>
      </section>
    </div>
  );
}
