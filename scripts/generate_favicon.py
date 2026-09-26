#!/usr/bin/env python3
"""
generate_favicon.py
Generates favicon.ico, icon.png, and apple-icon.png from any sticker in public/assets/stickers/.
Usage:
    python scripts/generate_favicon.py [sticker_name]
Example:
    python scripts/generate_favicon.py tanisha_heart
    python scripts/generate_favicon.py --list
"""

import os
import sys
from PIL import Image

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
STICKERS_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "stickers")
APP_DIR = os.path.join(PROJECT_ROOT, "app")
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")

def list_stickers():
    if not os.path.exists(STICKERS_DIR):
        print(f"Stickers directory not found: {STICKERS_DIR}")
        return []
    files = [f for f in sorted(os.listdir(STICKERS_DIR)) if f.endswith((".png", ".webp", ".jpg", ".jpeg"))]
    return files

def make_square_padded(img: Image.Image, padding_ratio: float = 0.04) -> Image.Image:
    img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    
    max_dim = max(img.width, img.height)
    pad = int(max_dim * padding_ratio)
    canvas_size = max_dim + (2 * pad)
    
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    offset_x = (canvas_size - img.width) // 2
    offset_y = (canvas_size - img.height) // 2
    canvas.paste(img, (offset_x, offset_y))
    return canvas

def generate_icons(sticker_filename: str = "tanisha_heart.png"):
    sticker_path = os.path.join(STICKERS_DIR, sticker_filename)
    if not os.path.exists(sticker_path):
        # Try appending .png
        if not sticker_filename.endswith(".png"):
            sticker_path = os.path.join(STICKERS_DIR, sticker_filename + ".png")
            sticker_filename = sticker_filename + ".png"

    if not os.path.exists(sticker_path):
        print(f"Error: Sticker '{sticker_filename}' not found in {STICKERS_DIR}")
        print("Available stickers:")
        for s in list_stickers():
            print(f"  - {s}")
        sys.exit(1)

    print(f"Loading sticker: {sticker_path}")
    source_img = Image.open(sticker_path)
    square_img = make_square_padded(source_img)

    # Standard ICO sizes
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

    # 1. Output favicon.ico into both app/ and public/
    app_ico_path = os.path.join(APP_DIR, "favicon.ico")
    pub_ico_path = os.path.join(PUBLIC_DIR, "favicon.ico")

    square_img.save(app_ico_path, format="ICO", sizes=ico_sizes)
    square_img.save(pub_ico_path, format="ICO", sizes=ico_sizes)
    print(f"Generated {app_ico_path} (sizes: {ico_sizes})")
    print(f"Generated {pub_ico_path} (sizes: {ico_sizes})")

    # 2. Output 256x256 icon.png for modern browsers / Next.js app/icon.png
    icon_256 = square_img.resize((256, 256), Image.Resampling.LANCZOS)
    app_icon_path = os.path.join(APP_DIR, "icon.png")
    pub_icon_path = os.path.join(PUBLIC_DIR, "icon.png")
    icon_256.save(app_icon_path, format="PNG")
    icon_256.save(pub_icon_path, format="PNG")
    print(f"Generated {app_icon_path} (256x256)")
    print(f"Generated {pub_icon_path} (256x256)")

    # 3. Output 180x180 apple-icon.png for iOS home screen bookmarks
    apple_180 = square_img.resize((180, 180), Image.Resampling.LANCZOS)
    app_apple_path = os.path.join(APP_DIR, "apple-icon.png")
    pub_apple_path = os.path.join(PUBLIC_DIR, "apple-icon.png")
    apple_180.save(app_apple_path, format="PNG")
    apple_180.save(pub_apple_path, format="PNG")
    print(f"Generated {app_apple_path} (180x180)")
    print(f"Generated {pub_apple_path} (180x180)")

    print(f"\nSuccessfully created favicons from '{sticker_filename}'!")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg in ("--list", "-l", "list"):
            print("Available stickers:")
            for s in list_stickers():
                print(f"  - {s}")
            sys.exit(0)
        generate_icons(arg)
    else:
        generate_icons("tanisha_heart.png")
