from pathlib import Path
from PIL import Image

# 設定來源資料夾與輸出資料夾
input_folder = Path("images")
output_folder = Path("output_webp")
output_folder.mkdir(exist_ok=True)

# 支援的圖片格式
valid_extensions = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}

# 批次處理
for img_path in input_folder.iterdir():
    if img_path.suffix.lower() in valid_extensions:
        with Image.open(img_path) as img:
            img = img.convert("RGB")  # 保險起見轉成 RGB
            webp_path = output_folder / (img_path.stem + ".webp")
            img.save(webp_path, "WEBP", quality=80)
            print(f"✔ 轉換完成: {img_path.name} → {webp_path.name}")
