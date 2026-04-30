import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { Analytics } from "@vercel/analytics/react"; // 1. استيراد فيرسيل أناليتكس
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PassGen from "./pages/PassGen"; 
import WifiGen from "./pages/WifiGen"; 
import TextToSpeech from "./pages/TextToSpeech"; 
import PasswordChecker from "./pages/PasswordChecker"; 
import CodeMinifier from "./pages/CodeMinifier"; 
import ImageGen from "./pages/ImageGen"; 
import DataCleaner from "./pages/DataCleaner"; 
import "./App.css";

// تهيئة جوجل أناليتكس
ReactGA.initialize("G-G7E1GZPJTF");

const AppTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <AppTracker /> 
      <div className="App-wrapper">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password-generator" element={<PassGen />} />
            <Route path="/strength-checker" element={<PasswordChecker />} />
            <Route path="/wifi-generator" element={<WifiGen />} />
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/code-minifier" element={<CodeMinifier />} />
            <Route path="/image-generator" element={<ImageGen />} />
            <Route path="/data-cleaner" element={<DataCleaner />} /> 
          </Routes>
        </main>

        <Footer />
        {/* 2. إضافة التحليلات هنا عشان تشتغل مع كل الصفحات */}
        <Analytics /> 
      </div>
    </Router>
  );
}

export default App;