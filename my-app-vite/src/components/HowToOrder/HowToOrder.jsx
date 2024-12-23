import React, { useState } from "react";
import { useProducts } from "../../constants/ProductsConstants";
import styles from "./HowToOrder.module.css";

export default function HowToOrder() {
  const products = useProducts(); // Get product data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    items: products.map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace("$", "")), // Extract numeric price
      quantity: null, // Default quantity is 0 for each product
    })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedItems = formData.items.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(quantity, 10) || 0 } : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = formData.items.filter((item) => item.quantity > 0);
    if (selectedItems.length === 0) {
      alert("Please select at least one product to order.");
      return;
    }
    console.log("Order submitted:", { ...formData, items: selectedItems });
    alert("Thank you! We will get back to you shortly.");
  };

  const calculateTotal = () => {
    return formData.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2); // Total sum with two decimal places
  };

  return (
    <div className={styles.howToOrder}>
      <h1 className={styles.title}>How To Order</h1>
      <p className={styles.disclaimer}>
        The payment system is under development. For now, simply fill out the
        form, and we will get back to you shortly!
      </p>

      <form className={styles.orderForm} onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </div>

        {/* Phone Field */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
          />
        </div>

        {/* Address Field */}
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Product Selection */}
        <div className={styles.productSelection}>
          <h3>Products:</h3>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productInfo}>
                <p>{product.name}</p>
                <p className={styles.productPrice}>{product.price}</p>
                <input
                  type="number"
                  min="0"
                  value={
                    formData.items.find((item) => item.id === product.id).quantity
                  }
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  placeholder="Quantity"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className={styles.totalPrice}>
          <h3>Total: ${calculateTotal()}</h3>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Submit Order
        </button>
      </form>
    </div>
  );
}
