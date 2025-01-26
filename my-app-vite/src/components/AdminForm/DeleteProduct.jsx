import React, { useState, useEffect } from "react";
import styles from "./DeleteProduct.module.css";
import { supabase } from "../../supabaseClient";
import { Button, message, Popconfirm  } from "antd";



export default function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); 
  const [popConfirmVisible, setPopConfirmVisible] = useState(false); 

  useEffect(() => {
    const fetchProductsToDelete = async () => {
      try {
        const { data, error } = await supabase
        .from("Products")
        .select("name, language, id")
        .order("name", { ascending: true });
      
      console.log(data)
      if (error) {
        throw new Error("Error fetching product: " + error.message);
      } else {
        setProducts(data); 
      }
      } catch (error) {
        throw new Error("Error fetching product:", error);
      } 
    };
    
    fetchProductsToDelete();
    
  }, []); 

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    console.log(product)
    setPopConfirmVisible(true);
  };

  const handleConfirm = async () => {
    if (!currentProduct) return;

    try {
      // Delete from Supabase
      const { error } = await supabase
        .from("Products")
        .delete()
        .eq("id", currentProduct.id);

      if (error) {
        throw new Error("Delete error: " + error.message);
      }

      // Update local state to remove deleted product
      setProducts((prev) => prev.filter(p => p.id !== currentProduct.id));
      message.success(`Deleted product: ${currentProduct.name}`);
    } catch (err) {
      message.error("Failed to delete: " + err.message);
    } finally {
      // Hide popconfirm
      setPopConfirmVisible(false);
      setCurrentProduct(null);
    }
  };

  // Cancel - hide popconfirm
  const handleCancel = () => {
    message.info("Deletion cancelled");
    setPopConfirmVisible(false);
    setCurrentProduct(null);
  };


  return (
    <div className={styles.deleteForm}>
       
 
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
            <p>{product.name}</p>
            <p>{product.language}</p>
            <Button onClick={() => handleDeleteClick(product)}>delete</Button>
           
        </div>
      )
      )}
       <Popconfirm
        title="Delete the product"
        description={
          currentProduct
            ? `Are you sure you want to delete "${currentProduct.name}"?`
            : "Are you sure to delete?"
        }
        open={popConfirmVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        className={styles.popConfirm}
      />
    </div>
  );
}
