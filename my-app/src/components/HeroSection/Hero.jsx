import React from 'react';
import styles from './Hero.module.css';

const HeroSection = () => {
    return (
        <div className={styles.heroSection}>
            <div className={styles.splitScreen}>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.heroContent}>
                <h1>Unlock the Power of Your Mind and Body</h1>
                <p>Discover the science of enhancement with Семакс, Фенотропил, and ИРС19. Explore how these innovations can sharpen your focus, boost your energy, and enhance your well-being.</p>
                <div className={styles.ctaButtons}>
                    <button className={`${styles.ctaButton} ${styles.learnMore}`}>Learn More</button>
                    <button className={`${styles.ctaButton} ${styles.startJourney}`}>Start Your Enhancement Journey</button>
                </div>
                <p className={styles.tagline}>Evolve Your Potential. Backed by scientific research and used by those who aim to achieve more.</p>
            </div>
        </div>
    );
};

export default HeroSection;