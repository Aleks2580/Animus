import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FiMenu, FiX } from "react-icons/fi"; // React Icons
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const items = [
    { key: "/products", label: "Products" },
    { key: "/about", label: "About" },
    { key: "/order", label: "How to Order" },
    { key: "/blogs", label: "Blog" },
    { key: "/faq", label: "FAQ" },
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
            <span className={styles.logoProject}>PROJECT</span>
            <span className={styles.logoV}>V</span>
          </div>
        </Link>

        {/* Desktop Menu */}
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

        {/* Hamburger Icon */}
        {isMobile && (
          <div className={styles.menuToggle} onClick={() => setToggle(!toggle)}>
            {toggle ? <FiX size={28} /> : <FiMenu size={28} />}
          </div>
        )}

        {/* Mobile Menu */}
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
