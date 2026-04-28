import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // استيراد Link للريندر السريع
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // دالة صغيرة عشان لما ندوس على لينك والسيكشن موجود في نفس الصفحة يعمل Scroll Smooth
  const handleScroll = (e, targetId) => {
    setIsOpen(false); // قفل ميو الموبايل
    
    // لو إنت في الصفحة الرئيسية فعلاً
    if (window.location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // لو في صفحة تانية (زي الباسورد)، الـ Link to="/#id" هيقوم بالواجب ويرجعك
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* اللوجو يرجعك للهوم دايماً */}
        <Link to="/" className="logo-link">
          <h1 className="logo">Birko<span>Tools</span></h1>
        </Link>

        <button 
          className={`menu-icon ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "mobile-open" : ""}`}>
          {/* Home ترجعك لـ / */}
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>

          {/* اللينكات بتبدأ بـ /# عشان تشتغل من أي صفحة */}
          <li>
            <Link to="/#about" onClick={(e) => handleScroll(e, 'about')}>About Us</Link>
          </li>

          <li>
            <Link to="/#tools" onClick={(e) => handleScroll(e, 'tools')}>Explore Tools</Link>
          </li>

          <li>
            <Link 
              to="/#contact" 
              className="nav-contact-btn" 
              onClick={(e) => handleScroll(e, 'contact')}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;