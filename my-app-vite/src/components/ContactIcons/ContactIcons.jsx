import React from 'react'
import styles from './ContactIcons.module.css'
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function ContactIcons() {
  return (
    <div className={styles.container}>
        <FaTelegramPlane className={styles.icon} />
        <MdOutlineAlternateEmail className={styles.icon} />
    </div>
  )
}
