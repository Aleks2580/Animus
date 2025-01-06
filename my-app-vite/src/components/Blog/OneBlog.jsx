import React from 'react'
import styles from './OneBlog.module.css'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

export default function OneBlog({id, image, title, date, excerpt}) {
  return (
    <Link to={`/blogs/${id}`} className={styles.link}>
          <motion.div
            key={id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: id * 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={image}
              alt={title}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>
              {title || "Sample Title"}
            </h3>
            <p className={styles.cardExcerpt}>
              {excerpt || "Lorem gfhor sit amet..."}
            </p>
            <p className={styles.cardDate}>
              {date || "December 20, 2024"}
            </p>
            <button className={styles.learnMoreBtn}>Learn more</button>
          </motion.div>
      
      
    </Link>
  )
}
