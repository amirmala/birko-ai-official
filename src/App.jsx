import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PassGen from "./pages/PassGen"; 
import WifiGen from "./pages/WifiGen"; 
import TextToSpeech from "./pages/TextToSpeech"; 
import PasswordChecker from "./pages/PasswordChecker"; 
import CodeMinifier from "./pages/CodeMinifier"; 
import ImageGen from "./pages/ImageGen"; // استيراد الأداة الجديدة (الذكاء الاصطناعي)
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App-wrapper">
        {/* التنقل الثابت في كل الصفحات */}
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* الصفحة الرئيسية */}
            <Route path="/" element={<Home />} />
            
            {/* أداة توليد كلمات المرور */}
            <Route path="/password-generator" element={<PassGen />} />
            
            {/* أداة فحص قوة كلمة المرور */}
            <Route path="/strength-checker" element={<PasswordChecker />} />
            
            {/* أداة توليد كود الواي فاي */}
            <Route path="/wifi-generator" element={<WifiGen />} />
            
            {/* أداة تحويل النص إلى صوت (AI Voice Studio) */}
            <Route path="/text-to-speech" element={<TextToSpeech />} />

            {/* أداة تصغير الكود */}
            <Route path="/code-minifier" element={<CodeMinifier />} />

            {/* أداة توليد الصور بالذكاء الاصطناعي - الإضافة الجديدة */}
            <Route path="/image-generator" element={<ImageGen />} />
          </Routes>
        </main>

        {/* الفوتر الثابت في كل الصفحات */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;