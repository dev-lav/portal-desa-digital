#!/usr/bin/env python3
"""
Script untuk mengimpor data UMKM hasil kurasi (dari CSV atau JSON)
menjadi file TypeScript siap pakai di `src/data/umkm-tambahan.ts`.

Penggunaan:
  python3 scripts/import_umkm.py
  python3 scripts/import_umkm.py --input scripts/output/umkm_gmaps.csv
"""

import argparse
import csv
import json
import os
import re
import sys

def lokasi_singkat(alamat: str) -> str:
    """Ambil 'Permata Regency 1 Blok 21 No. 5' dari alamat Google Maps."""
    perum = "Permata Regency 1" if re.search(r"permata regency 1", alamat, re.I) else ""
    blok = re.search(r"bl(?:oo)?k\.?\s*(\d+(?:\s*-\s*\d+)?)", alamat, re.I)
    no = re.search(r"no\.?\s*(\w+)", alamat, re.I)
    parts = [perum]
    if blok:
        parts.append("Blok " + re.sub(r"\s*-\s*", "-", blok.group(1)))
    if no:
        parts.append("No. " + no.group(1))
    return " ".join(p for p in parts if p)


def buat_deskripsi(row: dict) -> str:
    """Pakai deskripsi manual jika ada, selain itu buat kalimat dari jenis usaha + lokasi."""
    manual = (row.get("deskripsi") or "").strip()
    alamat = (row.get("alamat") or "").strip()
    if manual and manual != alamat:
        return manual
    jenis = (row.get("jenisUsaha") or "UMKM").strip()
    lokasi = lokasi_singkat(alamat)
    if not lokasi:
        return alamat
    return f"{jenis} di {lokasi}, Ngijo, Karangploso."


def import_data(input_file: str, output_ts: str):
    if not os.path.exists(input_file):
        print(f"❌ File tidak ditemukan: {input_file}")
        sys.exit(1)

    items = []
    if input_file.endswith(".csv"):
        with open(input_file, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                # parsing nilai
                try:
                    rt_val = int(row.get("rt", 0) or 0)
                except ValueError:
                    rt_val = 0

                rating_val = None
                if row.get("rating"):
                    try:
                        rating_val = float(str(row["rating"]).replace(",", "."))
                    except ValueError:
                        rating_val = None

                lat_val = float(row["lat"]) if row.get("lat") else None
                lng_val = float(row["lng"]) if row.get("lng") else None

                items.append({
                    "id": row.get("id") or f"umkm-{len(items)+1}",
                    "namaUsaha": row.get("namaUsaha", "").strip(),
                    "jenisUsaha": row.get("jenisUsaha", "UMKM").strip(),
                    "pemilik": row.get("pemilik", "-").strip(),
                    "rt": rt_val,
                    "nomorWA": row.get("nomorWA", "").strip(),
                    "deskripsi": buat_deskripsi(row),
                    "alamat": row.get("alamat", "").strip(),
                    "jamBuka": row.get("jamBuka", "").strip(),
                    "rating": rating_val,
                    "gmapsUrl": row.get("gmapsUrl", "").strip(),
                    "lat": lat_val,
                    "lng": lng_val,
                })
    elif input_file.endswith(".json"):
        with open(input_file, "r", encoding="utf-8") as f:
            items = json.load(f)

    # Format ke TypeScript
    ts_content = '''import { UMKM } from "./types";

// Data UMKM yang dihasilkan dari Google Maps & kurasi warga
export const umkmTambahan: UMKM[] = ''' + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"

    with open(output_ts, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"✅ Berhasil mengimpor {len(items)} UMKM ke: {output_ts}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Import curated UMKM data to TypeScript")
    parser.add_argument("--input", "-i", default="scripts/output/umkm_gmaps.csv", help="File CSV atau JSON input")
    parser.add_argument("--output", "-o", default="src/data/umkm-tambahan.ts", help="File output TS")
    args = parser.parse_args()

    # Jika CSV belum ada tapi JSON ada, pakai JSON
    target_input = args.input
    if not os.path.exists(target_input):
        fallback_json = "scripts/output/umkm_gmaps.json"
        if os.path.exists(fallback_json):
            target_input = fallback_json

    import_data(target_input, args.output)
