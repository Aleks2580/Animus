import React from 'react'
import styles from './ContactIcons.module.css'
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactIcons() {
  return (
    <div className={styles.container}>
         <a  className={styles.link} href="https://t.me/sapientropic" target="_blank" rel="noopener noreferrer">
        <FaTelegramPlane className={styles.icon} />
      </a>
      <a className={styles.link} href="mailto:info@sapientropic.com" target="_blank" rel="noopener noreferrer">
        <MdOutlineAlternateEmail className={styles.icon} />
      </a>
        {/* <FaXTwitter className={styles.icon}  /> */}

    </div>
  )
}
