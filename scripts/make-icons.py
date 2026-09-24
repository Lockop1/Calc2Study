"""Generate PWA icons (PNG) using the bundled KaTeX fonts. Run: python3 scripts/make-icons.py"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_INT = os.path.join(ROOT, 'node_modules/katex/dist/fonts/KaTeX_Main-Regular.ttf')
FONT_MAIN = os.path.join(ROOT, 'node_modules/katex/dist/fonts/KaTeX_Main-Bold.ttf')
OUT = os.path.join(ROOT, 'public/icons')
os.makedirs(OUT, exist_ok=True)
BG = (26, 26, 46, 255)      # #1a1a2e
FG = (124, 147, 255, 255)   # accent
WHITE = (242, 242, 247, 255)

def render(size, maskable=False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    radius = 0 if maskable else int(size * 0.22)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG)
    scale = 0.72 if maskable else 0.86
    f_int = ImageFont.truetype(FONT_INT, int(size * 0.82 * scale))
    f_two = ImageFont.truetype(FONT_MAIN, int(size * 0.34 * scale))
    # integral sign, slightly left of center
    bbox = d.textbbox((0, 0), '∫', font=f_int)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = size * 0.40 - w / 2 - bbox[0]
    y = size * 0.50 - h / 2 - bbox[1]
    d.text((x, y), '∫', font=f_int, fill=WHITE)
    # "2" to the right, lower
    bbox2 = d.textbbox((0, 0), '2', font=f_two)
    w2, h2 = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]
    d.text((size * 0.64 - w2 / 2 - bbox2[0], size * 0.58 - h2 / 2 - bbox2[1]), '2', font=f_two, fill=FG)
    return img

render(192).save(os.path.join(OUT, 'icon-192.png'))
render(512).save(os.path.join(OUT, 'icon-512.png'))
render(512, maskable=True).save(os.path.join(OUT, 'icon-512-maskable.png'))
render(180).save(os.path.join(OUT, 'apple-touch-icon.png'))
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1a1a2e"/><text x="24" y="46" font-family="serif" font-size="46" fill="#f2f2f7" text-anchor="middle">&#8747;</text><text x="43" y="42" font-family="sans-serif" font-weight="bold" font-size="22" fill="#7c93ff" text-anchor="middle">2</text></svg>'''
with open(os.path.join(OUT, 'icon.svg'), 'w') as f:
    f.write(svg)
print('icons written to', OUT)
