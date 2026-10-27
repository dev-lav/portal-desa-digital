import { useQuery } from "@tanstack/react-query";
import { ambilKatalog } from "@/data/katalog";

// Status dari spreadsheet dianggap segar 1 menit. `cekUlang` mengambil ulang setiap kali halaman dibuka
// (dipakai di detail barang, supaya pembeli langsung tahu kalau barangnya baru saja terjual).
export const useKatalog = (aktif = true, cekUlang = false) =>
  useQuery({
    queryKey: ["katalog"],
    queryFn: ambilKatalog,
    staleTime: 60_000,
    enabled: aktif,
    refetchOnMount: cekUlang ? "always" : true,
  });
