import torch
from diffusers import StableDiffusionPipeline
import io
import os

# المعالج (CPU)
device = "cuda" if torch.cuda.is_available() else "cpu"

# المسار اللي فيه الموديل في الـ D
cache_dir = "D:/HuggingFace_Cache"
model_id = "runwayml/stable-diffusion-v1-5"

print(f"⚙️ Loading model from {cache_dir}...")

# تحميل الموديل (local_files_only عشان ميسحبش نت تاني)
pipe = StableDiffusionPipeline.from_pretrained(
    model_id, 
    torch_dtype=torch.float16 if device == "cuda" else torch.float32,
    cache_dir=cache_dir,
    local_files_only=True
)
pipe = pipe.to(device)

def generate_image_locally(prompt):
    # تحسين البرومبت
    enhanced_prompt = f"{prompt}, high quality, digital art"
    
    with torch.no_grad():
        # تقليل الخطوات لـ 15 عشان يخلص أسرع على الـ CPU بتاعك
        result = pipe(enhanced_prompt, num_inference_steps=15).images[0]
    
    img_byte_arr = io.BytesIO()
    result.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr