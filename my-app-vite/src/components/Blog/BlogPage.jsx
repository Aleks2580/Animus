import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.css";
import { Link, useParams } from "react-router-dom";
import { usePosts } from "../../constants/BlogConstants";
import { Button, Skeleton } from "antd";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient";

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const { blogId } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async() => {
      try {
        const { data, error } = await supabase
          .from("Posts")
          .select("*")
          .eq("language", i18n.language)
          .eq("post_id", blogId )
          .single(); 

        if (error) {
          throw new Error("Error fetching blog:", error);
        } else {
          setBlog(data);
        }
      } catch (error) {
        throw new Error("Error fetching blog:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()

  }, [blogId, i18n.language])

  return loading ? (
    <div className={styles.blogPost}>
      <Link to='/blogs'>
       <Button className={styles.backButton} type="primary" icon={<IoIosArrowRoundBack className={styles.backButtonIcon} />} iconPosition='start'>
       {t("productPage.backButton")}
        </Button>
      </Link>
  
      <div className={styles.headerSection}>
      <div className={styles.imageWrapper}>
        <Skeleton.Node active
          style={{ width: "300px", height: "300px"}}
        />
      </div>
        <div className={styles.headerContent}>
        <Skeleton active title={{ width: "80%" }} paragraph={{ rows: 4 }} />
        </div>
      </div>

      <div
        className={styles.content}
      ><Skeleton active paragraph={{ rows: 4 }} /></div>
    </div>
  ) : blog ? (
    <div className={styles.blogPost}>
      <Link to='/blogs'>
       <Button className={styles.backButton} type="primary" icon={<IoIosArrowRoundBack className={styles.backButtonIcon} />} iconPosition='start'>
            back
        </Button>
      </Link>
  
      <div className={styles.headerSection}>
        <img src={blog.image} alt={blog.title} className={styles.image} />
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{blog.title}</h1>
          <p className={styles.date}>{blog.created_at}</p>
          <p>{blog.intro}</p>
        </div>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  ) : (
    <div className={styles.error}>Blog not found!</div>
  )
}
