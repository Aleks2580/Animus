import React from 'react'
import styles from './AdminPanel.module.css'
import { Link, Outlet } from 'react-router-dom'

export default function AdminPanel() {
  return (
    <div className={styles.main}>
      <nav className={styles.navAdmin}>
        <Link className={styles.adminLink} to="add-product">ADD PRODUCT</Link>
        <Link className={styles.adminLink} to="delete-product">DELETE PRODUCT</Link>
        <Link className={styles.adminLink} to="edit-product">EDIT PRODUCT</Link>
        <Link className={styles.adminLink} to="add-post">ADD POST</Link>
        <Link className={styles.adminLink} to="delete-post">DELETE POST</Link>
        <Link className={styles.adminLink} to="edit-post">EDIT POST</Link>
      </nav>
      <div className={styles.content}>
        <Outlet /> 
      </div>
    </div>
  )
}
