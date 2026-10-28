import { Kegiatan } from "@/data/types";
import { SITE_URL } from "@/seo/meta";
import { formatTanggal } from "@/lib/format";
import { tanggalIcs } from "@/lib/jadwal";

// Ambil jam dari teks bebas seperti "07.00 - 09.00 WIB" atau "07.00 WIB - selesai".
// Kalau jam selesai tidak ada, dianggap 2 jam; kalau jam mulai pun tidak ada, jadi acara seharian.
const jamAcara = ({ waktu }: Kegiatan) => {
  const [mulai, selesai] = [...waktu.matchAll(/(\d{1,2})[.:](\d{2})/g)].map(([, j, m]) => Number(j) * 60 + Number(m));
  if (mulai === undefined) return null;
  return { mulai, selesai: selesai ?? mulai + 120 };
};

const jamIcs = (menit: number) =>
  `T${String(Math.floor(menit / 60) % 24).padStart(2, "0")}${String(menit % 60).padStart(2, "0")}00`;

const rentang = (k: Kegiatan) => {
  const jam = jamAcara(k);
  const hari = tanggalIcs(k.tanggal);
  if (!jam) {
    const besok = new Date(k.tanggal);
    besok.setDate(besok.getDate() + 1);
    return { mulai: hari, selesai: tanggalIcs(besok), seharian: true };
  }
  return { mulai: hari + jamIcs(jam.mulai), selesai: hari + jamIcs(jam.selesai), seharian: false };
};

const keterangan = (k: Kegiatan) =>
  [k.deskripsi, k.ulang && `Jadwal: ${k.ulang}`, `Waktu: ${k.waktu}`, `Info agenda RW 12: ${SITE_URL}/kegiatan`]
    .filter(Boolean)
    .join("\n");

export const tautanGoogleCalendar = (k: Kegiatan) => {
  const { mulai, selesai } = rentang(k);
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: k.nama,
    dates: `${mulai}/${selesai}`,
    ctz: "Asia/Jakarta",
    location: k.lokasi,
    details: keterangan(k),
  });
  if (k.aturan) q.set("recur", `RRULE:${k.aturan.rrule}`);
  return `https://calendar.google.com/calendar/render?${q}`;
};

const escIcs = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

// File .ics untuk Kalender iPhone, Outlook, dan aplikasi kalender lain
export const isiIcs = (k: Kegiatan) => {
  const { mulai, selesai, seharian } = rentang(k);
  const zona = seharian ? ";VALUE=DATE" : ";TZID=Asia/Jakarta";
  const jamLibur = mulai.slice(8);
  const baris = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RW 12 Desa Ngijo//Agenda//ID",
    "CALSCALE:GREGORIAN",
    // WIB tidak punya jam musim panas, jadi cukup satu aturan +07:00
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Jakarta",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0700",
    "TZOFFSETTO:+0700",
    "TZNAME:WIB",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    // Kegiatan rutin memakai UID tetap, jadi menyimpan ulang memperbarui jadwal yang sama, bukan menggandakannya
    `UID:${k.aturan ? k.id : `${k.id}-${tanggalIcs(k.tanggal)}`}@${new URL(SITE_URL).host}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART${zona}:${mulai}`,
    `DTEND${zona}:${selesai}`,
    k.aturan && `RRULE:${k.aturan.rrule}`,
    k.aturan?.libur.length && `EXDATE${zona}:${k.aturan.libur.map((d) => tanggalIcs(d) + jamLibur).join(",")}`,
    `SUMMARY:${escIcs(k.nama)}`,
    `LOCATION:${escIcs(k.lokasi)}`,
    `DESCRIPTION:${escIcs(keterangan(k))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // Standar iCalendar: baris lebih dari 75 karakter dilipat, lanjutannya diawali spasi
  const lipat = (b: string) => b.match(/.{1,73}/g)!.join("\r\n ");
  return baris
    .filter((b): b is string => typeof b === "string")
    .map(lipat)
    .join("\r\n");
};

export const unduhIcs = (k: Kegiatan) => {
  const url = URL.createObjectURL(new Blob([isiIcs(k)], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${k.nama.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Pesan WhatsApp tanpa nomor tujuan, jadi warga bisa memilih sendiri mau dikirim ke siapa
const pesanBagikan = (k: Kegiatan) =>
  [
    `*${k.nama}*`,
    `${formatTanggal(k.tanggal, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${k.waktu}`,
    k.lokasi,
    ...(k.ulang ? [`(${k.ulang})`] : []),
    "",
    `Info agenda RW 12: ${SITE_URL}/kegiatan`,
  ].join("\n");

export const tautanBagikanWa = (k: Kegiatan) => `https://wa.me/?text=${encodeURIComponent(pesanBagikan(k))}`;

// "Bagikan": di HP pakai menu bagikan bawaan (WA, Telegram, dll.), selain itu langsung ke WhatsApp
export const bagikan = async (k: Kegiatan) => {
  if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
    try {
      await navigator.share({ title: k.nama, text: pesanBagikan(k) });
      return;
    } catch (e) {
      if ((e as Error).name === "AbortError") return; // warga menutup menu bagikan
    }
  }
  window.open(tautanBagikanWa(k), "_blank", "noopener,noreferrer");
};
