import "./theme.css";
import React, { useState, createContext, useEffect, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import i18n from "i18next";
import { BulbOutlined } from "@ant-design/icons";
import HeroSection from "./components/HeroSection/Hero";
import SubHero from "./components/SubHero/SubHero";
import Navbar from "./components/Navbar/Navbar";
import { FloatButton } from "antd";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import ContactIcons from "./components/ContactIcons/ContactIcons";
import ProductPage from "./components/Products/ProductPage";
import Faq from "./components/Faq/Faq";
import Blog from "./components/Blog/Blog";
import About from "./components/About/About";
import HowToOrder from "./components/HowToOrder/HowToOrder";
import styles from "./App.module.css";
import BlogPage from "./components/Blog/BlogPage";
import ScrollToTop from "./components/ScrollToTop";



// Create a context for theme
export const ThemeContext = createContext();

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ContactIcons />
    </>
  );
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "CN"
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLanguage = () => {
    const newLanguage = selectedLanguage === "EN" ? "CN" : "EN"; // Toggle between EN and CN
    localStorage.setItem("language", newLanguage); // Store language preference
    setSelectedLanguage(newLanguage); // Update state
    i18n.changeLanguage(newLanguage); // Change i18next language
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme); // Optional: Apply theme to body
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={styles.app}>
        <div className={styles.switches}>
          {/* Theme Toggle Icon */}
          <BulbOutlined
            style={{
              fontSize: "16px",
              color: theme === "light" ? "#000000" : "#fff",
              cursor: "pointer",
            }}
            onClick={toggleTheme}
          />

          {/* Language Switch */}
          <span className={styles.language} onClick={handleLanguage}>
            {selectedLanguage === "EN" ? "中文" : "EN"}
          </span>
        </div>
        <ScrollToTop />
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
            <Route path="blogs/:blogId" element={<BlogPage />} />
            <Route path="faq" element={<Faq />} />
          </Route>
        </Routes>

        <FloatButton.BackTop className={styles.floatButton} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;