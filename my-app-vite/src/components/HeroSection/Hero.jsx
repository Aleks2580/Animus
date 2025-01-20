import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import StarCanvas from "../StarCanvas/StarCanvas";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [animationKey, setAnimationKey] = useState(Date.now());

  useEffect(() => {
    // Whenever language changes, update the key to force re-render
    setAnimationKey(Date.now());
  }, [i18n.language]); // Watch language changes

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
        <h1>
        {t("hero.title")}{" "}
        <TypeAnimation
        key={animationKey}
          sequence={[
            t("hero.dynamicText1"), // Add any dynamic or static text from your translations
            1000,
            t("hero.dynamicText2"), // Another text to type after a pause
            1000,
            t("hero.dynamicText3"),
            1000
          ]}
          wrapper="span"
          speed={20} // Adjust speed of typing
          cursor={true} // Show the typing cursor
          repeat={Infinity} // Optional, make it loop infinitely
        />
      </h1>
          <p>{t("hero.description")}</p>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <a href="#subhero">
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
