import { Link } from "react-router-dom";
import { ChevronRight, Clock, Mail, MapPin, MessageCircle, MessageSquare, Store, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { RtPicker } from "@/components/konten/RtPicker";
import { pengurusRW, rwInfo, waLink } from "@/data/mockData";

const pintasan = [
  { to: "/pengaduan", icon: MessageSquare, judul: "Sampaikan aduan", desc: "Keluhan atau usulan untuk pengurus" },
  { to: "/umkm", icon: Store, judul: "UMKM warga", desc: "Belanja dan pakai jasa tetangga" },
  { to: "/profil", icon: Users, judul: "Profil RW", desc: "Pengurus, daftar RT, dan lembaga" },
];

const Kontak = () => (
  <>
    <PageHeader title="Kontak" subtitle="Hubungi pengurus RW atau ketua RT Anda.">
      <a
        href={waLink(`Halo RW ${rwInfo.nomor}, saya ingin bertanya`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-primary hover:bg-white/90"
      >
        <MessageCircle className="h-5 w-5" />
        Chat pengurus RW
      </a>
    </PageHeader>

    <div className="container">
      <section className="mt-8">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          <div className="flex items-start gap-3 bg-card p-4">
            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Posko</p>
              <p className="font-semibold">{rwInfo.alamatPosko}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card p-4">
            <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Jam layanan</p>
              <p className="font-semibold">{rwInfo.jamLayanan}</p>
            </div>
          </div>
          <a href={`mailto:${rwInfo.email}`} className="flex items-start gap-3 bg-card p-4 hover:bg-secondary/50">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="truncate font-semibold">{rwInfo.email}</p>
            </div>
          </a>
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle title="Ketua RT" />
        <RtPicker />
      </section>

      <section className="mt-8">
        <SectionTitle title="Pengurus RW" />
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {pengurusRW.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-3.5">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">{p.jabatan}</p>
              <p className="mt-1 font-bold leading-snug">{p.nama}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SectionTitle title="Lainnya" />
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {pintasan.map(({ to, icon: Icon, judul, desc }) => (
            <Link key={to} to={to} className="flex items-center gap-3.5 p-4 hover:bg-secondary/50">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{judul}</span>
                <span className="block text-sm text-muted-foreground">{desc}</span>
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  </>
);

export default Kontak;
