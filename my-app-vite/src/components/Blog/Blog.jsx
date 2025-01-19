import React, {useEffect, useState} from "react";
import OneBlog from "./OneBlog";
import styles from "./Blog.module.css";
import { supabase } from "../../supabaseClient";
import { Skeleton } from "antd";

export default function Blog() {
  const chosenLanguage = localStorage.getItem("language") || "zh-CN";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const {data, error} = await supabase
        .from("Posts")
        .select("*")
        .eq("language", chosenLanguage)
        .order("created_at", { ascending: false });

        if (error) {
          throw new Error('"Error fetching data:", error')
        } else {
          setPosts(data); 
        }

      } catch (error) {
        throw new Error('"Error fetching data:", error')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()

  }, [chosenLanguage])

  return (
    <section className={styles.blogSection}>
       <h2 className={styles.sectionTitle}>BLOG</h2>
       <div className={styles.flexContainer}>
    {loading 
     ? Array.from({length:4}).map((_, index) => (
      <div key={index} className={styles.skeletonWrapper}>
                  <Skeleton.Node active
          style={{ width: "300px", height: "450px"}}
        />
            </div>
     ))
    
       : posts.map((post) => (
      <OneBlog key={post.id} {...post} />
    ))}
    </div>
    </section>
  );
}
