import React from 'react';
import styles from './About.module.css';
import { FaBrain, FaHandsHelping, FaLeaf, FaShippingFast, FaLock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation(); // Hook to use translations

  return (
    <div className={styles.aboutContainer}>
      {/* Title */}
      <h1 className={styles.title}>{t('about.title')}</h1>

      {/* Description */}
      <p className={styles.description}>
        {t('about.description')}
      </p>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.feature}>
          <FaBrain className={styles.icon} />
          <h3>{t('about.features.unlock.title')}</h3>
          <p>{t('about.features.unlock.description')}</p>
        </div>
        <div className={styles.feature}>
          <FaHandsHelping className={styles.icon} />
          <h3>{t('about.features.customer.title')}</h3>
          <p>{t('about.features.customer.description')}</p>
        </div>
        <div className={styles.feature}>
          <FaLeaf className={styles.icon} />
          <h3>{t('about.features.science.title')}</h3>
          <p>{t('about.features.science.description')}</p>
        </div>
        <div className={styles.feature}>
          <FaShippingFast className={styles.icon} />
          <h3>{t('about.features.delivery.title')}</h3>
          <p>{t('about.features.delivery.description')}</p>
        </div>
        <div className={styles.feature}>
          <FaLock className={styles.icon} />
          <h3>{t('about.features.trust.title')}</h3>
          <p>{t('about.features.trust.description')}</p>
        </div>
      </div>
    </div>
  );
}
