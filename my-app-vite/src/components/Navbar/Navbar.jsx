import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FiMenu, FiX } from "react-icons/fi"; 
import styles from "./Navbar.module.css";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

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

  const selectedKeys = items.some((item) => item.key === location.pathname)
    ? [location.pathname]
    : [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
        setToggle(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.navLink} to="/">
          <div className={styles.navLogo}>
            <span className={styles.logoProject}>SAPIENTROPIC</span>
            <div className={styles.sloganDiv}>
            <span className={styles.logoSlogan}>elevate mind</span>
            <span className={styles.logoSlogan}>expand horizons</span>
            </div>
          </div>
        </Link>

   
        {!isMobile && (
          <Menu
            selectedKeys={selectedKeys}
            mode="horizontal"
            items={items.map(({ key, label }) => ({
              key,
              label: <Link className={styles.link} to={key}>{label}</Link>,
            }))}
            className={styles.navbar}
          />
        )}


        {isMobile && (
          <div className={styles.menuToggle} onClick={() => setToggle(!toggle)}>
            {toggle ? <FiX size={28} /> : <FiMenu size={28} />}
          </div>
        )}


        {isMobile && toggle && (
          <div className={styles.mobileMenu}>
            <ul>
              {items.map(({ key, label }) => (
                <li
                  key={key}
                  className={`${styles.mobileMenuItem} ${
                    selectedKeys.includes(key) ? styles.active : ""
                  }`}
                  onClick={() => setToggle(false)}
                >
                  <Link className={styles.link} to={key}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
