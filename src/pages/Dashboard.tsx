import {
  BookOpen,
  Building2,
  Users,
  ArrowLeftRight,
  AlertTriangle,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BorrowingChart } from '@/components/dashboard/BorrowingChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { PopularBooks } from '@/components/dashboard/PopularBooks';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  const isBranchAdmin = user?.role === 'admin_cabang';
  const isPustakawan = user?.role === 'pustakawan';
  const isAnggota = user?.role === 'anggota';
  const isSuperAdmin = user?.role === 'super_admin';
  const isManajemen = user?.role === 'manajemen';

  // Mock branch data for Admin Cabang
  const currentBranch = {
    name: 'Cabang Pusat - Jakarta',
    id: '1',
    books: 4250,
    members: 1200,
    activeLoans: 320,
    overdueLoans: 8,
    finesThisMonth: 450000,
  };

  // Stats for Super Admin (all branches)
  const superAdminStats = [
    { title: 'Total Buku', value: '12,847', icon: BookOpen, trend: { value: 12, isPositive: true }, iconClassName: 'bg-accent/10 text-accent' },
    { title: 'Cabang', value: '8', icon: Building2, iconClassName: 'bg-info/10 text-info' },
    { title: 'Anggota Aktif', value: '3,459', icon: Users, trend: { value: 8, isPositive: true }, iconClassName: 'bg-success/10 text-success' },
    { title: 'Peminjaman Aktif', value: '847', icon: ArrowLeftRight, iconClassName: 'bg-warning/10 text-warning' },
    { title: 'Terlambat', value: '23', icon: AlertTriangle, trend: { value: 5, isPositive: false }, iconClassName: 'bg-destructive/10 text-destructive' },
    { title: 'Denda Bulan Ini', value: 'Rp 1.2jt', icon: DollarSign, iconClassName: 'bg-accent/10 text-accent' },
  ];

  // Stats for Admin Cabang (single branch)
  const branchAdminStats = [
    { title: 'Total Buku Cabang', value: currentBranch.books.toLocaleString(), icon: BookOpen, trend: { value: 5, isPositive: true }, iconClassName: 'bg-accent/10 text-accent' },
    { title: 'Anggota Cabang', value: currentBranch.members.toLocaleString(), icon: Users, trend: { value: 3, isPositive: true }, iconClassName: 'bg-success/10 text-success' },
    { title: 'Peminjaman Aktif', value: currentBranch.activeLoans.toString(), icon: ArrowLeftRight, iconClassName: 'bg-warning/10 text-warning' },
    { title: 'Terlambat', value: currentBranch.overdueLoans.toString(), icon: AlertTriangle, trend: { value: 2, isPositive: false }, iconClassName: 'bg-destructive/10 text-destructive' },
    { title: 'Denda Bulan Ini', value: `Rp ${(currentBranch.finesThisMonth / 1000).toFixed(0)}rb`, icon: DollarSign, iconClassName: 'bg-accent/10 text-accent' },
  ];

  // Stats for Pustakawan
  const pustakawanStats = [
    { title: 'Buku Tersedia', value: '3,920', icon: BookOpen, iconClassName: 'bg-accent/10 text-accent' },
    { title: 'Peminjaman Hari Ini', value: '24', icon: ArrowLeftRight, trend: { value: 8, isPositive: true }, iconClassName: 'bg-warning/10 text-warning' },
    { title: 'Pengembalian Hari Ini', value: '18', icon: ArrowLeftRight, iconClassName: 'bg-success/10 text-success' },
    { title: 'Terlambat', value: '8', icon: AlertTriangle, iconClassName: 'bg-destructive/10 text-destructive' },
  ];

  // Stats for Anggota
  const anggotaStats = [
    { title: 'Buku Dipinjam', value: '3', icon: BookOpen, iconClassName: 'bg-accent/10 text-accent' },
    { title: 'Harus Dikembalikan', value: '2', icon: AlertTriangle, iconClassName: 'bg-warning/10 text-warning' },
    { title: 'Total Denda', value: 'Rp 0', icon: DollarSign, iconClassName: 'bg-success/10 text-success' },
  ];

  const getStats = () => {
    if (isBranchAdmin) return branchAdminStats;
    if (isPustakawan) return pustakawanStats;
    if (isAnggota) return anggotaStats;
    return superAdminStats;
  };

  const stats = getStats();
  const gridCols = isAnggota ? 'lg:grid-cols-3' : isBranchAdmin || isPustakawan ? 'lg:grid-cols-5' : 'xl:grid-cols-6';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">
              {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            {isBranchAdmin && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentBranch.name}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            {isBranchAdmin 
              ? `Ringkasan aktivitas ${currentBranch.name} hari ini.`
              : isPustakawan 
                ? 'Ringkasan aktivitas layanan perpustakaan hari ini.'
                : isAnggota
                  ? 'Lihat status peminjaman dan aktivitas Anda.'
                  : 'Berikut ringkasan aktivitas perpustakaan hari ini.'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${gridCols}`}>
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={'trend' in stat && stat.trend ? stat.trend as { value: number; isPositive: boolean } : undefined}
              iconClassName={stat.iconClassName}
              delay={index * 50}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BorrowingChart />
          <RecentTransactions />
        </div>

        {/* Branch Stats - Only for Super Admin & Manajemen */}
        {(isSuperAdmin || isManajemen) && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-card p-6 shadow-md h-full animate-slide-up" style={{ animationDelay: '600ms' }}>
                <h3 className="text-lg font-semibold mb-4">Statistik Semua Cabang</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: 'Pusat - Jakarta', books: 4250, members: 1200, loans: 320 },
                    { name: 'Cabang Bandung', books: 2100, members: 650, loans: 180 },
                    { name: 'Cabang Surabaya', books: 1850, members: 580, loans: 145 },
                    { name: 'Cabang Yogyakarta', books: 1420, members: 420, loans: 98 },
                  ].map((branch) => (
                    <div
                      key={branch.name}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <p className="font-medium">{branch.name}</p>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Buku</p>
                          <p className="font-semibold">{branch.books.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Anggota</p>
                          <p className="font-semibold">{branch.members}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pinjaman</p>
                          <p className="font-semibold">{branch.loans}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <PopularBooks />
          </div>
        )}

        {/* Branch-specific content for Admin Cabang */}
        {isBranchAdmin && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-xl bg-card p-6 shadow-md h-full animate-slide-up" style={{ animationDelay: '600ms' }}>
                <h3 className="text-lg font-semibold mb-4">Ringkasan Cabang Anda</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-sm">Stok Buku Tersedia</p>
                    <p className="text-2xl font-bold text-accent">3,920</p>
                    <p className="text-xs text-muted-foreground mt-1">dari {currentBranch.books.toLocaleString()} total</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-sm">Anggota Baru Bulan Ini</p>
                    <p className="text-2xl font-bold text-success">+45</p>
                    <p className="text-xs text-muted-foreground mt-1">15% lebih tinggi dari bulan lalu</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-sm">Peminjaman Bulan Ini</p>
                    <p className="text-2xl font-bold text-warning">892</p>
                    <p className="text-xs text-muted-foreground mt-1">Target: 1,000</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-muted-foreground text-sm">Tingkat Pengembalian</p>
                    <p className="text-2xl font-bold text-success">97.5%</p>
                    <p className="text-xs text-muted-foreground mt-1">Tepat waktu</p>
                  </div>
                </div>
              </div>
            </div>
            <PopularBooks />
          </div>
        )}

        {/* For Pustakawan and Anggota - just show popular books */}
        {(isPustakawan || isAnggota) && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <PopularBooks />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
