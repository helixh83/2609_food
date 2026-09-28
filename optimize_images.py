from __future__ import annotations

import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
ASSETS = DIST / "assets"

VARIANTS = {
    "1600": (1600, 80),
    "720": (720, 75),
}


def make_variant(source: Path, suffix: str, max_width: int, quality: int) -> Path:
    destination = source.with_name(f"{source.stem}-{suffix}.webp")
    with Image.open(source) as image:
        image.load()
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(destination, "WEBP", quality=quality, method=6)
    return destination


def dimensions(path: Path) -> tuple[int, int]:
    with Image.open(path) as image:
        return image.size


def set_attribute(tag: str, name: str, value: str) -> str:
    pattern = re.compile(rf'\s{name}="[^"]*"')
    attribute = f' {name}="{value}"'
    if pattern.search(tag):
        return pattern.sub(attribute, tag, count=1)
    return tag[:-1] + attribute + ">"


def optimize_img_tag(tag: str, html_path: Path) -> str:
    source_match = re.search(r'src="([^"]+\.(?:png|jpe?g))"', tag, re.I)
    if not source_match:
        return tag

    source_url = source_match.group(1)
    source_name = Path(source_url).name
    source_file = ASSETS / source_name
    if not source_file.exists():
        return tag

    is_landing = html_path == DIST / "index.html"
    is_featured = 'id="hero-question-image"' in tag
    is_issue_hero = not is_landing and 'class="hero' in html_path.read_text(encoding="utf-8").split(tag, 1)[0][-120:]

    size = "1600" if is_featured or is_issue_hero else "720"
    optimized_name = f"{source_file.stem}-{size}.webp"
    optimized_url = source_url.rsplit("/", 1)[0] + "/" + optimized_name
    optimized_file = ASSETS / optimized_name
    width, height = dimensions(optimized_file)

    tag = tag.replace(source_url, optimized_url, 1)
    tag = set_attribute(tag, "width", str(width))
    tag = set_attribute(tag, "height", str(height))
    tag = set_attribute(tag, "decoding", "async")
    if is_featured or is_issue_hero:
        tag = set_attribute(tag, "fetchpriority", "high")
        tag = re.sub(r'\sloading="lazy"', "", tag)
    else:
        tag = set_attribute(tag, "loading", "lazy")
    return tag


def main() -> None:
    originals = sorted(ASSETS.glob("*.png"))
    generated: list[Path] = []
    for source in originals:
        for suffix, (max_width, quality) in VARIANTS.items():
            generated.append(make_variant(source, suffix, max_width, quality))

    for html_path in DIST.rglob("*.html"):
        html = html_path.read_text(encoding="utf-8")
        updated = re.sub(r"<img\b[^>]*>", lambda match: optimize_img_tag(match.group(0), html_path), html)
        html_path.write_text(updated, encoding="utf-8")

    script_path = DIST / "script.js"
    script = script_path.read_text(encoding="utf-8")
    script = re.sub(r"(assets/[^'\"]+?)\.png", r"\1-1600.webp", script)
    script_path.write_text(script, encoding="utf-8")

    original_bytes = sum(path.stat().st_size for path in originals)
    large_bytes = sum(path.stat().st_size for path in generated if path.stem.endswith("-1600"))
    thumb_bytes = sum(path.stat().st_size for path in generated if path.stem.endswith("-720"))
    print(f"originals: {len(originals)} files, {original_bytes / 1048576:.2f} MB")
    print(f"large webp: {large_bytes / 1048576:.2f} MB")
    print(f"thumb webp: {thumb_bytes / 1048576:.2f} MB")


if __name__ == "__main__":
    main()
