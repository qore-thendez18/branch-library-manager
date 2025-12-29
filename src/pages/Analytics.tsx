import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, BookOpen, ArrowLeftRight } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', pinjam: 450, kembali: 420 },
  { month: 'Feb', pinjam: 520, kembali: 480 },
  { month: 'Mar', pinjam: 480, kembali: 510 },
  { month: 'Apr', pinjam: 620, kembali: 580 },
  { month: 'Mei', pinjam: 580, kembali: 560 },
  { month: 'Jun', pinjam: 700, kembali: 650 },
  { month: 'Jul', pinjam: 750, kembali: 720 },
  { month: 'Ags', pinjam: 680, kembali: 690 },
  { month: 'Sep', pinjam: 720, kembali: 700 },
  { month: 'Okt', pinjam: 800, kembali: 780 },
  { month: 'Nov', pinjam: 850, kembali: 820 },
  { month: 'Des', pinjam: 920, kembali: 880 },
];

const categoryData = [
  { name: 'Fiksi', value: 3500, color: 'hsl(38, 92%, 50%)' },
  { name: 'Non-Fiksi', value: 2800, color: 'hsl(199, 89%, 48%)' },
  { name: 'Self-Help', value: 2200, color: 'hsl(142, 76%, 36%)' },
  { name: 'Sejarah', value: 1800, color: 'hsl(222, 47%, 20%)' },
  { name: 'Teknologi', value: 1500, color: 'hsl(0, 84%, 60%)' },
];

const branchPerformance = [
  { name: 'Pusat Jakarta', pinjam: 320, anggota: 1200 },
  { name: 'Bandung', pinjam: 180, anggota: 650 },
  { name: 'Surabaya', pinjam: 145, anggota: 580 },
  { name: 'Yogyakarta', pinjam: 98, anggota: 420 },
  { name: 'Semarang', pinjam: 72, anggota: 320 },
];

const memberGrowth = [
  { month: 'Jan', members: 2800 },
  { month: 'Feb', members: 2950 },
  { month: 'Mar', members: 3100 },
  { month: 'Apr', members: 3180 },
  { month: 'Mei', members: 3250 },
  { month: 'Jun', members: 3320 },
  { month: 'Jul', members: 3400 },
  { month: 'Ags', members: 3480 },
  { month: 'Sep', members: 3550 },
  { month: 'Okt', members: 3620 },
  { month: 'Nov', members: 3700 },
  { month: 'Des', members: 3800 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Analitik</h1>
            <p className="text-muted-foreground mt-1">
              Pantau performa dan tren perpustakaan
            </p>
          </div>
          
          <Select defaultValue="2025">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Peminjaman</p>
                  <p className="text-3xl font-bold">8,070</p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    +12.5% dari tahun lalu
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <ArrowLeftRight className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Anggota Baru</p>
                  <p className="text-3xl font-bold">1,000</p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    +8.2% dari tahun lalu
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                  <Users className="h-6 w-6 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Buku Baru</p>
                  <p className="text-3xl font-bold">847</p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    +5.4% dari tahun lalu
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                  <BookOpen className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tingkat Keterlambatan</p>
                  <p className="text-3xl font-bold">3.2%</p>
                  <p className="text-sm text-success flex items-center gap-1 mt-1">
                    <TrendingDown className="h-4 w-4" />
                    -1.5% dari tahun lalu
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                  <span className="text-xl font-bold text-warning">%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Tren Peminjaman & Pengembalian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pinjam"
                      name="Peminjaman"
                      stroke="hsl(38 92% 50%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(38 92% 50%)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="kembali"
                      name="Pengembalian"
                      stroke="hsl(142 76% 36%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(142 76% 36%)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
            <CardHeader>
              <CardTitle>Distribusi Kategori Buku</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [value.toLocaleString(), 'Jumlah Buku']}
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Performa per Cabang</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="pinjam" name="Peminjaman Aktif" fill="hsl(38 92% 50%)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="anggota" name="Total Anggota" fill="hsl(199 89% 48%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '250ms' }}>
            <CardHeader>
              <CardTitle>Pertumbuhan Anggota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={memberGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar
                      dataKey="members"
                      name="Total Anggota"
                      fill="hsl(222 47% 20%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
