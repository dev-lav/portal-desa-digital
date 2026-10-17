// Prerender: tulis dist/<rute>/index.html berisi konten & meta tiap halaman,
// lalu buat dist/sitemap.xml dan dist/404.html. Dijalankan oleh `npm run build`.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = path.resolve("dist");
const SSR = path.resolve("dist-ssr");

const { render, daftarRute, metaHalaman } = await import(pathToFileURL(path.join(SSR, "entry-server.js")).href);
const template = await readFile(path.join(DIST, "index.html"), "utf8");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Ganti atribut content/href pada tag yang cocok; gagal keras kalau tag tidak ditemukan
const gantiAtribut = (html, pembuka, attr, nilai) => {
  const pola = new RegExp(`(${pembuka}[^>]*?\\s${attr}=")[^"]*(")`);
  if (!pola.test(html)) throw new Error(`Tag tidak ditemukan di index.html: ${pembuka}`);
  return html.replace(pola, `$1${escape(nilai)}$2`);
};

const isiMeta = (html, meta) => {
  let h = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.judul)}</title>`);
  h = gantiAtribut(h, '<meta name="description"', "content", meta.deskripsi);
  h = gantiAtribut(h, '<link rel="canonical"', "href", meta.kanonik);
  h = gantiAtribut(h, '<meta property="og:type"', "content", meta.tipe);
  h = gantiAtribut(h, '<meta property="og:url"', "content", meta.kanonik);
  h = gantiAtribut(h, '<meta property="og:title"', "content", meta.judul);
  h = gantiAtribut(h, '<meta property="og:description"', "content", meta.deskripsi);
  h = gantiAtribut(h, '<meta property="og:image"', "content", meta.gambar);
  h = gantiAtribut(h, '<meta property="og:image:alt"', "content", meta.judul);
  h = gantiAtribut(h, '<meta name="twitter:title"', "content", meta.judul);
  h = gantiAtribut(h, '<meta name="twitter:description"', "content", meta.deskripsi);
  h = gantiAtribut(h, '<meta name="twitter:image"', "content", meta.gambar);
  return h;
};

// 404.html: dipakai GitHub Pages untuk alamat yang tidak ada; aplikasi lalu menampilkan "Halaman tidak ditemukan"
await writeFile(
  path.join(DIST, "404.html"),
  template.replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex" />'),
);

const rute = daftarRute();
for (const url of rute) {
  const meta = metaHalaman(url);
  const html = isiMeta(template, meta).replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const tujuan = url === "/" ? path.join(DIST, "index.html") : path.join(DIST, url, "index.html");
  await mkdir(path.dirname(tujuan), { recursive: true });
  await writeFile(tujuan, html);
}

const hariIni = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rute.map((url) => `  <url>\n    <loc>${metaHalaman(url).kanonik}</loc>\n    <lastmod>${hariIni}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);

await rm(SSR, { recursive: true, force: true });
console.log(`Prerender: ${rute.length} halaman, sitemap.xml, 404.html`);
