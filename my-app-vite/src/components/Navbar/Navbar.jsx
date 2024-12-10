import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <img className={styles.logo} src="../logo.png" alt="" />
        <nav className={styles.navbar}>
            <span>PRODUCTS</span>
            <span>DELIVERY</span>
            <span>ABOUT US</span>
            <span>BLOG</span>
            <span>REVIEWES</span>
        </nav>
        </div>
        
    </div>
  )
}
