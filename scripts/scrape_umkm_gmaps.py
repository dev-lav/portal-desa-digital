#!/usr/bin/env python3
"""
Scraper Data UMKM Google Maps - Terfokus KHUSUS Perumahan Permata Regency 1 (RW 12).
Secara ketat menyaring:
1. Alamat / nama wajib berada di Permata Regency 1.
2. Mengabaikan tempat di Permata Regency 2, Permata Regency 3, Griya Permata Alam (GPA), dan jalan raya luar perumahan.
3. Mengabaikan pin penanda blok/fasilitas perumahan.
4. Membatasi radius lokasi maksimal 550m dari titik pusat Permata Regency 1.

Penggunaan:
  python3 scripts/scrape_umkm_gmaps.py
  python3 scripts/scrape_umkm_gmaps.py --no-headless
"""

import argparse
import csv
import json
import math
import os
import re
import sys
import time
import urllib.parse
from playwright.sync_api import sync_playwright

# Titik pusat koordinat Permata Regency 1 (RW 12 Desa Ngijo)
PERMATA_1_LAT = -7.8970078
PERMATA_1_LNG = 112.6083439
PERMATA_1_ZOOM = "17z"
MAX_RADIUS_METERS = 550

DEFAULT_QUERIES = [
    '"Permata Regency 1"',
    'Permata Regency 1 warung',
    'Permata Regency 1 makanan',
    'Permata Regency 1 toko',
    'Permata Regency 1 laundry',
    'Permata Regency 1 frozen food',
    'Permata Regency 1 kue',
    'Permata Regency 1 salon',
    'Permata Regency 1 jahit',
    'Permata Regency 1 servis',
]

EXCLUDE_BLACKLIST = [
    "permata regency 2",
    "permata regency 3",
    "permata 2",
    "permata 3",
    "griya permata alam",
    "gpa ",
    "kantor pemasaran",
    "pembangunan perumahan",
]

def calculate_distance_meters(lat1, lon1, lat2, lon2):
    """Menghitung jarak dalam meter antara dua titik koordinat."""
    if not lat1 or not lon1 or not lat2 or not lon2:
        return 0
    R = 6371000  # radius bumi
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def is_valid_permata_1(name: str, address: str, category: str, lat=None, lng=None):
    """Validasi ketat: hanya menerima UMKM yang berada di Permata Regency 1."""
    comb = f"{name} {address} {category}".lower()

    # 1. Tolak jika mengandung blacklist perumahan lain / pengembang
    for exc in EXCLUDE_BLACKLIST:
        if exc in comb:
            return False, f"Bukan Permata 1 ({exc})"

    # 2. Tolak penanda blok perumahan / fasilitas RW / komplek
    name_clean = name.lower()
    cat_clean = category.lower()

    if any(k in comb for k in ["komplek perumahan", "pembangunan perumahan"]):
        return False, "Bukan usaha (komplek perumahan)"

    if cat_clean in ["komplek perumahan", "perumahan"]:
        return False, "Bukan tempat usaha"

    if name_clean.startswith("perumahan") or (name_clean.startswith("permata regency") and any(b in name_clean for b in ["blok", "rw", "no", "1"])):
        return False, "Pin blok/fasilitas perumahan"

    if any(f in name_clean for f in ["lapangan voli", "masjid an nur", "posyandu permata"]):
        return False, "Fasilitas umum/sosial"

    # 3. UMKM yang sudah dikenal di Permata 1 selalu diterima
    known_umkm = [
        "nasdo ayaje",
        "hadhila laundry",
        "bakoelan mama",
        "bu komang",
        "yú min",
        "zam-zam bakery",
        "cookiseeyou",
        "ala chef",
        "permata laundry",
        "salon dua dara",
        "beeauty_skincare",
        "legi legit"
    ]
    if any(k in name_clean for k in known_umkm):
        return True, "Dikenal sebagai UMKM Permata 1"

    # 4. Alamat atau nama WAJIB mencantumkan Permata Regency / Permata 1
    has_permata = "permata regency" in comb or "permata 1" in comb
    if not has_permata:
        return False, "Alamat di luar Permata Regency 1"

    # 5. Cek jarak radius dari titik tengah Permata Regency 1
    if lat and lng:
        d = calculate_distance_meters(PERMATA_1_LAT, PERMATA_1_LNG, lat, lng)
        if d > MAX_RADIUS_METERS:
            return False, f"Terlalu jauh dari pusat Permata 1 ({d:.0f} meter)"

    return True, "Valid Permata Regency 1"

def format_wa_number(raw_phone: str) -> str:
    """Format telepon lokal ke format internasional +628xx untuk WhatsApp."""
    if not raw_phone:
        return ""
    digits = re.sub(r"[^\d+]", "", raw_phone)
    if digits.startswith("+62"):
        return digits
    if digits.startswith("62"):
        return "+" + digits
    if digits.startswith("0"):
        return "+62" + digits[1:]
    return digits

def parse_coordinates_from_url(url: str):
    """Mengekstrak lat & lng dari URL Google Maps."""
    coord_match = re.search(r"!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)", url)
    if coord_match:
        return float(coord_match.group(1)), float(coord_match.group(2))
    at_match = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", url)
    if at_match:
        return float(at_match.group(1)), float(at_match.group(2))
    return None, None

def scrape_gmaps(queries=None, headless=True):
    queries = queries or DEFAULT_QUERIES
    results = []
    output_dir = os.path.join(os.path.dirname(__file__), "output")
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 65)
    print("🏡 Google Maps UMKM Scraper - KHUSUS Permata Regency 1 (RW 12)")
    print(f"📍 Koordinat Pusat : {PERMATA_1_LAT}, {PERMATA_1_LNG} (Max {MAX_RADIUS_METERS}m)")
    print(f"🔍 Total Query     : {len(queries)} pencarian terarah")
    print(f"🖥️  Headless Mode  : {headless}")
    print("=" * 65)

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=headless)
        context = browser.new_context(
            locale="id-ID",
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        candidate_links = {}

        # 1. Kumpulkan semua calon link tempat
        for q_idx, query in enumerate(queries, 1):
            print(f"[{q_idx}/{len(queries)}] Mencari: '{query}'...")
            search_url = f"https://www.google.com/maps/search/{urllib.parse.quote(query)}/@{PERMATA_1_LAT},{PERMATA_1_LNG},{PERMATA_1_ZOOM}"
            
            try:
                page.goto(search_url, timeout=25000)
                try:
                    page.wait_for_selector('a.hfpxzc', timeout=6000)
                except Exception:
                    continue

                feed = page.query_selector('div[role="feed"]')
                if feed:
                    for _ in range(2):
                        feed.evaluate('el => el.scrollBy(0, 2500)')
                        time.sleep(1)

                links = page.query_selector_all('a.hfpxzc')
                for link in links:
                    name = (link.get_attribute("aria-label") or "").strip()
                    href = link.get_attribute("href") or ""
                    
                    if not name or not href:
                        continue
                    
                    # Blacklist awal
                    if any(exc in name.lower() for exc in EXCLUDE_BLACKLIST):
                        continue

                    if name not in candidate_links:
                        rating = None
                        category = "UMKM"
                        alamat_singkat = ""
                        try:
                            parent = link.evaluate_handle('el => el.closest("div.Nv2PK") || el.parentElement.parentElement')
                            r_el = parent.query_selector('span.MW4etd')
                            if r_el:
                                rating = float(r_el.inner_text().strip().replace(",", "."))
                            lines = parent.query_selector_all('div.W4Efsd')
                            for line in lines:
                                t = line.inner_text().strip()
                                if "·" in t:
                                    parts = [p.strip() for p in t.split("·")]
                                    if len(parts) >= 2:
                                        category = parts[0]
                                        alamat_singkat = parts[1]
                        except Exception:
                            pass

                        candidate_links[name] = {
                            "namaUsaha": name,
                            "gmapsUrl": href,
                            "jenisUsaha": category,
                            "rating": rating,
                            "alamat": alamat_singkat,
                        }

            except Exception as e:
                print(f"   ⚠️ Error pada query '{query}': {e}")

        print(f"\n📍 Terkumpul {len(candidate_links)} calon UMKM unik.")
        print("⏳ Memeriksa detail & memfilter ketat ke Permata Regency 1...\n")

        # 2. Verifikasi dan ambil detail
        for c_idx, (name, item) in enumerate(candidate_links.items(), 1):
            try:
                page.goto(item["gmapsUrl"], timeout=20000)
                time.sleep(1.2)

                lat, lng = parse_coordinates_from_url(page.url)
                alamat_lengkap = item["alamat"]
                nomor_wa = ""
                jam_buka = ""

                buttons = page.query_selector_all('button[aria-label]')
                for b in buttons:
                    label = b.get_attribute("aria-label") or ""
                    label_lower = label.lower()

                    if label_lower.startswith("telepon:"):
                        raw_tel = label.split(":", 1)[1].strip()
                        nomor_wa = format_wa_number(raw_tel)
                    elif label_lower.startswith("alamat:"):
                        alamat_lengkap = label.split(":", 1)[1].strip()
                    elif "salin jam buka" in label_lower:
                        jam_buka = label.replace("Salin jam buka", "").strip().rstrip(",")

                # Validasi ketat
                is_valid, reason = is_valid_permata_1(name, alamat_lengkap, item["jenisUsaha"], lat, lng)
                if not is_valid:
                    print(f"   ⏭️  Diabaikan ({reason}): {name}")
                    continue

                # Tebak RT bila ada petunjuk di alamat (contoh Blok 25)
                rt_num = 0

                place_data = {
                    "id": f"permata1-{len(results) + 1}",
                    "namaUsaha": name,
                    "jenisUsaha": item["jenisUsaha"],
                    "pemilik": "-",
                    "rt": rt_num,
                    "nomorWA": nomor_wa,
                    "deskripsi": alamat_lengkap,
                    "rating": item["rating"],
                    "alamat": alamat_lengkap,
                    "jamBuka": jam_buka,
                    "gmapsUrl": item["gmapsUrl"],
                    "lat": lat,
                    "lng": lng,
                }

                results.append(place_data)
                wa_str = f" | WA: {nomor_wa}" if nomor_wa else ""
                rating_str = f"⭐ {place_data['rating']}" if place_data['rating'] else "⭐ -"
                print(f"   🎯 [{len(results)}] {name} ({place_data['jenisUsaha']} | {rating_str}{wa_str})")

            except Exception as e:
                print(f"   ⚠️ Gagal membuka detail {name}: {e}")

        browser.close()

    # Simpan ke JSON
    json_path = os.path.join(output_dir, "umkm_gmaps.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    # Simpan ke CSV
    csv_path = os.path.join(output_dir, "umkm_gmaps.csv")
    if results:
        fieldnames = ["id", "namaUsaha", "jenisUsaha", "pemilik", "rt", "nomorWA", "deskripsi", "rating", "alamat", "jamBuka", "lat", "lng", "gmapsUrl"]
        with open(csv_path, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for r in results:
                writer.writerow(r)

    print("\n" + "=" * 65)
    print(f"🎉 SUKSES! Ditemukan {len(results)} UMKM terverifikasi di Permata Regency 1.")
    print(f"📄 JSON : {json_path}")
    print(f"📊 CSV  : {csv_path}")
    print("=" * 65)
    return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scraper UMKM Khusus Permata Regency 1")
    parser.add_argument("--no-headless", action="store_true", help="Buka browser dengan GUI")
    args = parser.parse_args()

    scrape_gmaps(headless=not args.no_headless)
