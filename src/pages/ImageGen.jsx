import { useState, useEffect } from 'react';
import './ImageGen.css';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description first!");
      return;
    }

    setLoading(true);
    setError('');
    setImage(null);

    // الرابط العالمي الجديد لسيرفر الصور على Render
    const RENDER_IMAGE_URL = "https://birko-image-api.onrender.com/generate";

    try {
      console.log("🎨 Calling Birko Image Engine at Render...");
      
      const response = await fetch(RENDER_IMAGE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server error occurred");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
      console.log("✅ Image received from Cloud!");

    } catch (err) {
      console.error("❌ Error generating image:", err);
      if (err.name === 'TypeError') {
        setError("Server is waking up! 😴 Render puts free servers to sleep. Please wait 30 seconds and try again.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="imgen-container">
      <div className="imgen-card">
        <div className="imgen-header">
          <span className="badge">BIRKO AI v1.5 - ONLINE</span>
          <h2>Magic Image Generator</h2>
          <p className="subtitle">Turn your imagination into art using AI</p>
        </div>

        <div className="input-group">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., An astronaut riding a horse on Mars, cinematic style..."
          />
          <button onClick={generateImage} disabled={loading} className="gen-btn">
            {loading ? (
              <>
                <span className="spinner-small"></span> Drawing...
              </>
            ) : "Generate Image"}
          </button>
        </div>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <div className="image-preview">
          {image ? (
            <div className="result-wrapper">
              <img src={image} alt="AI Result" className="fade-in-image" />
              <div className="action-buttons-container">
                <a href={image} download="birko-ai-result.png" className="action-button download-button">
                  <span>📥</span> Download
                </a>
                <button onClick={() => setImage(null)} className="action-button clear-button">
                  <span>🗑️</span> Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="placeholder">
              {loading ? (
                <div className="loader-box">
                  <div className="spinner"></div>
                  <p>Engine is drawing...</p>
                  <small style={{color: '#888'}}>This might take 30s if server is waking up</small>
                </div>
              ) : (
                <div className="empty-state">
                  <span className="magic-icon">✨</span>
                  <p>Your description will appear here as art</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGen;