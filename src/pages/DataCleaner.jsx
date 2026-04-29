import  { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import "./DataCleaner.css";

const DataCleaner = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [actionType, setActionType] = useState("fillna_mean");

  // 1. وظيفة رفع وقراءة الملف (Excel & CSV)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    if (file.name.endsWith(".csv")) {
      reader.onload = (event) => {
        const result = Papa.parse(event.target.result, { header: true, skipEmptyLines: true });
        setData(result.data);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  // 2. معالجة البيانات المتقدمة (Fillna & Drop & Unknown)
  const handleAdvancedCleaning = () => {
    if (!selectedColumn || data.length === 0) {
      alert("يرجى اختيار عمود أولاً!");
      return;
    }

    let updatedData = [...data];

    // --- حذف عمود بالكامل ---
    if (actionType === "drop_column") {
      updatedData = updatedData.map(row => {
        const newRow = { ...row };
        delete newRow[selectedColumn]; // حذف العمود بدون ترك متغيرات غير مستخدمة
        return newRow;
      });
      setSelectedColumn(""); 
      alert(`تم حذف العمود "${selectedColumn}" بنجاح!`);
    } 
    
    // --- تعبئة النصوص المفقودة بـ Unknown ---
    else if (actionType === "fillna_unknown") {
      updatedData = updatedData.map(row => {
        const val = row[selectedColumn];
        if (val === "" || val === null || val === undefined) {
          return { ...row, [selectedColumn]: "Unknown" };
        }
        return row;
      });
      alert("تم استبدال القيم المفقودة بـ 'Unknown'!");
    }

    // --- العمليات الحسابية (Mean & Median) ---
    else {
      const values = data
        .map(row => parseFloat(row[selectedColumn]))
        .filter(val => !isNaN(val));

      if (values.length === 0) {
        alert("هذا العمود لا يحتوي على بيانات رقمية كافية للحساب!");
        return;
      }

      let replacementValue;
      if (actionType === "fillna_mean") {
        const sum = values.reduce((a, b) => a + b, 0);
        replacementValue = (sum / values.length).toFixed(2);
      } else if (actionType === "fillna_median") {
        const sorted = [...values].sort((a, b) => a - b);
        replacementValue = sorted[Math.floor(sorted.length / 2)].toFixed(2);
      }

      updatedData = updatedData.map(row => {
        const val = row[selectedColumn];
        if (val === "" || val === null || val === undefined) {
          return { ...row, [selectedColumn]: replacementValue };
        }
        return row;
      });
      alert(`تمت تعبئة القيم المفقودة بـ (${replacementValue}) بنجاح!`);
    }

    setData(updatedData);
  };

  // 3. تنظيف الصفوف الفارغة بالكامل
  const cleanEmptyRows = () => {
    if (data.length === 0) return;
    const cleaned = data.filter(row => 
      Object.values(row).some(val => val !== null && val !== "" && val !== undefined)
    );
    setData(cleaned);
    alert("تم تنظيف الصفوف الفارغة!");
  };

  // 4. تحميل الملف النهائي
  const downloadData = () => {
    if (data.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CleanedData");
    XLSX.writeFile(workbook, `BirkoTools_Cleaned_${fileName || "data.xlsx"}`);
  };

  return (
    <div className="data-cleaner-container">
      <h2>📊 Data Cleaner & Formatter</h2>
      <p className="subtitle">الأداة الاحترافية لتجهيز وتنظيف بياناتك بلمسة واحدة</p>
      
      <div className="upload-section">
        <div className="upload-icon">📄</div>
        <p className="upload-text">اسحب الملف هنا أو اضغط للاختيار</p>
        <input id="file-upload" type="file" onChange={handleFileUpload} accept=".csv, .xlsx, .xls" />
        {fileName && <p className="file-name">المعالجة الحالية لملف: <span>{fileName}</span></p>}
      </div>

      {data.length > 0 && (
        <div className="results-section">
          
          <div className="advanced-cleaning-panel">
            <h3>⚙️ معالجة الأعمدة المتقدمة</h3>
            <div className="action-grid">
              <select 
                className="custom-select"
                value={selectedColumn} 
                onChange={(e) => setSelectedColumn(e.target.value)}
              >
                <option value="">اختر العمود المطلوب...</option>
                {Object.keys(data[0]).map(col => <option key={col} value={col}>{col}</option>)}
              </select>

              <select 
                className="custom-select"
                value={actionType} 
                onChange={(e) => setActionType(e.target.value)}
              >
                <option value="fillna_mean">Fillna (Mean - المتوسط)</option>
                <option value="fillna_median">Fillna (Median - الوسيط)</option>
                <option value="fillna_unknown">Fillna (Unknown - للنصوص)</option>
                <option value="drop_column">Drop Column (حذف العمود)</option>
              </select>

              <button className="btn-action apply" onClick={handleAdvancedCleaning}>تطبيق التغيير</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-clean" onClick={cleanEmptyRows}>🧹 مسح الصفوف الفارغة</button>
            <button className="btn-download" onClick={downloadData}>📥 تحميل الملف النهائي</button>
          </div>
          
          <div className="table-preview-area">
             <div className="preview-title-bar">
                <p className="preview-text">معاينة النتائج (أول 5 صفوف):</p>
                <span className="row-count">إجمالي الصفوف: {data.length}</span>
             </div>
             
             <div className="table-container">
                 <table className="data-table">
                   <thead>
                     <tr>{Object.keys(data[0]).map(key => <th key={key}>{key}</th>)}</tr>
                   </thead>
                   <tbody>
                     {data.slice(0, 5).map((row, i) => (
                       <tr key={i}>{Object.values(row).map((val, j) => <td key={j}>{String(val)}</td>)}</tr>
                     ))}
                   </tbody>
                 </table>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCleaner;