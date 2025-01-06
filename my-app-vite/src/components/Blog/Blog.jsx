import React from "react";
import OneBlog from "./OneBlog";
import styles from "./Blog.module.css";
import { usePosts } from "../../constants/BlogConstants";


export default function Blog() {
  const posts = usePosts();

  return (
    <section className={styles.blogSection}>
      
       <h2 className={styles.sectionTitle}>BLOG</h2>
       <div className={styles.gridContainer}>
       {posts?.map((post, index) => (
      <OneBlog key={index} {...post} />
    ))}
    </div>

      {/* <h2 className={styles.sectionTitle}>BLOG</h2>
      <div className={styles.gridContainer}>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>
              {post.title || "Sample Title"}
            </h3>
            <p className={styles.cardExcerpt}>
              {post.excerpt || "Lorem gfhor sit amet..."}
            </p>
            <p className={styles.cardDate}>
              {post.date || "December 20, 2024"}
            </p>
            <button className={styles.learnMoreBtn}>Learn more</button>
          </motion.div>
        ))}
      </div> */}
    </section>
  );
}
