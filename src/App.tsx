import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Beranda from "./pages/Beranda";
import BerandaRevamp from "./pages/BerandaRevamp";
import ProfilRW from "./pages/ProfilRW";
import DataWarga from "./pages/DataWarga";
import LayananSurat from "./pages/LayananSurat";
import Kegiatan from "./pages/Kegiatan";
import Keuangan from "./pages/Keuangan";
import UMKM from "./pages/UMKM";
import Pengaduan from "./pages/Pengaduan";
import KebijakanPrivasi from "./pages/KebijakanPrivasi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/v2" element={<BerandaRevamp />} />
              <Route path="/profil" element={<ProfilRW />} />
              <Route path="/data-warga" element={<DataWarga />} />
              <Route path="/layanan-surat" element={<LayananSurat />} />
              <Route path="/kegiatan" element={<Kegiatan />} />
              <Route path="/keuangan" element={<Keuangan />} />
              <Route path="/umkm" element={<UMKM />} />
              <Route path="/pengaduan" element={<Pengaduan />} />
              <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
