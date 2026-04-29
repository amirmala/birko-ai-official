import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PassGen from "./pages/PassGen"; 
import WifiGen from "./pages/WifiGen"; 
import TextToSpeech from "./pages/TextToSpeech"; 
import PasswordChecker from "./pages/PasswordChecker"; 
import CodeMinifier from "./pages/CodeMinifier"; 
import ImageGen from "./pages/ImageGen"; 
import "./App.css";

// 1. تهيئة جوجل أناليتكس (مرة واحدة فقط)
ReactGA.initialize("G-G7E1GZPJTF");

// 2. Component لحل مشكلة الـ Scroll وتتبع الصفحات (الرادار)
const AppTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // حل مشكلة الموبايل: أول ما الصفحة تتغير اطلّع فوق خالص
    window.scrollTo(0, 0);

    // تسجيل زيارة الصفحة في جوجل أناليتكس
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
      {/* استدعاء الـ Tracker جوه الـ Router */}
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;