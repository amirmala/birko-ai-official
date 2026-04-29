import  { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Power Up with <span className="highlight">BirkoTools</span></h1>
          <p>
            Your all-in-one workstation for AI generation, smart security, and 
            developer utilities. Fast, private, and always evolving.
          </p>
          <button className="main-btn" onClick={() => scrollToSection('tools')}>
            Explore Toolkit
          </button>
        </div>
      </header>

      {/* 2. Tools Section */}
      <section id="tools" className="tools-section">
        <h2 className="section-title">Smart Digital Toolkit</h2>

        <div className="tools-grid">
          {/* Data Cleaner */}
          <div className="tool-card">
            <div className="card-icon">📊</div>
            <h3>Data Analysis - Data Cleaning</h3>
            <p>Analyze, clean duplicates, and format your Excel/CSV files instantly.</p>
            <Link to="/data-cleaner" className="card-btn">Use Tool</Link>
          </div>

          {/* Password Generator */}
          <div className="tool-card">
            <div className="card-icon">🔐</div>
            <h3>Password Generator</h3>
            <p>Create unbreakable, randomized passwords instantly.</p>
            <Link to="/password-generator" className="card-btn">Use Tool</Link>
          </div>

          {/* Text to Speech */}
          <div className="tool-card">
            <div className="card-icon">🎙️</div>
            <h3>Text to Speech</h3>
            <p>Convert your written content into natural-sounding audio instantly.</p>
            <Link to="/text-to-speech" className="card-btn">Convert Now</Link>
          </div>

          {/* AI Image Generator */}
          <div className="tool-card">
            <div className="card-icon">🎨</div>
            <h3>AI Image Generator</h3>
            <p>Create stunning visuals from text prompts using advanced AI models.</p>
            <Link to="/image-generator" className="card-btn">Generate AI</Link>
          </div>

          {/* WiFi QR Generator */}
          <div className="tool-card">
            <div className="card-icon">📶</div>
            <h3>WiFi QR Generator</h3>
            <p>Convert your WiFi info into a printable QR code for easy access.</p>
            <Link to="/wifi-generator" className="card-btn">Use Tool</Link>
          </div>

          {/* Strength Checker */}
          <div className="tool-card">
            <div className="card-icon">🔍</div>
            <h3>Strength Checker</h3>
            <p>Analyze your password security level with our advanced algorithm.</p>
            <Link to="/strength-checker" className="card-btn">Use Tool</Link>
          </div>

          {/* Code Minifier */}
          <div className="tool-card">
            <div className="card-icon">⚡</div>
            <h3>Code Minifier</h3>
            <p>Optimize your code for maximum performance and speed.</p>
            <Link to="/code-minifier" className="card-btn">Use Tool</Link>
          </div>
        </div>
      </section>

      {/* 3. About Us Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">Why <span className="highlight">BirkoTools</span>?</h2>
            <p>
              BirkoTools was built to simplify the digital workflow. We provide a 
              versatile set of tools that help developers and creative users 
              achieve more in less time, without compromising on privacy or quality.
            </p>
            <div className="about-features">
              <div className="feature-item"><span>✔️</span> Privacy First</div>
              <div className="feature-item"><span>✔️</span> Pro Features</div>
              <div className="feature-item"><span>✔️</span> Clean UI</div>
            </div>
          </div>
          <div className="about-image">
              <div className="about-box-deco">BT</div>
          </div>
        </div>
      </section>

      {/* 4. Contact Us Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">Have a question or a project idea? Drop us a message!</p>
          
          <div className="contact-wrapper">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="How can we help you?" rows="5" required></textarea>
              <button type="submit" className="main-btn">Send Message</button>
            </form>

            <div className="contact-info">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div>
                  <h4>Email Us</h4>
                  {/* تم تحديث الرابط ليفتح Gmail مباشرة */}
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=berkotools@gmail.com&su=Inquiry from BirkoTools Web" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-info-link"
                  >
                    berkotools@gmail.com
                  </a>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🌐</span>
                <div>
                  <h4>Social Media</h4>
                  <p>Follow us on LinkedIn & GitHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;