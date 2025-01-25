import "./theme.css";
import React, {
  useState,
  createContext,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import i18n from "i18next";
import { BulbOutlined } from "@ant-design/icons";
import HeroSection from "./components/HeroSection/Hero";
import Navbar from "./components/Navbar/Navbar";
import { FloatButton, Skeleton, Spin } from "antd";
import Footer from "./components/Footer/Footer";
import ContactIcons from "./components/ContactIcons/ContactIcons";
import styles from "./App.module.css";
import ScrollToTop from "./components/ScrollToTop";
import AdminPanel from "./components/AdminForm/AdminPanel";
import AddProduct from "./components/AdminForm/AddProduct";



const About = lazy(() => import("./components/About/About"));
const SubHero = lazy(() => import("./components/SubHero/SubHero"));
const Products = lazy(() => import("./components/Products/Products"));
const HowToOrder = lazy(() => import("./components/HowToOrder/HowToOrder"));
const ProductPage = lazy(() => import("./components/Products/ProductPage"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const BlogPage = lazy(() => import("./components/Blog/BlogPage"));
const Faq = lazy(() => import("./components/Faq/Faq"));

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

export const ThemeContext = createContext();


function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "zh-CN"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLanguage = () => {
    const newLanguage = selectedLanguage === "en-US" ? "zh-CN" : "en-US";
    localStorage.setItem("language", newLanguage);
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={styles.app}>
        <div className={styles.switches}>
          <BulbOutlined
            style={{
              fontSize: "16px",
              color: theme === "light" ? "#000000" : "#fff",
              cursor: "pointer",
            }}
            onClick={toggleTheme}
          />

          <span className={styles.language} onClick={handleLanguage}>
            {selectedLanguage === "en-US" ? "中文" : "EN"}
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
                    <Suspense fallback={<Skeleton active />}>
                      <SubHero />
                    </Suspense>
                  </div>
                </>
              }
            />
            <Route path="/admin" element={<AdminPanel/>}>
               <Route path="add-product" element={<AddProduct/>}/>
         
            </Route>
            <Route
              path="products"
              element={
                <Suspense
                fallback={
                  <div className={styles.skeletonFullPage}>
                    <Skeleton.Node active style={{ width: "100vw", height: "90vh" }} />
                  </div>
                }
              >
                <Products />
              </Suspense>
              }
            />
            <Route
              path="products/:productName"
              element={
                <Suspense fallback={
                  <div className={styles.skeletonFullPage}>
                  <Skeleton.Node active />
                </div>
                }>
                  <ProductPage />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={
                  <div className={styles.skeletonFullPage}>
                  <Skeleton.Node active style={{ width: "100vw", height: "90vh" }}  />
                </div>
                }>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="order"
              element={
                <Suspense fallback={
                  <div className={styles.skeletonFullPage}>
                  <Skeleton.Node active style={{ width: "100vw", height: "90vh" }}  />
                </div>
                }>
                  <HowToOrder />
                </Suspense>
              }
            />
            <Route
              path="blogs"
              element={
                <Suspense fallback={
                  <div className={styles.skeletonFullPage}>
                  <Skeleton.Node active style={{ width: "100vw", height: "90vh" }}  />
                </div>
                }>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="blogs/:blogId"
              element={
                <Suspense fallback={
                  <div className={styles.skeletonFullPage}>
                  <Skeleton.Node active style={{ width: "100vw", height: "90vh" }}  />
                </div>
                }>
                  <BlogPage />
                </Suspense>
              }
            />
            <Route path="faq" element={
               <Suspense fallback={
                <div className={styles.skeletonFullPage}>
                <Skeleton.Node active style={{ width: "100vw", height: "90vh" }}  />
              </div>
               }>
               <Faq />
             </Suspense>
            } />
          </Route>
        </Routes>

        <FloatButton.BackTop className={styles.floatButton} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

