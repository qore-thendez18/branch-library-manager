import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  type: 'borrow' | 'return';
  bookTitle: string;
  memberName: string;
  date: string;
  status: 'active' | 'returned' | 'overdue';
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'borrow',
    bookTitle: 'Laskar Pelangi',
    memberName: 'Ahmad Rizki',
    date: '29 Des 2025',
    status: 'active',
  },
  {
    id: '2',
    type: 'return',
    bookTitle: 'Bumi Manusia',
    memberName: 'Siti Nurhaliza',
    date: '28 Des 2025',
    status: 'returned',
  },
  {
    id: '3',
    type: 'borrow',
    bookTitle: 'Filosofi Teras',
    memberName: 'Budi Santoso',
    date: '28 Des 2025',
    status: 'overdue',
  },
  {
    id: '4',
    type: 'return',
    bookTitle: 'Atomic Habits',
    memberName: 'Dewi Lestari',
    date: '27 Des 2025',
    status: 'returned',
  },
  {
    id: '5',
    type: 'borrow',
    bookTitle: 'Rich Dad Poor Dad',
    memberName: 'Eko Prasetyo',
    date: '27 Des 2025',
    status: 'active',
  },
];

export function RecentTransactions() {
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-info/10 text-info border-0">Aktif</Badge>;
      case 'returned':
        return <Badge variant="secondary" className="bg-success/10 text-success border-0">Dikembalikan</Badge>;
      case 'overdue':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-0">Terlambat</Badge>;
    }
  };

  return (
    <div className="rounded-xl bg-card p-6 shadow-md animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Transaksi Terbaru</h3>
        <button className="text-sm text-accent hover:underline">Lihat semua</button>
      </div>
      
      <div className="space-y-4">
        {mockTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                transaction.type === 'borrow'
                  ? 'bg-info/10 text-info'
                  : 'bg-success/10 text-success'
              )}
            >
              {transaction.type === 'borrow' ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownLeft className="h-5 w-5" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{transaction.bookTitle}</p>
              <p className="text-sm text-muted-foreground">{transaction.memberName}</p>
            </div>
            
            <div className="text-right">
              {getStatusBadge(transaction.status)}
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                <Clock className="h-3 w-3" />
                {transaction.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
