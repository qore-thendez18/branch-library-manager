import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  BookOpen,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  category: string;
  totalStock: number;
  availableStock: number;
}

const mockBooks: Book[] = [
  {
    id: '1',
    isbn: '978-602-291-032-1',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    publisher: 'Bentang Pustaka',
    year: 2005,
    category: 'Fiksi',
    totalStock: 25,
    availableStock: 18,
  },
  {
    id: '2',
    isbn: '978-979-433-390-4',
    title: 'Bumi Manusia',
    author: 'Pramoedya Ananta Toer',
    publisher: 'Hasta Mitra',
    year: 1980,
    category: 'Fiksi Sejarah',
    totalStock: 20,
    availableStock: 12,
  },
  {
    id: '3',
    isbn: '978-602-291-476-3',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    publisher: 'Kompas',
    year: 2018,
    category: 'Self-Help',
    totalStock: 30,
    availableStock: 22,
  },
  {
    id: '4',
    isbn: '978-0-7352-1136-1',
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Avery',
    year: 2018,
    category: 'Self-Help',
    totalStock: 35,
    availableStock: 28,
  },
  {
    id: '5',
    isbn: '978-0-06-285654-8',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    publisher: 'Harriman House',
    year: 2020,
    category: 'Keuangan',
    totalStock: 15,
    availableStock: 8,
  },
  {
    id: '6',
    isbn: '978-602-8519-93-3',
    title: 'Negeri 5 Menara',
    author: 'Ahmad Fuadi',
    publisher: 'Gramedia',
    year: 2009,
    category: 'Fiksi',
    totalStock: 22,
    availableStock: 15,
  },
];

const categories = ['Semua', 'Fiksi', 'Fiksi Sejarah', 'Self-Help', 'Keuangan', 'Teknologi', 'Sains'];

export default function Books() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory = selectedCategory === 'Semua' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockBadge = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) {
      return <Badge variant="destructive">Habis</Badge>;
    }
    if (percentage < 30) {
      return <Badge className="bg-warning/10 text-warning border-0">Terbatas</Badge>;
    }
    return <Badge className="bg-success/10 text-success border-0">Tersedia</Badge>;
  };

  const handleAddBook = () => {
    toast({
      title: 'Buku berhasil ditambahkan',
      description: 'Data buku baru telah disimpan ke sistem.',
    });
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Buku</h1>
            <p className="text-muted-foreground mt-1">
              Kelola koleksi buku perpustakaan
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" className="animate-fade-in">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Buku
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Buku Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi buku yang akan ditambahkan ke koleksi.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="isbn" className="text-right">ISBN</Label>
                  <Input id="isbn" placeholder="978-xxx-xxx-xxx-x" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Judul</Label>
                  <Input id="title" placeholder="Judul buku" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">Penulis</Label>
                  <Input id="author" placeholder="Nama penulis" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="publisher" className="text-right">Penerbit</Label>
                  <Input id="publisher" placeholder="Nama penerbit" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">Tahun</Label>
                  <Input id="year" type="number" placeholder="2024" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Kategori</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== 'Semua').map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">Stok</Label>
                  <Input id="stock" type="number" placeholder="0" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">Deskripsi</Label>
                  <Textarea id="description" placeholder="Deskripsi buku" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button variant="accent" onClick={handleAddBook}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari judul, penulis, atau ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-md overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Buku</TableHead>
                <TableHead className="font-semibold">ISBN</TableHead>
                <TableHead className="font-semibold">Kategori</TableHead>
                <TableHead className="font-semibold">Tahun</TableHead>
                <TableHead className="font-semibold">Stok</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{book.category}</Badge>
                  </TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <span className="font-medium">{book.availableStock}</span>
                    <span className="text-muted-foreground">/{book.totalStock}</span>
                  </TableCell>
                  <TableCell>{getStockBadge(book.availableStock, book.totalStock)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Menampilkan {filteredBooks.length} dari {mockBooks.length} buku
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
