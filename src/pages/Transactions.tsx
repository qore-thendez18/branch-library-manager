import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Calendar,
  User,
  BookOpen,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  bookTitle: string;
  memberName: string;
  branch: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  fine?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TRX001',
    bookTitle: 'Laskar Pelangi',
    memberName: 'Ahmad Rizki',
    branch: 'Pusat Jakarta',
    borrowDate: '2025-12-22',
    dueDate: '2026-01-05',
    status: 'active',
  },
  {
    id: 'TRX002',
    bookTitle: 'Bumi Manusia',
    memberName: 'Siti Nurhaliza',
    branch: 'Cabang Bandung',
    borrowDate: '2025-12-15',
    dueDate: '2025-12-29',
    returnDate: '2025-12-28',
    status: 'returned',
  },
  {
    id: 'TRX003',
    bookTitle: 'Filosofi Teras',
    memberName: 'Budi Santoso',
    branch: 'Pusat Jakarta',
    borrowDate: '2025-12-10',
    dueDate: '2025-12-24',
    status: 'overdue',
    fine: 15000,
  },
  {
    id: 'TRX004',
    bookTitle: 'Atomic Habits',
    memberName: 'Dewi Lestari',
    branch: 'Cabang Surabaya',
    borrowDate: '2025-12-20',
    dueDate: '2026-01-03',
    status: 'active',
  },
  {
    id: 'TRX005',
    bookTitle: 'Rich Dad Poor Dad',
    memberName: 'Eko Prasetyo',
    branch: 'Cabang Yogyakarta',
    borrowDate: '2025-12-05',
    dueDate: '2025-12-19',
    returnDate: '2025-12-25',
    status: 'returned',
    fine: 12000,
  },
  {
    id: 'TRX006',
    bookTitle: 'The Psychology of Money',
    memberName: 'Fitri Handayani',
    branch: 'Cabang Bandung',
    borrowDate: '2025-12-18',
    dueDate: '2026-01-01',
    status: 'active',
  },
];

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-info/10 text-info border-0">Dipinjam</Badge>;
      case 'returned':
        return <Badge className="bg-success/10 text-success border-0">Dikembalikan</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive/10 text-destructive border-0">Terlambat</Badge>;
    }
  };

  const handleNewTransaction = () => {
    toast({
      title: 'Transaksi berhasil dibuat',
      description: 'Peminjaman baru telah dicatat.',
    });
    setIsAddDialogOpen(false);
  };

  const stats = {
    active: mockTransactions.filter(t => t.status === 'active').length,
    returned: mockTransactions.filter(t => t.status === 'returned').length,
    overdue: mockTransactions.filter(t => t.status === 'overdue').length,
    totalFines: mockTransactions.reduce((acc, t) => acc + (t.fine || 0), 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Transaksi</h1>
            <p className="text-muted-foreground mt-1">
              Kelola peminjaman dan pengembalian buku
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" className="animate-fade-in">
                <Plus className="mr-2 h-4 w-4" />
                Peminjaman Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Peminjaman Baru</DialogTitle>
                <DialogDescription>
                  Catat peminjaman buku baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="member" className="text-right">Anggota</Label>
                  <Input id="member" placeholder="Cari anggota..." className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="book" className="text-right">Buku</Label>
                  <Input id="book" placeholder="Cari buku..." className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">Cabang</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih cabang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pusat">Pusat Jakarta</SelectItem>
                      <SelectItem value="bandung">Cabang Bandung</SelectItem>
                      <SelectItem value="surabaya">Cabang Surabaya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">Durasi</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih durasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 hari</SelectItem>
                      <SelectItem value="14">14 hari</SelectItem>
                      <SelectItem value="21">21 hari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button variant="accent" onClick={handleNewTransaction}>
                  Proses Peminjaman
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                  <ArrowUpRight className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dipinjam</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                  <ArrowDownLeft className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dikembalikan</p>
                  <p className="text-2xl font-bold">{stats.returned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Terlambat</p>
                  <p className="text-2xl font-bold">{stats.overdue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <span className="text-xl font-bold text-accent">Rp</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Denda</p>
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat('id-ID').format(stats.totalFines)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="active">Dipinjam</SelectItem>
              <SelectItem value="returned">Dikembalikan</SelectItem>
              <SelectItem value="overdue">Terlambat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-md overflow-hidden animate-slide-up" style={{ animationDelay: '150ms' }}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Buku</TableHead>
                <TableHead className="font-semibold">Anggota</TableHead>
                <TableHead className="font-semibold">Cabang</TableHead>
                <TableHead className="font-semibold">Tgl Pinjam</TableHead>
                <TableHead className="font-semibold">Jatuh Tempo</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Denda</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/30 cursor-pointer">
                  <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{tx.bookTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {tx.memberName}
                    </div>
                  </TableCell>
                  <TableCell>{tx.branch}</TableCell>
                  <TableCell>{new Date(tx.borrowDate).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(tx.dueDate).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
                  <TableCell>
                    {tx.fine ? (
                      <span className="font-medium text-destructive">
                        Rp {new Intl.NumberFormat('id-ID').format(tx.fine)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
