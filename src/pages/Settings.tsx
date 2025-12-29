import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Building2,
  Bell,
  Shield,
  Database,
  Mail,
  Save,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    libraryName: 'PT. Cerdas Digital Nusantara',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    phone: '021-5551234',
    email: 'info@perpustakaandigital.id',
    borrowingDuration: '14',
    maxBooksPerMember: '3',
    finePerDay: '2000',
    emailNotifications: true,
    overdueReminders: true,
    newBookAlerts: false,
    dailyBackup: true,
    autoLogout: '30',
  });

  const handleSave = () => {
    toast({
      title: 'Pengaturan disimpan',
      description: 'Perubahan berhasil diterapkan.',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
          <p className="text-muted-foreground mt-1">
            Konfigurasi sistem perpustakaan
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="general" className="gap-2">
              <Building2 className="h-4 w-4" />
              Umum
            </TabsTrigger>
            <TabsTrigger value="borrowing" className="gap-2">
              <SettingsIcon className="h-4 w-4" />
              Peminjaman
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifikasi
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Keamanan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Perpustakaan</CardTitle>
                <CardDescription>
                  Detail dasar tentang perpustakaan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="libraryName">Nama Perpustakaan</Label>
                    <Input
                      id="libraryName"
                      value={settings.libraryName}
                      onChange={(e) => setSettings({ ...settings, libraryName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="borrowing" className="space-y-6 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Aturan Peminjaman</CardTitle>
                <CardDescription>
                  Konfigurasi durasi dan batas peminjaman
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="borrowingDuration">Durasi Peminjaman (hari)</Label>
                    <Select
                      value={settings.borrowingDuration}
                      onValueChange={(value) => setSettings({ ...settings, borrowingDuration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 hari</SelectItem>
                        <SelectItem value="14">14 hari</SelectItem>
                        <SelectItem value="21">21 hari</SelectItem>
                        <SelectItem value="30">30 hari</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBooks">Maks. Buku per Anggota</Label>
                    <Select
                      value={settings.maxBooksPerMember}
                      onValueChange={(value) => setSettings({ ...settings, maxBooksPerMember: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 buku</SelectItem>
                        <SelectItem value="2">2 buku</SelectItem>
                        <SelectItem value="3">3 buku</SelectItem>
                        <SelectItem value="5">5 buku</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finePerDay">Denda per Hari (Rp)</Label>
                    <Input
                      id="finePerDay"
                      type="number"
                      value={settings.finePerDay}
                      onChange={(e) => setSettings({ ...settings, finePerDay: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Kelola notifikasi email dan peringatan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi transaksi via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pengingat Keterlambatan</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim pengingat H-3 sebelum jatuh tempo
                    </p>
                  </div>
                  <Switch
                    checked={settings.overdueReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, overdueReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifikasi Buku Baru</Label>
                    <p className="text-sm text-muted-foreground">
                      Beritahu anggota saat ada koleksi baru
                    </p>
                  </div>
                  <Switch
                    checked={settings.newBookAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, newBookAlerts: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Keamanan & Backup</CardTitle>
                <CardDescription>
                  Pengaturan keamanan dan backup data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Harian Otomatis</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup database setiap hari pukul 00:00
                    </p>
                  </div>
                  <Switch
                    checked={settings.dailyBackup}
                    onCheckedChange={(checked) => setSettings({ ...settings, dailyBackup: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoLogout">Auto Logout (menit)</Label>
                  <Select
                    value={settings.autoLogout}
                    onValueChange={(value) => setSettings({ ...settings, autoLogout: value })}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 menit</SelectItem>
                      <SelectItem value="30">30 menit</SelectItem>
                      <SelectItem value="60">60 menit</SelectItem>
                      <SelectItem value="120">2 jam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end animate-fade-in">
          <Button variant="accent" size="lg" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Simpan Pengaturan
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
