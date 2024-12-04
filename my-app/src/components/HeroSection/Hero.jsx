import React from 'react';
import styles from './Hero.module.css';
import StarCanvas from '../StarCanvas/StarCanvas'

const HeroSection = () => {
    return (
        <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Unlock Your Potential</h1>
            <p>Empower your mind with clarity, focus, and boundless creativity.</p>
           
          </div>
          {/* <div className={styles.products}>
            <div className={styles.product}>
              <img src="images/f.jpg" alt="Fenotropil" />
              <h2>Fenotropil</h2>
              <p>A cognitive enhancer for focus and energy.</p>
            </div>
            <div className={styles.product}>
              <img src="images/s.jpg" alt="Semax" />
              <h2>Semax</h2>
              <p>Neuropeptide for memory and brain health.</p>
            </div>
            <div className={styles.product}>
              <img src="images/i.jpg" alt="IRS-19" />
              <h2>IRS-19</h2>
              <p>Immune system support for a healthier you.</p>
            </div>
            <div className={styles.product}>
              <img src="images/n.jpg" alt="Noopept" />
              <h2>Noopept</h2>
              <p>Boost cognition and protect your brain.</p>
            </div>
          </div> */}
        </div>
        <StarCanvas />
      </div>
    );
};

export default HeroSection;