from PIL import Image
import os

def make_square(image_path, output_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGB")
        width, height = img.size
        max_dim = max(width, height)
        
        # Create new square image with white background
        square_img = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
        
        # Calculate position to center
        left = (max_dim - width) // 2
        top = (max_dim - height) // 2
        
        square_img.paste(img, (left, top))
        square_img.save(output_path, quality=95)
        print(f"Processed {image_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

base_dir = "src/images"
images_to_process = ["rt-04.jpeg", "rt-05.jpeg", "rt-06.jpeg"]

for img_name in images_to_process:
    input_path = os.path.join(base_dir, img_name)
    output_name = img_name.replace(".jpeg", "-square.jpeg")
    output_path = os.path.join(base_dir, output_name)
    
    if os.path.exists(input_path):
        make_square(input_path, output_path)
    else:
        print(f"File not found: {input_path}")
