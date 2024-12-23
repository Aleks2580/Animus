import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import i18n from "i18next";
import HeroSection from "./components/HeroSection/Hero";
import SubHero from "./components/SubHero/SubHero";
import "./App.css";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import { FloatButton } from "antd";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import ContactIcons from "./components/ContactIcons/ContactIcons";
import ProductPage from "./components/Products/ProductPage";
import Faq from "./components/Faq/Faq";
import Blog from "./components/Blog/Blog";
import About from "./components/About/About";
import HowToOrder from "./components/HowToOrder/HowToOrder"

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ContactIcons/>
    </>
  );
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "CN"
  );

  const handleLanguage = () => {
    const newLanguage = selectedLanguage === "EN" ? "CN" : "EN"; // Toggle between EN and CN
    localStorage.setItem("language", newLanguage); // Store language preference
    setSelectedLanguage(newLanguage); // Update state
    i18n.changeLanguage(newLanguage); // Change i18next language
  };

  return (
    <>
      <span className={styles.language} onClick={handleLanguage}>
        {selectedLanguage === "EN" ? "中文" : "EN"}
      </span>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <HeroSection />
                <div id="subhero">
                  <SubHero />
                </div>
              </>
            }
          />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="about" element={<About />} />
          <Route path="order" element={<HowToOrder />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="faq" element={<Faq />} />
        </Route>
      </Routes>
      <FloatButton.BackTop className={styles.floatButton} />
    </>
  );
}

export default App;
