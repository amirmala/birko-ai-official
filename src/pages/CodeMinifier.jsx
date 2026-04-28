import React, { useState } from 'react';
import './CodeMinifier.css';

const CodeMinifier = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [language, setLanguage] = useState('js');
  const [isCopied, setIsCopied] = useState(false);

  const minifyCode = () => {
    if (!inputCode.trim()) return;
    let minified = inputCode
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '') // حذف التعليقات
      .replace(/\s+/g, ' ') // حذف المسافات الزائدة
      .replace(/\s*([{};:>+,])\s*/g, '$1') // تنظيف الرموز
      .trim();
    setOutputCode(minified);
  };

  return (
    <div className="min-container">
      <div className="min-card">
        <h2 className="min-title">Code Minifier</h2>
        
        <div className="lang-tabs">
          {['js', 'css', 'html', 'py'].map((l) => (
            <button 
              key={l} 
              className={language === l ? 'active' : ''} 
              onClick={() => setLanguage(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <textarea 
          value={inputCode} 
          onChange={(e) => setInputCode(e.target.value)} 
          placeholder="Paste code here..."
        />

        {/* الكروت اللي طلبتها زي الصورة الأولى */}
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">SAVED SPACE</span>
            <span className="info-value">
              {inputCode.length > 0 ? (100 - (outputCode.length / inputCode.length * 100)).toFixed(1) : 0}%
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">FINAL SIZE</span>
            <span className="info-value">{outputCode.length} bytes</span>
          </div>
        </div>

        <div className="min-actions">
          <button className="btn-secondary" onClick={() => {setInputCode(''); setOutputCode('');}}>Clear</button>
          <button className="btn-main" onClick={minifyCode}>Minify Now</button>
          <button className="btn-copy" onClick={() => {
            navigator.clipboard.writeText(outputCode);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}>{isCopied ? '✓' : 'Copy'}</button>
        </div>
        
        {outputCode && <textarea readOnly className="out-area" value={outputCode} />}
      </div>
    </div>
  );
};

export default CodeMinifier;