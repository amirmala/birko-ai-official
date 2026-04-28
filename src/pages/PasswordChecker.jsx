import  { useState } from 'react';
import './PasswordChecker.css';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('Too Weak');

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 8) score += 25;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 25;
    if (/\d/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;

    setStrength(score);
    if (score === 0) setFeedback('Too Weak');
    else if (score === 25) setFeedback('Weak');
    else if (score === 50) setFeedback('Fair');
    else if (score === 75) setFeedback('Strong');
    else if (score === 100) setFeedback('Unbreakable');
    
    setPassword(pass);
  };

  const getBarColor = () => {
    if (strength <= 25) return '#ef4444'; 
    if (strength <= 50) return '#f59e0b'; 
    if (strength <= 75) return '#00d2ff'; 
    return '#10b981'; 
  };

  // اللمسة المميزة: حساب وقت الاختراق بالذكاء الاصطناعي
  const getAiCrackTime = () => {
    if (password.length === 0) return "No Data";
    if (strength <= 25) return "Instant";
    if (strength <= 50) return "4 Minutes";
    if (strength <= 75) return "12 Years";
    return "800+ Centuries";
  };

  return (
    <div className="checker-container">
      <div className="checker-card">
        <h2 className="checker-title">Password Strength Checker</h2>
        <p className="checker-subtitle">Check how secure your password really is.</p>

        <div className="input-wrapper">
          <input 
            type="text" 
            value={password}
            onChange={(e) => checkStrength(e.target.value)}
            placeholder="Enter password here..."
            className="password-input"
          />
        </div>

        <div className="strength-meter">
          <div className="bar-bg">
            <div 
              className="bar-fill" 
              style={{ width: `${strength}%`, backgroundColor: getBarColor() }}
            ></div>
          </div>
          <div className="strength-label" style={{ color: getBarColor() }}>
            Security Level: {feedback}
          </div>
        </div>

        {/* قسم الـ AI المميز الجديد */}
        <div className="ai-security-insight">
            <div className="insight-item">
                <span className="icon">🤖</span>
                <div className="text">
                    <h4>AI Crack Time</h4>
                    <p>{getAiCrackTime()}</p>
                </div>
            </div>
            <div className="insight-item">
                <span className="icon">🛡️</span>
                <div className="text">
                    <h4>Entropy</h4>
                    <p>{(password.length * 4.5).toFixed(1)} bits</p>
                </div>
            </div>
        </div>

        <div className="tips-section">
          <h3>Security Tips:</h3>
          <ul>
            <li className={password.length > 8 ? 'check-done' : ''}>At least 8 characters</li>
            <li className={/[A-Z]/.test(password) ? 'check-done' : ''}>Uppercase & Lowercase</li>
            <li className={/\d/.test(password) ? 'check-done' : ''}>Numbers (0-9)</li>
            <li className={/[^A-Za-z0-9]/.test(password) ? 'check-done' : ''}>Special Characters (!@#)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;