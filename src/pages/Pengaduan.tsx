import { useState } from "react";
import { MessageSquare, Send, Info, Copy } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { rwInfo } from "@/data/mockData";

const kategoriList = [
  "Kebersihan",
  "Keamanan",
  "Fasilitas Umum",
  "Sosial",
  "Lainnya",
];

const Pengaduan = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nama: "",
    rt: "",
    kategori: "",
    deskripsi: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [messageTemplate, setMessageTemplate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama || !formData.rt || !formData.kategori || !formData.deskripsi) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    const template = `Assalamualaikum/Selamat Pagi,

Saya ingin menyampaikan pengaduan/aspirasi:

Nama: ${formData.nama}
RT: ${formData.rt}
Kategori: ${formData.kategori}

Deskripsi:
${formData.deskripsi}

Terima kasih atas perhatiannya.`;

    setMessageTemplate(template);
    setShowDialog(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageTemplate);
    toast({
      title: "Berhasil disalin",
      description: "Template pesan telah disalin ke clipboard",
    });
  };

  const handleSendWhatsApp = () => {
    const encodedMessage = encodeURIComponent(messageTemplate);
    window.open(`https://wa.me/${rwInfo.whatsapp}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <SectionTitle 
          title="Pengaduan & Aspirasi" 
          subtitle="Sampaikan masukan dan keluhan Anda"
        />

        {/* Info Banner */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cara Menyampaikan Pengaduan yang Baik</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Sampaikan dengan bahasa yang sopan dan jelas</li>
                  <li>Sertakan informasi detail tentang masalah yang dihadapi</li>
                  <li>Jika memungkinkan, sertakan foto atau bukti pendukung saat mengirim via WhatsApp</li>
                  <li>Berikan kritik yang membangun untuk kemajuan bersama</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Form Pengaduan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap *</Label>
                  <Input
                    id="nama"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rt">RT *</Label>
                  <Select
                    value={formData.rt}
                    onValueChange={(value) => setFormData({ ...formData, rt: value })}
                  >
                    <SelectTrigger id="rt">
                      <SelectValue placeholder="Pilih RT" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rt) => (
                        <SelectItem key={rt} value={String(rt)}>
                          RT {String(rt).padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kategori">Kategori *</Label>
                  <Select
                    value={formData.kategori}
                    onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                  >
                    <SelectTrigger id="kategori">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {kategoriList.map((kategori) => (
                        <SelectItem key={kategori} value={kategori}>
                          {kategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi Pengaduan *</Label>
                  <Textarea
                    id="deskripsi"
                    placeholder="Jelaskan pengaduan atau aspirasi Anda secara detail..."
                    rows={6}
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Jelaskan masalah atau aspirasi Anda dengan jelas agar dapat ditindaklanjuti dengan baik.
                  </p>
                </div>

                <Button type="submit" className="w-full gap-2" size="lg">
                  <Send className="h-4 w-4" />
                  Buat Template WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Dialog Template */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Template Pesan WhatsApp</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-sans">{messageTemplate}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Silakan salin template di atas atau langsung kirim via WhatsApp.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopy} className="flex-1 gap-2">
                  <Copy className="h-4 w-4" />
                  Salin
                </Button>
                <Button onClick={handleSendWhatsApp} className="flex-1 gap-2">
                  <Send className="h-4 w-4" />
                  Kirim via WhatsApp
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pengaduan;
