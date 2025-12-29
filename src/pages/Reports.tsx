import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  File,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Report {
  id: string;
  title: string;
  type: 'stock' | 'transaction' | 'fine' | 'usage';
  period: string;
  generatedAt: string;
  status: 'ready' | 'generating';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Laporan Stok Buku',
    type: 'stock',
    period: 'Desember 2025',
    generatedAt: '2025-12-29 08:00',
    status: 'ready',
  },
  {
    id: '2',
    title: 'Laporan Transaksi Peminjaman',
    type: 'transaction',
    period: 'Desember 2025',
    generatedAt: '2025-12-29 08:00',
    status: 'ready',
  },
  {
    id: '3',
    title: 'Laporan Denda',
    type: 'fine',
    period: 'Desember 2025',
    generatedAt: '2025-12-29 08:00',
    status: 'ready',
  },
  {
    id: '4',
    title: 'Laporan Penggunaan Perpustakaan',
    type: 'usage',
    period: 'Desember 2025',
    generatedAt: '2025-12-29 08:00',
    status: 'ready',
  },
  {
    id: '5',
    title: 'Laporan Stok Buku',
    type: 'stock',
    period: 'November 2025',
    generatedAt: '2025-11-30 08:00',
    status: 'ready',
  },
  {
    id: '6',
    title: 'Laporan Transaksi Peminjaman',
    type: 'transaction',
    period: 'November 2025',
    generatedAt: '2025-11-30 08:00',
    status: 'ready',
  },
];

const reportTemplates = [
  {
    id: 'stock',
    title: 'Laporan Stok Buku',
    description: 'Laporan inventaris buku per cabang, termasuk ketersediaan dan kondisi stok.',
    icon: '📚',
  },
  {
    id: 'transaction',
    title: 'Laporan Transaksi',
    description: 'Rincian peminjaman dan pengembalian buku dalam periode tertentu.',
    icon: '🔄',
  },
  {
    id: 'fine',
    title: 'Laporan Denda',
    description: 'Ringkasan denda keterlambatan dan status pembayaran.',
    icon: '💰',
  },
  {
    id: 'usage',
    title: 'Laporan Penggunaan',
    description: 'Statistik penggunaan perpustakaan, termasuk kunjungan dan aktivitas anggota.',
    icon: '📊',
  },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const { toast } = useToast();

  const handleGenerateReport = (reportType: string) => {
    toast({
      title: 'Membuat laporan...',
      description: 'Laporan sedang diproses. Anda akan mendapat notifikasi ketika selesai.',
    });
  };

  const handleDownload = (reportId: string, format: 'pdf' | 'excel') => {
    toast({
      title: `Mengunduh ${format.toUpperCase()}`,
      description: 'File akan terunduh dalam beberapa saat.',
    });
  };

  const getTypeColor = (type: Report['type']) => {
    const colors = {
      stock: 'bg-accent/10 text-accent',
      transaction: 'bg-info/10 text-info',
      fine: 'bg-warning/10 text-warning',
      usage: 'bg-success/10 text-success',
    };
    return colors[type];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Generate dan unduh laporan perpustakaan
          </p>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="generate">Buat Laporan</TabsTrigger>
            <TabsTrigger value="history">Riwayat Laporan</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6 animate-slide-up">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Mingguan</SelectItem>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="quarterly">Triwulan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Cabang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Cabang</SelectItem>
                  <SelectItem value="pusat">Pusat Jakarta</SelectItem>
                  <SelectItem value="bandung">Cabang Bandung</SelectItem>
                  <SelectItem value="surabaya">Cabang Surabaya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Report Templates */}
            <div className="grid gap-4 sm:grid-cols-2">
              {reportTemplates.map((template, index) => (
                <Card 
                  key={template.id} 
                  className="card-hover"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{template.icon}</span>
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        variant="accent"
                        className="flex-1"
                        onClick={() => handleGenerateReport(template.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate PDF
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleGenerateReport(template.id)}
                      >
                        <FileSpreadsheet className="mr-2 h-4 w-4" />
                        Generate Excel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 animate-slide-up">
            <div className="rounded-xl border bg-card shadow-md overflow-hidden">
              <div className="divide-y">
                {mockReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{report.title}</p>
                          <Badge className={cn('border-0', getTypeColor(report.type))}>
                            {report.type === 'stock' && 'Stok'}
                            {report.type === 'transaction' && 'Transaksi'}
                            {report.type === 'fine' && 'Denda'}
                            {report.type === 'usage' && 'Penggunaan'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {report.period} • Dibuat {report.generatedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'ready' ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report.id, 'pdf')}
                          >
                            <File className="mr-1 h-4 w-4" />
                            PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report.id, 'excel')}
                          >
                            <FileSpreadsheet className="mr-1 h-4 w-4" />
                            Excel
                          </Button>
                        </>
                      ) : (
                        <Badge variant="secondary">Memproses...</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
