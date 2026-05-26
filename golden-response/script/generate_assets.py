from pathlib import Path
from random import Random

from PIL import Image, ImageDraw, ImageFilter


OUT_DIR = Path("client/public/images")

ASSETS = [
    ("hero-concrete", 1800, 1200, (34, 33, 31), (176, 138, 84), (213, 204, 189)),
    ("material-process", 1200, 900, (119, 115, 108), (213, 204, 189), (166, 95, 54)),
    ("residential-ash", 1400, 1000, (106, 109, 112), (213, 204, 189), (176, 138, 84)),
    ("commercial-charcoal", 1400, 1000, (23, 23, 23), (99, 103, 108), (176, 138, 84)),
    ("kitchen-sienna", 1400, 1000, (166, 95, 54), (213, 204, 189), (75, 64, 55)),
    ("furniture-brass", 1400, 1000, (176, 138, 84), (213, 204, 189), (23, 23, 23)),
    ("bath-suite", 1400, 1000, (213, 204, 189), (143, 139, 130), (255, 255, 255)),
    ("floating-table", 1400, 1000, (200, 196, 189), (99, 103, 108), (23, 23, 23)),
    ("feature-wall", 1400, 1000, (92, 91, 88), (213, 204, 189), (176, 138, 84)),
    ("ceiling-plane", 1400, 1000, (198, 194, 184), (99, 103, 108), (255, 255, 255)),
    ("terrace-lounge", 1400, 1000, (120, 116, 104), (213, 204, 189), (166, 95, 54)),
    ("bar-counter", 1400, 1000, (41, 38, 35), (176, 138, 84), (213, 204, 189)),
]


def blend(a, b, amount):
    return tuple(int(a[index] * (1 - amount) + b[index] * amount) for index in range(3))


def make_texture(name, width, height, base, accent, highlight):
    rng = Random(name)
    image = Image.new("RGB", (width, height), base)
    draw = ImageDraw.Draw(image, "RGBA")

    for radius in range(max(width, height), 20, -48):
        alpha = int(70 * radius / max(width, height))
        color = (*blend(accent, highlight, 0.35), alpha)
        draw.ellipse((width * 0.52 - radius, height * -0.08 - radius, width * 0.52 + radius, height * -0.08 + radius), fill=color)

    for index in range(15):
        x = int((index / 14) * width) - rng.randint(120, 260)
        y = rng.randint(int(height * 0.08), int(height * 0.62))
        w = rng.randint(120, 360)
        h = rng.randint(int(height * 0.36), int(height * 0.86))
        color = (*blend(base, accent, rng.random() * 0.7), rng.randint(22, 58))
        draw.rounded_rectangle((x, y, x + w, y + h), radius=4, fill=color)

    for index in range(70):
        y = int((height / 70) * index + rng.randint(-22, 22))
        points = []
        for step in range(9):
            x = int((width / 8) * step)
            points.append((x, y + rng.randint(-52, 52)))
        draw.line(points, fill=(*highlight, rng.randint(18, 48)), width=rng.randint(1, 4), joint="curve")

    noise = Image.effect_noise((width, height), 34).convert("L")
    tint = Image.new("RGB", (width, height), blend(base, highlight, 0.15))
    image = Image.composite(tint, image, noise.point(lambda value: min(130, value)))
    image = image.filter(ImageFilter.GaussianBlur(0.35))

    draw = ImageDraw.Draw(image, "RGBA")
    inset_x, inset_y = int(width * 0.08), int(height * 0.14)
    draw.rectangle((inset_x, inset_y, int(width * 0.88), int(height * 0.82)), outline=(*highlight, 28), width=3)
    return image


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for asset in ASSETS:
        name, width, height, base, accent, highlight = asset
        image = make_texture(name, width, height, base, accent, highlight)
        image.save(OUT_DIR / f"{name}.webp", "WEBP", quality=82, method=6)
        image.resize((640, int(height * 640 / width))).save(OUT_DIR / f"{name}-thumb.webp", "WEBP", quality=74, method=6)

    print(f"Generated {len(ASSETS) * 2} WebP assets in {OUT_DIR.resolve()}")


if __name__ == "__main__":
    main()
