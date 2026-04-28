from flask import Flask, request, send_file, jsonify, make_response
from flask_cors import CORS
import requests # بدلنا birko_engine بـ requests
import io
import os

app = Flask(__name__)

# تفعيل CORS عشان ريأكت يقدر يكلم السيرفر أونلاين
CORS(app, resources={r"/*": {"origins": "*"}})

# رابط الموديل المجاني السريع على Hugging Face
API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"

@app.route('/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()

    try:
        data = request.json
        if not data or 'prompt' not in data:
            return jsonify({"error": "اكتب وصف يا بطل"}), 400
            
        prompt = data.get('prompt')
        print(f"🎨 Birko Engine is calling API for: {prompt}")
        
        # بنبعت الطلب لـ Hugging Face بدل ما نشغل الموديل عندنا
        response = requests.post(API_URL, json={"inputs": prompt})
        
        if response.status_code == 200:
            print("✅ Image generated via API!")
            return send_file(io.BytesIO(response.content), mimetype='image/png')
        else:
            return jsonify({"error": "HuggingFace API is busy, try again"}), 500
            
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

if __name__ == '__main__':
    # ريندر بيحتاج السيرفر يشتغل على 0.0.0.0 وبورت متغير
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)