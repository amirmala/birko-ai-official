import { useState, useEffect } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lang, setLang] = useState('en');
  const [gender, setGender] = useState('male');
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    return () => { if (audioUrl) URL.revokeObjectURL(audioUrl); };
  }, [audioUrl]);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    
    setIsSpeaking(true);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);

    // العنوان الجديد بتاع ريندر (العالمي)
    const RENDER_URL = 'https://amir-voice-backend.onrender.com/speak';

    console.log("📡 Connecting to Global Voice Server at Render...");

    try {
      const response = await fetch(RENDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang, gender }),
      });

      console.log("📥 Server Response Status:", response.status);

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      const audio = new Audio(url);
      audio.onended = () => setIsSpeaking(false);
      await audio.play();
      console.log("✅ Audio is playing from Render!");

    } catch (error) {
      console.error("❌ THE ERROR IS HERE:", error);
      
      if (error.message.includes('Failed to fetch')) {
        alert("Server is waking up! 😴\nRender puts free servers to sleep. Please wait 30 seconds and try again.");
      } else {
        alert("Error: " + error.message);
      }
      setIsSpeaking(false);
    }
  };

  return (
    <div className="tts-container">
      <div className="tts-card">
        <div className="tts-settings">
          <span className="badge">BIRKO VOICE v1.0 - ONLINE</span>
          <h2>Voice Settings</h2>
          
          <div className="range-group">
            <label>Language</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="custom-select">
              <option value="en">English</option>
              <option value="ar">Arabic (العربية)</option>
            </select>
          </div>

          <div className="range-group">
            <label>Voice Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="custom-select">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button className="speak-btn" onClick={handleSpeak} disabled={isSpeaking}>
            {isSpeaking ? "Processing..." : "Listen Now 🔊"}
          </button>

          {audioUrl && !isSpeaking && (
            <a href={audioUrl} download="birko-ai-voice.mp3" className="download-btn">
              Download MP3 📥
            </a>
          )}
        </div>

        <div className="tts-main">
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder={lang === 'ar' ? "اكتب هنا..." : "Type here..."}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;