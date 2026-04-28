import  { useState } from 'react';
import './PassGen.css';

const PassGen = () => {
  const [password, setPassword] = useState('P@ssw0rd123');
  const [length, setLength] = useState(12);
  const [showToast, setShowToast] = useState(false); // حالة الإشعار
  const [options, setOptions] = useState({
    uppercase: true, lowercase: true, numbers: true, symbols: true,
  });

  const generatePassword = () => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") return setPassword("Select Options!");

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    
    // إظهار الإشعار الفخم
    setShowToast(true);
    
    // إخفائه تلقائياً بعد ثانيتين
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="pass-gen-container">
      {/* الإشعار الفخم (Toast) */}
      <div className={`custom-toast ${showToast ? 'show' : ''}`}>
        <span className="toast-icon">✅</span>
        <span className="toast-msg">Copied to Clipboard!</span>
      </div>

      <h1 className="page-main-title">Password Generator</h1>
      
      <div className="pass-gen-card">
        <div className="pass-settings">
          <h3>Customise Password</h3>
          <div className="range-group">
            <label>Length: {length}</label>
            <input type="range" min="8" max="32" value={length} onChange={(e) => setLength(e.target.value)} />
          </div>
          <div className="checkbox-group">
            <label><input type="checkbox" checked={options.uppercase} onChange={() => setOptions({...options, uppercase: !options.uppercase})} /> Uppercase</label>
            <label><input type="checkbox" checked={options.lowercase} onChange={() => setOptions({...options, lowercase: !options.lowercase})} /> Lowercase</label>
            <label><input type="checkbox" checked={options.numbers} onChange={() => setOptions({...options, numbers: !options.numbers})} /> Numbers</label>
            <label><input type="checkbox" checked={options.symbols} onChange={() => setOptions({...options, symbols: !options.symbols})} /> Symbols</label>
          </div>
        </div>

        <div className="pass-result">
          <div className="display-area">
            <input type="text" value={password} readOnly />
            <button className="copy-btn-text" onClick={copyToClipboard}>COPY</button>
          </div>
          <button className="generate-btn" onClick={generatePassword}>Generate Password ⚡</button>
        </div>
      </div>
    </div>
  );
};

export default PassGen;