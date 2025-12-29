import { useState } from 'react';
import {
  Search,
  Filter,
  CreditCard,
  Wallet,
  CheckCircle,
  Clock,
  DollarSign,
  Receipt,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Payment {
  id: string;
  transactionId: string;
  memberName: string;
  bookTitle: string;
  amount: number;
  paymentDate?: string;
  paymentMethod?: string;
  status: 'paid' | 'unpaid';
  dueDate: string;
}

const mockPayments: Payment[] = [
  {
    id: 'PAY001',
    transactionId: 'TRX003',
    memberName: 'Budi Santoso',
    bookTitle: 'Filosofi Teras',
    amount: 15000,
    status: 'unpaid',
    dueDate: '2025-12-24',
  },
  {
    id: 'PAY002',
    transactionId: 'TRX005',
    memberName: 'Eko Prasetyo',
    bookTitle: 'Rich Dad Poor Dad',
    amount: 12000,
    paymentDate: '2025-12-26',
    paymentMethod: 'Transfer Bank',
    status: 'paid',
    dueDate: '2025-12-19',
  },
  {
    id: 'PAY003',
    transactionId: 'TRX008',
    memberName: 'Dewi Lestari',
    bookTitle: 'The Alchemist',
    amount: 8000,
    status: 'unpaid',
    dueDate: '2025-12-27',
  },
  {
    id: 'PAY004',
    transactionId: 'TRX010',
    memberName: 'Ahmad Rizki',
    bookTitle: 'Sapiens',
    amount: 20000,
    paymentDate: '2025-12-28',
    paymentMethod: 'Tunai',
    status: 'paid',
    dueDate: '2025-12-20',
  },
  {
    id: 'PAY005',
    transactionId: 'TRX012',
    memberName: 'Siti Nurhaliza',
    bookTitle: 'Atomic Habits',
    amount: 5000,
    status: 'unpaid',
    dueDate: '2025-12-28',
  },
];

const paymentMethods = [
  { value: 'tunai', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'ewallet', label: 'E-Wallet' },
  { value: 'debit', label: 'Kartu Debit' },
];

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const { toast } = useToast();

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUnpaid: mockPayments.filter(p => p.status === 'unpaid').reduce((acc, p) => acc + p.amount, 0),
    totalPaid: mockPayments.filter(p => p.status === 'paid').reduce((acc, p) => acc + p.amount, 0),
    unpaidCount: mockPayments.filter(p => p.status === 'unpaid').length,
    paidCount: mockPayments.filter(p => p.status === 'paid').length,
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: 'Pilih metode pembayaran',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Pembayaran berhasil',
      description: `Denda sebesar Rp ${selectedPayment?.amount.toLocaleString()} telah dibayar.`,
    });
    setIsPayDialogOpen(false);
    setSelectedPayment(null);
    setPaymentMethod('');
  };

  const openPayDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsPayDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Pembayaran Denda</h1>
          <p className="text-muted-foreground mt-1">
            Kelola pembayaran denda keterlambatan
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Belum Dibayar</p>
                  <p className="text-2xl font-bold">
                    Rp {stats.totalUnpaid.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sudah Dibayar</p>
                  <p className="text-2xl font-bold">
                    Rp {stats.totalPaid.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                  <Receipt className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.unpaidCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                  <Wallet className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                  <p className="text-2xl font-bold">{stats.paidCount}</p>
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
              placeholder="Cari pembayaran..."
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
              <SelectItem value="unpaid">Belum Dibayar</SelectItem>
              <SelectItem value="paid">Sudah Dibayar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-md overflow-hidden animate-slide-up" style={{ animationDelay: '150ms' }}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Anggota</TableHead>
                <TableHead className="font-semibold">Buku</TableHead>
                <TableHead className="font-semibold">Jumlah</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Metode</TableHead>
                <TableHead className="font-semibold">Tgl Bayar</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell className="font-medium">{payment.memberName}</TableCell>
                  <TableCell>{payment.bookTitle}</TableCell>
                  <TableCell className="font-semibold">
                    Rp {payment.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {payment.status === 'paid' ? (
                      <Badge className="bg-success/10 text-success border-0">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Lunas
                      </Badge>
                    ) : (
                      <Badge className="bg-destructive/10 text-destructive border-0">
                        <Clock className="mr-1 h-3 w-3" />
                        Belum Bayar
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.paymentMethod || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.paymentDate ? (
                      new Date(payment.paymentDate).toLocaleDateString('id-ID')
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {payment.status === 'unpaid' && (
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => openPayDialog(payment)}
                      >
                        <CreditCard className="mr-1 h-4 w-4" />
                        Bayar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Payment Dialog */}
        <Dialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Proses Pembayaran</DialogTitle>
              <DialogDescription>
                Konfirmasi pembayaran denda untuk {selectedPayment?.memberName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaksi</span>
                  <span className="font-medium">{selectedPayment?.transactionId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Buku</span>
                  <span className="font-medium">{selectedPayment?.bookTitle}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jatuh Tempo</span>
                  <span className="font-medium">
                    {selectedPayment?.dueDate && new Date(selectedPayment.dueDate).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total Denda</span>
                  <span className="font-bold text-accent text-lg">
                    Rp {selectedPayment?.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Metode Pembayaran</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih metode" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPayDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="accent" onClick={handlePayment}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Konfirmasi Pembayaran
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
