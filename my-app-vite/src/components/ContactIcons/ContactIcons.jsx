import React, {useState} from 'react'
import styles from './ContactIcons.module.css'
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";


export default function ContactIcons() {
  const [isQRCodeVisible, setQRCodeVisible] = useState(false);

  const toggleQRCode = () => {
    setQRCodeVisible(!isQRCodeVisible);
  };
  return (
    <div className={styles.container}>
         <a  className={styles.link} href="https://t.me/sapientropic" target="_blank" rel="noopener noreferrer">
        <FaTelegramPlane className={styles.icon} />
      </a>
      <a className={styles.link} href="mailto:info@sapientropic.com" target="_blank" rel="noopener noreferrer">
        <MdOutlineAlternateEmail className={styles.icon} />
      </a>
      
        <IoLogoWechat  className={`${styles.iconWechat} ${
            isQRCodeVisible ? styles.active : ""
          }`}
          onClick={toggleQRCode} />

       {isQRCodeVisible && (
          <div className={styles.qrCode}>
            <img
              className={styles.qrImage}
              src="qr.webp"
              alt="QR Code"
            />
          </div>
        )}
    </div>
  )
}
