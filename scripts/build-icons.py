"""
Gera os icones PWA do JD Market a partir de uma foto de rosto.

Uso:
    python scripts/build-icons.py [caminho/da/foto.jpg]

Default: public/jd-photo-original.jpg

Produz em public/icons/:
    icon-192.png             (any)
    icon-512.png             (any)
    icon-maskable-192.png    (maskable, com safe zone)
    icon-maskable-512.png    (maskable, com safe zone)
    apple-touch-icon.png     (180x180)
    favicon-32.png           (32x32 — usado tambem em /public/favicon.ico substituivel)

Design:
    - crop quadrado, centralizado no rosto (bias pra parte superior)
    - mascara circular
    - borda dourada (JD Market gold #D4AF45)
    - fundo dark bg (#090E14)
    - versao 'maskable' deixa 20% de folga ao redor pro Android nao cortar

Requer: pip install Pillow
"""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.stderr.write(
        "Pillow nao instalado. Rode: python -m pip install Pillow\n"
    )
    sys.exit(1)


ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "icons"

BG = (9, 14, 20, 255)           # --bg
GOLD = (212, 175, 69, 255)      # --gold


def face_square(src: Image.Image, zoom: float = 0.42, face_y_pct: float = 0.28, face_x_pct: float = 0.50) -> Image.Image:
    """
    Recorta um quadrado APERTADO no rosto.
    - zoom: fracao do menor lado que o quadrado vai ocupar (menor = mais zoom).
    - face_y_pct/face_x_pct: centro do rosto em % da imagem (0..1).
    """
    w, h = src.size
    side = int(min(w, h) * zoom)
    cx = int(w * face_x_pct)
    cy = int(h * face_y_pct)
    left = max(0, min(w - side, cx - side // 2))
    top = max(0, min(h - side, cy - side // 2))
    return src.crop((left, top, left + side, top + side))


def circular_gold(square: Image.Image, size: int, ring_pct: float = 0.05) -> Image.Image:
    """Aplica mascara circular e adiciona borda dourada. Fundo dark solido."""
    canvas = Image.new("RGBA", (size, size), BG)

    ring = max(2, int(size * ring_pct))
    # Reamostra a foto pro tamanho alvo (menos o anel)
    inner = size - ring * 2
    photo = square.resize((inner, inner), Image.LANCZOS).convert("RGBA")

    mask = Image.new("L", (inner, inner), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, inner, inner), fill=255)

    canvas.paste(photo, (ring, ring), mask)

    # Anel dourado
    draw = ImageDraw.Draw(canvas)
    draw.ellipse(
        (ring // 2, ring // 2, size - ring // 2 - 1, size - ring // 2 - 1),
        outline=GOLD,
        width=ring,
    )
    return canvas


def build_any(square: Image.Image, size: int) -> Image.Image:
    return circular_gold(square, size, ring_pct=0.05)


def build_maskable(square: Image.Image, size: int) -> Image.Image:
    """Maskable: fundo preenchido, imagem dentro do safe zone (80% central)."""
    canvas = Image.new("RGBA", (size, size), BG)
    inner_size = int(size * 0.72)  # 72% pra caber com folga
    inner = circular_gold(square, inner_size, ring_pct=0.06)
    offset = (size - inner_size) // 2
    canvas.paste(inner, (offset, offset), inner)
    return canvas


def main() -> int:
    src_path = Path(sys.argv[1]) if len(sys.argv) > 1 else PUBLIC / "jd-photo-original.jpg"
    if not src_path.exists():
        sys.stderr.write(f"Nao achei a foto em {src_path}\n")
        sys.stderr.write("Salve a foto original nesse caminho ou passe o path como argumento.\n")
        return 1

    OUT.mkdir(parents=True, exist_ok=True)

    img = Image.open(src_path).convert("RGB")
    sq = face_square(img)

    jobs = [
        ("icon-192.png", build_any, 192),
        ("icon-512.png", build_any, 512),
        ("icon-maskable-192.png", build_maskable, 192),
        ("icon-maskable-512.png", build_maskable, 512),
        ("apple-touch-icon.png", build_any, 180),
        ("favicon-32.png", build_any, 32),
    ]

    for name, fn, size in jobs:
        out = fn(sq, size)
        out.save(OUT / name, "PNG", optimize=True)
        print(f"OK  {name}  {size}x{size}")

    print(f"\nSalvo em {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
