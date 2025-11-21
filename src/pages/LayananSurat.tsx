import { useState } from "react";
import { FileText, Clock, CheckCircle, MessageCircle, FileSearch } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { jenisSurat, rwInfo } from "@/data/mockData";

const LayananSurat = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle 
          title="Layanan Surat Pengantar" 
          subtitle="Informasi cara mengurus berbagai jenis surat di RW 05"
        />

        {/* Info */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cara Mengajukan Surat</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Siapkan dokumen yang diperlukan</li>
                  <li>Hubungi Ketua RT setempat untuk mendapat persetujuan</li>
                  <li>Datang ke Posko RW pada jam layanan atau ajukan via WhatsApp</li>
                  <li>Tunggu proses sesuai estimasi waktu</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daftar Surat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jenisSurat.map((surat) => (
            <Card key={surat.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{surat.nama}</CardTitle>
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{surat.deskripsi}</p>
                
                <div className="space-y-4">
                  {/* Dokumen Diperlukan */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <h4 className="font-semibold text-sm">Dokumen Diperlukan:</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                      {surat.dokumenDiperlukan.map((dok, idx) => (
                        <li key={idx} className="list-disc">{dok}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Estimasi Proses */}
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Estimasi Proses</p>
                      <p className="font-semibold text-sm">{surat.estimasiProses}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${rwInfo.whatsapp}?text=Halo,%20saya%20ingin%20mengajukan%20${encodeURIComponent(surat.nama)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full gap-2" size="sm">
                        <MessageCircle className="h-4 w-4" />
                        Ajukan via WhatsApp
                      </Button>
                    </a>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileSearch className="h-4 w-4" />
                          Contoh
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Contoh Format Pengajuan</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg text-sm">
                            <p className="font-semibold mb-2">Template WhatsApp:</p>
                            <div className="text-muted-foreground space-y-1">
                              <p>Assalamualaikum/Selamat Pagi,</p>
                              <p className="mt-2">Saya ingin mengajukan <strong>{surat.nama}</strong>.</p>
                              <p className="mt-2">Data pemohon:</p>
                              <p>- Nama: [Nama Lengkap]</p>
                              <p>- RT: [Nomor RT]</p>
                              <p>- Alamat: [Alamat Lengkap]</p>
                              <p>- Keperluan: [Jelaskan keperluan]</p>
                              <p className="mt-2">Terima kasih.</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Silakan salin template di atas dan lengkapi data Anda, kemudian kirim via WhatsApp.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayananSurat;
