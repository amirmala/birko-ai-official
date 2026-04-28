import React, { useEffect } from "react"; // ضفنا useEffect هنا
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ReactGA from "react-ga4"; // استيراد المكتبة
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

// تهيئة جوجل أناليتكس بالـ ID الجديد بتاعك
ReactGA.initialize("G-G7E1GZPJTF");

// Component صغير لمراقبة تغيير الصفحات
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // بيبعت لجوجل إن المستخدم دخل صفحة معينة كل ما اللينك يتغير
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <AnalyticsTracker /> {/* تتبع حركة المستخدم بين الصفحات */}
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