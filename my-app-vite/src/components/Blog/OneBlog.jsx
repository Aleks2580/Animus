import React from 'react'
import styles from './OneBlog.module.css'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


export default function OneBlog({id, image, title, created_at, intro, post_id}) {
  const { t, i18n } = useTranslation();
  const truncatedIntro =  i18n.language === "en-US" ? intro?.slice(0, 120) + "..." : 
  intro?.slice(0, 60) + "..."
  return (
    <Link to={`/blogs/${post_id}`} className={styles.link}>
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
              {title || "Title"}
            </h3>
            <p className={styles.cardExcerpt}>
              {truncatedIntro}
            </p>
            <p className={styles.cardDate}>
              {created_at}
            </p>
            <button className={styles.learnMoreBtn}>{t("blog.learn_more")}</button>
          </motion.div>
      
      
    </Link>
  )
}
