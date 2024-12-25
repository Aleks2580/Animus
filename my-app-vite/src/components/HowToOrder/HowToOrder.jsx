// import React, { useState } from "react";
// import { useProducts } from "../../constants/ProductsConstants";
// import { Steps, message } from 'antd';
// import styles from "./HowToOrder.module.css";



// export default function HowToOrder() {
//   const products = useProducts(); 
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     street: "",
//     city: "",
//     postCode: "",
//     items: products.map((product) => ({
//       id: product.id,
//       name: product.name,
//       price: parseFloat(product.price.replace("$", "")),
//       quantity: null,
//     })),
//   });

//   const [messageApi, contextHolder] = message.useMessage();
//   const success = () => {
//     messageApi.open({
//       type: 'success',
//       content: 'Thank you! We will get back to you shortly.',
//     });
//   };
//   const error = () => {
//     messageApi.open({
//       type: 'error',
//       content: 'Please select at least one product to order.',
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleQuantityChange = (id, quantity) => {
//     const updatedItems = formData.items.map((item) =>
//       item.id === id ? { ...item, quantity: parseInt(quantity, 10) || 0 } : item
//     );
//     setFormData({ ...formData, items: updatedItems });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const selectedItems = formData.items.filter((item) => item.quantity > 0);
//     if (selectedItems.length === 0) {
//       error();
//       return;
//     }
//     console.log("Order submitted:", { ...formData, items: selectedItems });
//     success();
//   };

//   const calculateTotal = () => {
//     return formData.items
//       .reduce((sum, item) => sum + item.price * item.quantity, 0)
//       .toFixed(2); // Total sum with two decimal places
//   };

//   const current = (() => {
//     const isPersonalInfoComplete =
//       formData.name &&
//       formData.email &&
//       formData.phone &&
//       formData.street &&
//       formData.country &&
//       formData.postCode &&
//       formData.city;
  
//     const isProductSelected = formData.items.some((item) => item.quantity > 0);
  
//     if (!isPersonalInfoComplete) {
//       return 0; // Stay at step 1 if personal info is incomplete
//     } else if (!isProductSelected) {
//       return 1; // Highlight step 2 if no product is selected
//     } else {
//       return 2; // Move to step 3 when everything is filled
//     }
//   })();

//   return (
//     <div className={styles.howToOrder}>
//       {contextHolder}
//       <h1 className={styles.title}>How To Order</h1>
//       <p className={styles.disclaimer}>
//         The payment system is under development. For now, simply fill out the
//         form, and we will get back to you shortly!
//       </p>
//       <div className={styles.stepsWrapper}>
//       <Steps
//   className={styles.steps}
//   current={current}
//   items={[
//     {
//       title: "Step 1",
//       description: "Fill in your personal information",
//     },
//     {
//       title: "Step 2",
//       description: "Choose your products",
//     },
//     {
//       title: "Step 3",
//       description: "Submit your order",
//     },
//   ]}
// />
//   </div>
//       <form className={styles.orderForm} onSubmit={handleSubmit}>
//         {/* Name Field */}
//         <div className={styles.formGroupWrapper}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             required
//           />
//         </div>

//         {/* Email Field */}
//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//   <label htmlFor="country">Country:</label>
//   <input
//     type="text"
//     id="country"
//     name="country"
//     value={formData.country || ""}
//     onChange={handleChange}
//     placeholder="Your Country"
//     required
//   />
// </div>

//         {/* Phone Field */}
//         <div className={styles.formGroup}>
//           <label htmlFor="phone">Phone:</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Your Phone Number"
//             required
//           />
//         </div>

//         {/* Address Field */}
//    {/* Post Code Field */}
// <div className={styles.formGroup}>
//   <label htmlFor="postCode">Post Code:</label>
//   <input
//     type="text"
//     id="postCode"
//     name="postCode"
//     value={formData.postCode || ""}
//     onChange={handleChange}
//     placeholder="Your Post Code"
//     required
//   />
// </div>

// {/* City Field */}
// <div className={styles.formGroup}>
//   <label htmlFor="city">City:</label>
//   <input
//     type="text"
//     id="city"
//     name="city"
//     value={formData.city || ""}
//     onChange={handleChange}
//     placeholder="Your City"
//     required
//   />
// </div>

// {/* Street Field */}
// <div className={styles.formGroup}>
//   <label htmlFor="street">Street:</label>
//   <input
//     type="text"
//     id="street"
//     name="street"
//     value={formData.street || ""}
//     onChange={handleChange}
//     placeholder="Your Street"
//     required
//   />
// </div>


//         </div>
//         {/* Product Selection */}
//         <div className={styles.productSelection}>
//           {/* <h3>Products:</h3> */}
//           {products.map((product) => (
//             <div key={product.id} className={styles.productItem}>
//               <img src={product.image} alt={product.name} className={styles.productImage} />
//               <div className={styles.productInfo}>
//                 <p>{product.name}</p>
//                 <p className={styles.productPrice}>{product.price}</p>
//                 <input
//                   type="number"
//                   min="0"
//                   value={
//                     formData.items.find((item) => item.id === product.id).quantity
//                   }
//                   onChange={(e) =>
//                     handleQuantityChange(product.id, e.target.value)
//                   }
//                   placeholder="Quantity"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Total Price */}
//         <div>
//         <div className={styles.totalPrice}>
//           <h3>Total: ${calculateTotal()}</h3>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className={styles.submitButton}>
//           Submit Order
//         </button>
//         </div>
//       </form>
//       </div>
//   );
// }
// 
import React, { useState } from "react";
import { useProducts } from "../../constants/ProductsConstants";
import { useCountries } from "../../constants/useCountries";
import { Steps, message } from "antd";
import styles from "./HowToOrder.module.css";

export default function HowToOrder() {
  const products = useProducts();
  const countries = useCountries();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: { code: "", number: "" }, // Combined phone code and number
    country: "",
    street: "",
    city: "",
    postCode: "",
    items: products.map((product) => ({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace("$", "")),
      quantity: null,
    })),
  });

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thank you! We will get back to you shortly.",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please select at least one product to order.",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      phone: { ...formData.phone, [name]: value },
    });
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
      error();
      return;
    }
    console.log("Order submitted:", { ...formData, items: selectedItems });
    success();
  };

  const calculateTotal = () => {
    return formData.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2); // Total sum with two decimal places
  };

  const current = (() => {
    const isPersonalInfoComplete =
      formData.name &&
      formData.email &&
      formData.phone.code &&
      formData.phone.number &&
      formData.street &&
      formData.country &&
      formData.postCode &&
      formData.city;

    const isProductSelected = formData.items.some((item) => item.quantity > 0);

    if (!isPersonalInfoComplete) {
      return 0; // Stay at step 1 if personal info is incomplete
    } else if (!isProductSelected) {
      return 1; // Highlight step 2 if no product is selected
    } else {
      return 2; // Move to step 3 when everything is filled
    }
  })();

  return (
    <div className={styles.howToOrder}>
      {contextHolder}
      <h1 className={styles.title}>How To Order</h1>
      <p className={styles.disclaimer}>
        The payment system is under development. For now, simply fill out the
        form, and we will get back to you shortly!
      </p>
      <div className={styles.stepsWrapper}>
        <Steps
          className={styles.steps}
          current={current}
          items={[
            {
              title: "Step 1",
              description: "Fill in your personal information",
            },
            {
              title: "Step 2",
              description: "Choose your products",
            },
            {
              title: "Step 3",
              description: "Submit your order",
            },
          ]}
        />
      </div>
      <form className={styles.orderForm} onSubmit={handleSubmit}>
        <div className={styles.formGroupWrapper}>
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

          {/* Country Dropdown */}
          <div className={styles.formGroup}>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Field */}
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone:</label>
            <div className={styles.phoneWrapper}>
              <select
                name="code"
                value={formData.phone.code}
                onChange={handlePhoneChange}
                className={styles.phoneCode}
                required
              >
                <option value="">Code</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="number"
                value={formData.phone.number}
                onChange={handlePhoneChange}
                placeholder="Your Phone Number"
                className={styles.phoneInput}
                required
              />
            </div>
          </div>

          {/* Address Fields */}
          <div className={styles.formGroup}>
            <label htmlFor="postCode">Post Code:</label>
            <input
              type="text"
              id="postCode"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              placeholder="Your Post Code"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your City"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Your Street"
              required
            />
          </div>
        </div>

        {/* Product Selection */}
        <div className={styles.productSelection}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <p>{product.name}</p>
                <p className={styles.productPrice}>{product.price}</p>
                <input
                  type="number"
                  min="0"
                  value={
                    formData.items.find((item) => item.id === product.id)
                      .quantity
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
        <div>
          <div className={styles.totalPrice}>
            <h3>Total: ${calculateTotal()}</h3>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}



