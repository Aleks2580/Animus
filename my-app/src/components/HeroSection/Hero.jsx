import React from 'react';
import styles from './Hero.module.css';

const HeroSection = () => {
    return (
        // <div className={styles.heroSection}>
        //     <div className={styles.splitScreen}>
        //         <div className={styles.left}></div>
        //         <div className={styles.right}></div>
        //     </div>
        //     <div className={styles.heroContent}>
        //         <h1>Unlock the Power of Your Mind and Body</h1>
        //         <p>Discover the science of enhancement with Семакс, Фенотропил, and ИРС19. Explore how these innovations can sharpen your focus, boost your energy, and enhance your well-being.</p>
        //         <div className={styles.ctaButtons}>
        //             <button className={`${styles.ctaButton} ${styles.learnMore}`}>Learn More</button>
        //             <button className={`${styles.ctaButton} ${styles.startJourney}`}>Start Your Enhancement Journey</button>
        //         </div>
        //         <p className={styles.tagline}>Evolve Your Potential. Backed by scientific research and used by those who aim to achieve more.</p>
        //     </div>
        // </div>
        <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Unlock Your Potential</h1>
            <p>Empower your mind with clarity, focus, and boundless creativity.</p>
          </div>
  
          {/* Product Section Fixed at the Bottom */}
          <div className={styles.products}>
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
          </div>
        </div>
      </div>
    );
};

export default HeroSection;