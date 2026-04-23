"""
Recolor Humi logo PNGs to white-on-transparent variants.

Algorithm: alpha = 255 - min(R,G,B) per pixel, RGB = (255,255,255).
- Pure white bg (min=255) -> alpha 0 (transparent)
- Deep navy text (min~15) -> alpha ~240 (near-opaque white)
- Colored gradients     -> alpha scaled by darkness (preserves anti-alias)

Output: white/humi-XX-white.png (30 files) + white/humi-white-deck.png (contact sheet).
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SRC_DIR = Path(__file__).parent
OUT_DIR = SRC_DIR / "white"
OUT_DIR.mkdir(exist_ok=True)

NAVY = (15, 23, 42)

def recolor_to_white(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img)
    min_ch = arr[:, :, :3].min(axis=2).astype(np.uint16)
    alpha = (255 - min_ch).clip(0, 255).astype(np.uint8)
    out = np.zeros_like(arr)
    out[:, :, :3] = 255
    out[:, :, 3] = alpha
    Image.fromarray(out, "RGBA").save(dst, optimize=True)

def build_contact_sheet(tiles: list[Path], out: Path, cols: int = 6) -> None:
    tile_size = 360
    padding = 24
    rows = (len(tiles) + cols - 1) // cols
    header = 120
    w = cols * tile_size + (cols + 1) * padding
    h = header + rows * tile_size + (rows + 1) * padding + 80
    canvas = Image.new("RGB", (w, h), NAVY)
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype(
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf", 44
        )
        small = ImageFont.truetype(
            "/System/Library/Fonts/Supplemental/Arial.ttf", 22
        )
    except Exception:
        font = ImageFont.load_default()
        small = ImageFont.load_default()
    draw.text((padding, 32), "Humi — White Variants (on Navy)",
              fill="white", font=font)
    draw.text((padding, 84),
              f"{len(tiles)} directions · transparent PNG · knockout use",
              fill=(148, 163, 184), font=small)

    for i, tile_path in enumerate(tiles):
        row, col = divmod(i, cols)
        x = padding + col * (tile_size + padding)
        y = header + padding + row * (tile_size + padding)
        tile = Image.open(tile_path).convert("RGBA")
        tile.thumbnail((tile_size, tile_size), Image.LANCZOS)
        ox = x + (tile_size - tile.width) // 2
        oy = y + (tile_size - tile.height) // 2
        canvas.paste(tile, (ox, oy), tile)
        label = tile_path.stem.replace("-white", "")
        draw.text((x + 6, y + tile_size - 26), label,
                  fill=(148, 163, 184), font=small)
    canvas.save(out, optimize=True)

def main() -> None:
    produced: list[Path] = []
    for i in range(1, 31):
        src = SRC_DIR / f"humi-{i:02d}.png"
        if not src.exists():
            print(f"SKIP missing {src.name}")
            continue
        dst = OUT_DIR / f"humi-{i:02d}-white.png"
        recolor_to_white(src, dst)
        produced.append(dst)
        print(f"OK  {dst.name}")
    deck = OUT_DIR / "humi-white-deck.png"
    build_contact_sheet(produced, deck)
    print(f"\nDeck: {deck}  ({len(produced)} tiles)")

if __name__ == "__main__":
    main()
