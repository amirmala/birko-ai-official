import asyncio
import edge_tts
from flask import Flask, request, send_file, jsonify, after_this_request
from flask_cors import CORS
import os
import uuid
import logging

# إعداد اللوج
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# السماح لجميع النطاقات بالوصول عشان نخلص من مشاكل المتصفح
CORS(app)

VOICE_MAP = {
    'ar': {
        'male': 'ar-EG-ShakirNeural',
        'female': 'ar-EG-SalmaNeural'
    },
    'en': {
        'male': 'en-US-AndrewNeural',
        'female': 'en-US-AvaNeural'
    }
}

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data.get('text')
    lang = data.get('lang', 'ar')
    gender = data.get('gender', 'male')
    
    selected_voice = VOICE_MAP.get(lang, VOICE_MAP['ar']).get(gender, 'ar-EG-ShakirNeural')
    temp_filename = f"audio_{uuid.uuid4().hex}.mp3"

    # وظيفة لمسح الملف بعد الإرسال للحفاظ على مساحة الجهاز
    @after_this_request
    def remove_file(response):
        try:
            if os.path.exists(temp_filename):
                os.remove(temp_filename)
                logger.info(f"🗑️ Deleted temp file: {temp_filename}")
        except Exception as e:
            logger.error(f"Error deleting file: {e}")
        return response

    async def generate():
        communicate = edge_tts.Communicate(text, selected_voice)
        await communicate.save(temp_filename)

    try:
        logger.info(f"🎙️ Generating Voice: {lang} | {gender}")
        # تشغيل الـ Async بشكل أضمن
        asyncio.run(generate())
        
        if os.path.exists(temp_filename):
            return send_file(temp_filename, mimetype='audio/mpeg')
        else:
            return jsonify({"error": "File was not created"}), 500
            
    except Exception as e:
        logger.error(f"❌ TTS Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*40)
    print("🚀 BIRKO VOICE SERVER LIVE ON PORT 8080")
    print("🚀 ENDPOINT: http://127.0.0.1:8080/speak")
    print("="*40)
    app.run(host='0.0.0.0', port=8080, debug=False)