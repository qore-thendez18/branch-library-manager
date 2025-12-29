import { useState } from 'react';
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Users,
  BookOpen,
  Edit,
  Trash2,
  MoreVertical,
  Star,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isPusat: boolean;
  totalBooks: number;
  totalMembers: number;
  activeLoans: number;
  status: 'active' | 'inactive';
}

const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Perpustakaan Pusat Jakarta',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    phone: '021-5551234',
    isPusat: true,
    totalBooks: 4250,
    totalMembers: 1200,
    activeLoans: 320,
    status: 'active',
  },
  {
    id: '2',
    name: 'Cabang Bandung',
    address: 'Jl. Asia Afrika No. 45, Bandung',
    phone: '022-4231234',
    isPusat: false,
    totalBooks: 2100,
    totalMembers: 650,
    activeLoans: 180,
    status: 'active',
  },
  {
    id: '3',
    name: 'Cabang Surabaya',
    address: 'Jl. Tunjungan No. 78, Surabaya',
    phone: '031-5321234',
    isPusat: false,
    totalBooks: 1850,
    totalMembers: 580,
    activeLoans: 145,
    status: 'active',
  },
  {
    id: '4',
    name: 'Cabang Yogyakarta',
    address: 'Jl. Malioboro No. 56, Yogyakarta',
    phone: '0274-512345',
    isPusat: false,
    totalBooks: 1420,
    totalMembers: 420,
    activeLoans: 98,
    status: 'active',
  },
  {
    id: '5',
    name: 'Cabang Semarang',
    address: 'Jl. Pemuda No. 34, Semarang',
    phone: '024-8431234',
    isPusat: false,
    totalBooks: 980,
    totalMembers: 320,
    activeLoans: 72,
    status: 'active',
  },
  {
    id: '6',
    name: 'Cabang Medan',
    address: 'Jl. Diponegoro No. 89, Medan',
    phone: '061-4521234',
    isPusat: false,
    totalBooks: 750,
    totalMembers: 280,
    activeLoans: 45,
    status: 'inactive',
  },
];

export default function Branches() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddBranch = () => {
    toast({
      title: 'Cabang berhasil ditambahkan',
      description: 'Data cabang baru telah disimpan ke sistem.',
    });
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Cabang</h1>
            <p className="text-muted-foreground mt-1">
              Kelola cabang perpustakaan di seluruh Indonesia
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent" className="animate-fade-in">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Cabang
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Tambah Cabang Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi cabang perpustakaan yang akan ditambahkan.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nama</Label>
                  <Input id="name" placeholder="Nama cabang" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="address" className="text-right pt-2">Alamat</Label>
                  <Textarea id="address" placeholder="Alamat lengkap" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Telepon</Label>
                  <Input id="phone" placeholder="021-xxxxxxx" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Batal
                </Button>
                <Button variant="accent" onClick={handleAddBranch}>
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Cabang</p>
                  <p className="text-3xl font-bold">{mockBranches.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cabang Aktif</p>
                  <p className="text-3xl font-bold">{mockBranches.filter(b => b.status === 'active').length}</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Koleksi</p>
                  <p className="text-3xl font-bold">
                    {mockBranches.reduce((acc, b) => acc + b.totalBooks, 0).toLocaleString()}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Anggota</p>
                  <p className="text-3xl font-bold">
                    {mockBranches.reduce((acc, b) => acc + b.totalMembers, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branch Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockBranches.map((branch, index) => (
            <Card 
              key={branch.id} 
              className="card-hover animate-slide-up"
              style={{ animationDelay: `${100 + index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      branch.isPusat ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    }`}>
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {branch.name}
                        {branch.isPusat && (
                          <Star className="h-4 w-4 text-accent fill-accent" />
                        )}
                      </CardTitle>
                      <Badge 
                        variant={branch.status === 'active' ? 'default' : 'secondary'}
                        className={branch.status === 'active' ? 'bg-success/10 text-success border-0' : ''}
                      >
                        {branch.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold">{branch.totalBooks.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Buku</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{branch.totalMembers}</p>
                    <p className="text-xs text-muted-foreground">Anggota</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{branch.activeLoans}</p>
                    <p className="text-xs text-muted-foreground">Pinjaman</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
