import React from "react";
import styles from "./BlogPage.module.css";
import { Link, useParams } from "react-router-dom";
import { usePosts } from "../../constants/BlogConstants";
import { Button } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io"

export default function BlogPost() {
  const { blogId } = useParams();
  const posts = usePosts();
  const post = posts.find((p) => p.id === parseInt(blogId, 10));

  if (!post) {
    return <div className={styles.error}>Blog post not found!</div>;
  }

  return (
    <div className={styles.blogPost}>
      <Link to='/blogs'>
       <Button className={styles.backButton} type="primary" icon={<IoIosArrowRoundBack className={styles.backButtonIcon} />} iconPosition='start'>
            back
        </Button>
      </Link>
  
      <div className={styles.headerSection}>
        <img src={post.image} alt={post.title} className={styles.image} />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>{post.date}</p>
          <p>{post.intro}</p>
        </div>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
