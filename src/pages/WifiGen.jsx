import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { jsPDF } from "jspdf"; // استيراد مكتبة الـ PDF
import './WifiGen.css';

const WifiGen = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [showToast, setShowToast] = useState(false);

const downloadPDF = () => {
    const canvas = document.getElementById("wifi-qr-canvas");
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF();
    
    // إعداد الخط والجملة الجديدة اللي طلبتها
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    // الجملة اللي هتتكتب جوه ملف الـ PDF من فوق
    pdf.text("Using Qr Code For Free Wi-fI", 105, 40, { align: "center" });

    // إضافة الكيو آر كود الأسود
    pdf.addImage(imgData, 'PNG', 55, 50, 100, 100);

    // اسم الملف اللي هينزل على جهاز العميل
    pdf.save("Using-Qr-Code-For-Free-Wi-fI.pdf");

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const wifiData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

  return (
    <div className="wifi-gen-container">
      <div className={`custom-toast ${showToast ? 'show' : ''}`}>
        <span className="toast-icon">📄</span>
        <span className="toast-msg">PDF Generated Successfully!</span>
      </div>

      <h1 className="page-main-title">WiFi QR Generator</h1>

      <div className="wifi-gen-card">
        <div className="wifi-settings">
          <h3>Network Details</h3>
          <div className="input-group">
            <label>Network Name (SSID)</label>
            <input type="text" placeholder="WiFi Name" value={ssid} onChange={(e) => setSsid(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Encryption</label>
            <select value={encryption} onChange={(e) => setEncryption(e.target.value)}>
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        </div>

        <div className="wifi-result">
          <div className="qr-display-area">
            {/* اللون هنا اتغير لأسود (fgColor) والخلفية بيضاء عشان الطباعة */}
            <QRCodeCanvas 
              id="wifi-qr-canvas"
              value={wifiData} 
              size={256}
              bgColor={"#ffffff"} 
              fgColor={"#000000"} 
              level={"H"}
              includeMargin={true}
            />
          </div>
          <button className="download-btn" onClick={downloadPDF} disabled={!ssid}>
            Print as PDF 📄
          </button>
        </div>
      </div>
    </div>
  );
};

export default WifiGen;