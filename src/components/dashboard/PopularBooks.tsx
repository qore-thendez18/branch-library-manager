import { TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PopularBook {
  id: string;
  title: string;
  author: string;
  borrowCount: number;
  maxCount: number;
}

const mockPopularBooks: PopularBook[] = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', borrowCount: 156, maxCount: 200 },
  { id: '2', title: 'Bumi Manusia', author: 'Pramoedya A.T.', borrowCount: 142, maxCount: 200 },
  { id: '3', title: 'Filosofi Teras', author: 'Henry Manampiring', borrowCount: 128, maxCount: 200 },
  { id: '4', title: 'Atomic Habits', author: 'James Clear', borrowCount: 115, maxCount: 200 },
  { id: '5', title: 'The Psychology of Money', author: 'Morgan Housel', borrowCount: 98, maxCount: 200 },
];

export function PopularBooks() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-md animate-slide-up" style={{ animationDelay: '500ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">Buku Populer</h3>
        </div>
        <span className="text-sm text-muted-foreground">Bulan ini</span>
      </div>
      
      <div className="space-y-5">
        {mockPopularBooks.map((book, index) => (
          <div key={book.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-sm">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-accent">{book.borrowCount}</span>
            </div>
            <Progress 
              value={(book.borrowCount / book.maxCount) * 100} 
              className="h-1.5 bg-muted"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
