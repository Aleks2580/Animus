import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <img className={styles.logo} src="../logo.png" alt="" />
        <nav className={styles.navbar}>
            <Link to='/products'>Products</Link>
            <span>How to order</span>
            <span>About us</span>
            <span>Blog</span>
            <span>Promotions</span>
        </nav>
        </div>
        
    </div>
  )
}
