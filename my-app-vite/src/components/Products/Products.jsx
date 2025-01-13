// import React, { useEffect, useState } from "react";
// import OneProduct from "./OneProduct";
// import styles from "./Products.module.css";
// import { supabase } from "../../supabaseClient";
// import { useProducts } from "../../constants/ProductsConstants";
// // import { useProducts } from "../../constants/ProductsConstants";

// export default function Products() {
//   const chosenLanguage = localStorage.getItem("language") || "zh-CN";
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const products = useProducts()

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("Products")
//           .select("*")
//           .eq("language", chosenLanguage); // Filter by language

//         if (error) {
//           console.error("Error fetching data:", error);
//         } else {
//           console.log("Fetched data:", data);
//           setProducts(data); // Correct placement of setProducts
//         }
//       } catch (err) {
//         console.error("Unexpected error:", err);
//       } finally {
//         setLoading(false)
//       }
//     };
 
//     fetchProducts();
//   }, [chosenLanguage]); // Add chosenLanguage as a dependency

//   return  (
//     <div className={styles.products}>
//     {products?.map((product) => (
//       <OneProduct key={product.id} {...product} />
//     ))}
//   </div>
//   )
// }
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
          .eq("language", chosenLanguage); // Filter by language

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Fetched data:", data);
          setProducts(data); // Correct placement of setProducts
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [chosenLanguage]); // Add chosenLanguage as a dependency

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
        : products.map((product) => (
            <OneProduct key={product.id} {...product} />
          ))}
    </div>
  );
}

