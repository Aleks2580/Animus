import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import i18n from "i18next";
import HeroSection from './components/HeroSection/Hero';
import Products from './components/Products/Products';
import './App.css';
import styles from './App.module.css'


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
     <span className={styles.language} onClick={handleLanguage}>{selectedLanguage === "EN" ? "中文" : "EN"}</span>
    <HeroSection />
      <div id='products'>
      <Products  />
      </div>
        {/* <Routes>
            <Route path="/learn-more" element={<LearnMorePage />} />
            <Route path="/start-journey" element={<StartJourneyPage />} />
        </Routes> */}
    </>
    );
}

export default App;