import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to='/'>
          <img className={styles.logo} src="../logo.png" alt="Logo" />
        </Link>
        <nav className={styles.navbar}>
          <Link className={styles.link} to='/products'>{t('navbar.products')}</Link>
          <Link className={styles.link} to='/about'>{t('navbar.about')}</Link>
          <Link className={styles.link} to='/order'>{t('navbar.how_to_order')}</Link>
          <Link className={styles.link} to='/blog'>{t('navbar.blog')}</Link>
          <Link className={styles.link} to='/faq'>{t('navbar.faq')}</Link>
        </nav>
      </div>
    </div>
  );
}

