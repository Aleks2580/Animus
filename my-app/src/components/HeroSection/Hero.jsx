import React from 'react';
import styles from './Hero.module.css';
import StarCanvas from '../StarCanvas/StarCanvas'
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { t } = useTranslation();
    return (
        <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          </div>
        </div>
        <div className={styles.scrollContainer}>
      <a href="#products">
        <div className={styles.scrollWrapper}>
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className={styles.scrollDot}
          />
        </div>
      </a>
    </div>
        <StarCanvas />
      </div>
    );
};

export default React.memo(HeroSection);