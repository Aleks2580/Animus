import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import i18n from "i18next";
import HeroSection from "./components/HeroSection/Hero";
import About from "./components/About/About";
import "./App.css";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import { FloatButton } from "antd";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
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
      
      {/* <HeroSection />
      <div id="about">
        <About />
      </div> */}
    
      <FloatButton.BackTop />

      <Routes>
        <Route path="/" element={<Layout />}>
        <Route
            index
            element={
              <>
                <HeroSection />
                <div id="about">
                  <About />
                </div>
              </>
            }
          />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
