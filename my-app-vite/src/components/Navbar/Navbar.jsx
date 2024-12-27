import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  // Define items so that key === route pathname
  const items = [
    {
      key: '/products',
      label: (
        <Link className={styles.link} to="/products">
          {t('navbar.products')}
        </Link>
      ),
    },
    {
      key: '/about',
      label: (
        <Link className={styles.link} to="/about">
          {t('navbar.about')}
        </Link>
      ),
    },
    {
      key: '/order',
      label: (
        <Link className={styles.link} to="/order">
          {t('navbar.how_to_order')}
        </Link>
      ),
    },
    {
      key: '/blogs',
      label: (
        <Link className={styles.link} to="/blogs">
          {t('navbar.blog')}
        </Link>
      ),
    },
    {
      key: '/faq',
      label: (
        <Link className={styles.link} to="/faq">
          {t('navbar.faq')}
        </Link>
      ),
    },
  ];

  
  const isValidPath = items.some((item) => item.key === location.pathname);
  const selectedKeys = isValidPath ? [location.pathname] : [];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/">
          <img className={styles.logo} src="../logo.png" alt="Logo" />
          {/* <span>PROJECT <h1>V</h1> </span> */}
        </Link>
        <Menu
          selectedKeys={selectedKeys}
          mode="horizontal"
          items={items}
          className={styles.navbar}
        />
      </div>
    </div>
  );
}
