import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      {t('footer.content')}
    </div>
  );
}
