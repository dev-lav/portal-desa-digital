import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "./components/SiteHeader";
import { BottomNav } from "./components/BottomNav";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { SeoHalaman } from "./seo/SeoHalaman";
import Beranda from "./pages/Beranda";
import ProfilRW from "./pages/ProfilRW";
import DataWarga from "./pages/DataWarga";
import LayananSurat from "./pages/LayananSurat";
import Kegiatan from "./pages/Kegiatan";
import BeritaDetail from "./pages/BeritaDetail";
import Keuangan from "./pages/Keuangan";
import Kontak from "./pages/Kontak";
import UMKM from "./pages/UMKM";
import Pengaduan from "./pages/Pengaduan";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const Penyedia = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

// Tata letak + rute. Dipakai di browser (BrowserRouter) dan saat prerender (StaticRouter).
export const AppShell = () => (
  <>
    <ScrollToTop />
    <SeoHalaman />
    <div className="flex min-h-screen flex-col pb-[var(--tinggi-nav-bawah)] lg:pb-0">
      <SiteHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/kegiatan/:id" element={<BeritaDetail />} />
          <Route path="/keuangan" element={<Keuangan />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/profil" element={<ProfilRW />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="/data-warga" element={<DataWarga />} />
          <Route path="/layanan-surat" element={<LayananSurat />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </div>
  </>
);
