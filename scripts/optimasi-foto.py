"""Optimasi foto katalog: foto HP (±3 MB) -> WebP 1200px (±50-150 KB) di src/images/katalog.

Pemakaian:
    python3 scripts/optimasi-foto.py foto-asli/barang-bekas
    python3 scripts/optimasi-foto.py foto-asli/barang-bekas --lewati Harga.jpg

Nama file dijadikan huruf kecil tanpa spasi ("Dipan b.jpg" -> "dipan-b.webp"); nama inilah yang
ditulis di kolom `foto` spreadsheet. Foto diputar sesuai orientasi kamera dan metadatanya
(lokasi, merek HP) dibuang. Foto yang hasilnya sudah ada dan lebih baru dilewati.
"""
import argparse
import re
from pathlib import Path

from PIL import Image, ImageOps

EKSTENSI = {".jpg", ".jpeg", ".png", ".webp", ".heic"}


def jadikan_slug(nama: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", nama.lower()).strip("-")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("sumber", type=Path, help="folder foto asli")
    parser.add_argument("--tujuan", type=Path, default=Path("src/images/katalog"))
    parser.add_argument("--sisi", type=int, default=1200, help="sisi terpanjang dalam piksel (bawaan 1200)")
    parser.add_argument("--kualitas", type=int, default=80, help="kualitas WebP 0-100 (bawaan 80)")
    parser.add_argument("--lewati", nargs="*", default=[], help="nama file yang tidak diproses")
    parser.add_argument("--paksa", action="store_true", help="proses ulang walau hasilnya sudah ada")
    args = parser.parse_args()

    args.tujuan.mkdir(parents=True, exist_ok=True)
    lewati = {n.lower() for n in args.lewati}
    total_asli = total_hasil = 0

    for asal in sorted(args.sumber.iterdir()):
        if asal.suffix.lower() not in EKSTENSI or asal.name.lower() in lewati:
            continue
        hasil = args.tujuan / f"{jadikan_slug(asal.stem)}.webp"
        if not args.paksa and hasil.exists() and hasil.stat().st_mtime >= asal.stat().st_mtime:
            print(f"lewati  {asal.name} (sudah ada {hasil.name})")
            continue

        with Image.open(asal) as gambar:
            gambar = ImageOps.exif_transpose(gambar).convert("RGB")
            gambar.thumbnail((args.sisi, args.sisi), Image.LANCZOS)
            gambar.save(hasil, "WEBP", quality=args.kualitas, method=6)

        total_asli += asal.stat().st_size
        total_hasil += hasil.stat().st_size
        print(f"{asal.name:28} {asal.stat().st_size / 1e6:5.1f} MB -> {hasil.name:28} {hasil.stat().st_size / 1e3:4.0f} KB")

    if total_asli:
        print(f"\nTotal {total_asli / 1e6:.1f} MB -> {total_hasil / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
