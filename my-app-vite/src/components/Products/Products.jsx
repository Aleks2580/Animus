import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import styles from "./Products.module.css";
import { supabase } from "../../supabaseClient";
import { Skeleton } from "antd";

export default function Products() {
  const chosenLanguage = localStorage.getItem("language") || "zh-CN";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("Products")
          .select("*")
          .eq("language", chosenLanguage)
          .eq("instock", true) // Filter by language

        if (error) {
          throw new Error("Error fetching product:", error);
        } else {
          setProducts(data); 
        }
      } catch (err) {
        throw new Error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [chosenLanguage]); 

  return (
    <div className={styles.products}>
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.skeletonWrapper}>
                  <Skeleton.Node active
          style={{ width: "240px", height: "250px"}}
        />
            </div>
          ))
        : products?.map((product) => (
            <OneProduct key={product.id} {...product} />
          ))}
    </div>
  );
}

