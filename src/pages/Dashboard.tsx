import {
  BookOpen,
  Building2,
  Users,
  ArrowLeftRight,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { BorrowingChart } from '@/components/dashboard/BorrowingChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { PopularBooks } from '@/components/dashboard/PopularBooks';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 17) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Berikut ringkasan aktivitas perpustakaan hari ini.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatsCard
            title="Total Buku"
            value="12,847"
            icon={BookOpen}
            trend={{ value: 12, isPositive: true }}
            iconClassName="bg-accent/10 text-accent"
            delay={0}
          />
          <StatsCard
            title="Cabang"
            value="8"
            icon={Building2}
            iconClassName="bg-info/10 text-info"
            delay={50}
          />
          <StatsCard
            title="Anggota Aktif"
            value="3,459"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
            iconClassName="bg-success/10 text-success"
            delay={100}
          />
          <StatsCard
            title="Peminjaman Aktif"
            value="847"
            icon={ArrowLeftRight}
            iconClassName="bg-warning/10 text-warning"
            delay={150}
          />
          <StatsCard
            title="Terlambat"
            value="23"
            icon={AlertTriangle}
            trend={{ value: 5, isPositive: false }}
            iconClassName="bg-destructive/10 text-destructive"
            delay={200}
          />
          <StatsCard
            title="Denda Bulan Ini"
            value="Rp 1.2jt"
            icon={DollarSign}
            iconClassName="bg-accent/10 text-accent"
            delay={250}
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BorrowingChart />
          <RecentTransactions />
        </div>

        {/* Popular Books */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Placeholder for additional chart or content */}
            <div className="rounded-xl bg-card p-6 shadow-md h-full animate-slide-up" style={{ animationDelay: '600ms' }}>
              <h3 className="text-lg font-semibold mb-4">Statistik Cabang</h3>
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
      </div>
    </DashboardLayout>
  );
}
