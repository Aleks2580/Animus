import React, { useState, useEffect } from "react";
import { useCountries } from "../../constants/useCountries";
import { Steps, message, Skeleton } from "antd";
import styles from "./HowToOrder.module.css";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { supabase } from "../../supabaseClient";


export default function HowToOrder() {
  const { t, i18n } = useTranslation();
  const countries = useCountries();
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true)
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: { code: "", number: "" },
    country: "",
    street: "",
    city: "",
    postCode: "",
    items: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("Products")
          .select("id, name, price, image")
          .eq("language", i18n.language)
          .eq("instock", true); 

        if (error) {
          throw new Error("Error fetching product:", error);
        } else {
          setFormData({...formData, items: data.map((product) => ({
                id: product.id,
                name: product.name,
                image: product.image,
                price: parseFloat(product.price.replace("¥", "")),
                quantity: 0,
              }))})
        }
      } catch (err) {
        throw new Error("Error fetching product:", error);
      } finally {
        // setLoading(false);
        setLoadingProducts(false)
      }
    };

    fetchProducts();
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: t("how_to_order.messages.success"),
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: t("how_to_order.messages.error"),
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
      item.id === id
        ? { ...item, quantity: quantity === "" ? 0 : parseInt(quantity, 10) }
        : item
    );
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateTotal = () => {
    return formData.items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = formData.items.filter((item) => item.quantity > 0);
    if (selectedItems.length === 0) {
      error();
      return;
    } else {
      setLoading(true);
      emailjs
        .send(
          import.meta.env.VITE_EMAIL_SERVICE_NAME,
          import.meta.env.VITE_EMAIL_TEMPLATE,
          {
            from_name: formData.name,
            from_email: formData.email,
            from_code: formData.phone.code,
            from_phone: formData.phone.number,
            from_country: formData.country,
            from_street: formData.street,
            from_city: formData.city,
            from_postcode: formData.postCode,
            from_items: formData.items
              .filter((item) => item.quantity > 0)
              .map(
                (item) =>
                  `${item.name} (x${item.quantity}) - ¥${
                    item.price * item.quantity
                  }`
              )
              .join(", "),
            from_total: calculateTotal(),
          },
          import.meta.env.VITE_EMAIL_PRIVATE_KEY
        )
        .then(
          () => {
            setLoading(false);
            success();
            setFormData({
              name: "",
              email: "",
              phone: { code: "", number: "" },
              country: "",
              street: "",
              city: "",
              postCode: "",
              items: formData.items.map((product) => ({
                ...product,
                quantity: 0,
              })),
            });
          },
          (error) => {
            setLoading(false);
            messageApi.open({
              type: "warning",
              content: (
                <>
                  {t("how_to_order.messages.warning")}{" "}
                  <a
                    href="https://tawk.to/chat/67876644825083258e054b51/1ihkef022"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("how_to_order.messages.supportTeam")}
                  </a>
                  .
                </>
              ),
            });
          }
        );
    }
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
      <h1 className={styles.title}>{t("how_to_order.title")}</h1>
      <p className={styles.disclaimer}>{t("how_to_order.disclaimer")}</p>
      <div className={styles.stepsWrapper}>
        <Steps
          className={styles.steps}
          current={current}
          items={[
            {
              title: t("how_to_order.steps.step1_title"),
              description: t("how_to_order.steps.step1_description"),
            },
            {
              title: t("how_to_order.steps.step2_title"),
              description: t("how_to_order.steps.step2_description"),
            },
            {
              title: t("how_to_order.steps.step3_title"),
              description: t("how_to_order.steps.step3_description"),
            },
          ]}
        />
      </div>
      <form className={styles.orderForm} onSubmit={handleSubmit}>
        <div className={styles.formGroupWrapper}>
          <div className={styles.formGroup}>
            <label htmlFor="name">{t("how_to_order.form.name_label")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("how_to_order.form.name_placeholder")}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">{t("how_to_order.form.email_label")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("how_to_order.form.email_label")}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">
              {t("how_to_order.form.country_label")}
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">
                {t("how_to_order.form.country_placeholder")}
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">{t("how_to_order.form.phone_label")}</label>
            <div className={styles.phoneWrapper}>
              <select
                name="code"
                value={formData.phone.code}
                onChange={handlePhoneChange}
                className={styles.phoneCode}
                required
              >
                <option value="">
                  {t("how_to_order.form.phone_code_placeholder")}
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="number"
                value={formData.phone.number}
                onChange={handlePhoneChange}
                placeholder={t("how_to_order.form.phone_number_placeholder")}
                className={styles.phoneInput}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postCode">
              {t("how_to_order.form.post_code_label")}
            </label>
            <input
              type="text"
              id="postCode"
              name="postCode"
              value={formData.postCode}
              onChange={handleChange}
              placeholder={t("how_to_order.form.post_code_placeholder")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="city">{t("how_to_order.form.city_label")}</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={t("how_to_order.form.city_placeholder")}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="street">
              {t("how_to_order.form.street_label")}
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder={t("how_to_order.form.street_placeholder")}
              required
            />
          </div>
        </div>

      
          <div className={styles.productSelection}>
            {loadingProducts ? (
             
            <Skeleton.Node active style={{ width: "237.5px", height: "500px"}} className={styles.sketeton} />
         

             ) : (
             formData.items?.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <p>{product.name}</p>
                  <p className={styles.productPrice}>¥{product.price}</p>
                  <input
                    type="number"
                    min="0"
                  
                    value={product.quantity || 0}
                    
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    placeholder={t("how_to_order.product.quantity_placeholder")}
                  />
                </div>
              </div>
            )))
            }
         
        </div>
        
       

        <div>
          <div className={styles.totalPrice}>
            <h3>
              {t("how_to_order.product.total_price")} ¥{calculateTotal()}
            </h3>
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading
              ? `${t("how_to_order.buttons.sending")}`
              : `${t("how_to_order.buttons.submit")}`}
          </button>
        </div>
      </form>
    </div>
  );
}
