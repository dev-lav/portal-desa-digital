// Entri untuk prerender saat build (lihat scripts/prerender.mjs). Tidak dimuat di browser.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, Penyedia } from "./AppShell";

export { daftarRute, metaHalaman } from "./seo/meta";
export { ambilKatalog } from "./data/katalog";

export const render = (url: string) =>
  renderToString(
    <Penyedia>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </Penyedia>,
  );
