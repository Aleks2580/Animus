import React from "react";
import OneBlog from "./OneBlog";
import styles from "./Blog.module.css";
import { usePosts } from "../../constants/BlogConstants";


export default function Blog() {
  const posts = usePosts();

  return (
    <section className={styles.blogSection}>
      
       <h2 className={styles.sectionTitle}>BLOG</h2>
       <div className={styles.flexContainer}>
       {posts?.map((post, index) => (
      <OneBlog key={index} {...post} />
    ))}
    </div>
    </section>
  );
}
