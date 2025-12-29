import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  User,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { UserRole, UserStatus } from '@/types';
import { cn } from '@/lib/utils';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  branch?: string;
  createdAt: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'Super Administrator',
    email: 'superadmin@library.com',
    role: 'super_admin',
    status: 'aktif',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Admin Cabang Pusat',
    email: 'admin.pusat@library.com',
    role: 'admin_cabang',
    status: 'aktif',
    branch: 'Pusat Jakarta',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Pustakawan Senior',
    email: 'pustakawan@library.com',
    role: 'pustakawan',
    status: 'aktif',
    branch: 'Pusat Jakarta',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Ahmad Rizki',
    email: 'ahmad.rizki@email.com',
    role: 'anggota',
    status: 'aktif',
    createdAt: '2024-06-15',
  },
  {
    id: '5',
    name: 'Siti Nurhaliza',
    email: 'siti.nur@email.com',
    role: 'anggota',
    status: 'pending',
    createdAt: '2025-12-28',
  },
  {
    id: '6',
    name: 'Manager Operasional',
    email: 'manager@library.com',
    role: 'manajemen',
    status: 'aktif',
    createdAt: '2024-04-05',
  },
  {
    id: '7',
    name: 'Budi Santoso',
    email: 'budi.s@email.com',
    role: 'anggota',
    status: 'nonaktif',
    createdAt: '2024-05-20',
  },
];

const roleLabels: Record<UserRole, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-accent/10 text-accent' },
  admin_cabang: { label: 'Admin Cabang', color: 'bg-info/10 text-info' },
  pustakawan: { label: 'Pustakawan', color: 'bg-success/10 text-success' },
  anggota: { label: 'Anggota', color: 'bg-muted text-muted-foreground' },
  manajemen: { label: 'Manajemen', color: 'bg-warning/10 text-warning' },
};

const statusLabels: Record<UserStatus, { label: string; icon: typeof CheckCircle; color: string }> = {
  aktif: { label: 'Aktif', icon: CheckCircle, color: 'text-success' },
  pending: { label: 'Pending', icon: Clock, color: 'text-warning' },
  nonaktif: { label: 'Nonaktif', icon: XCircle, color: 'text-destructive' },
};

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleApprove = (userId: string) => {
    toast({
      title: 'Pengguna disetujui',
      description: 'Status pengguna telah diperbarui menjadi aktif.',
    });
  };

  const handleDeactivate = (userId: string) => {
    toast({
      title: 'Pengguna dinonaktifkan',
      description: 'Status pengguna telah diperbarui menjadi nonaktif.',
    });
  };

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'aktif').length,
    pending: mockUsers.filter(u => u.status === 'pending').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
            <p className="text-muted-foreground mt-1">
              Kelola pengguna dan hak akses sistem
            </p>
          </div>
          
          <Button variant="accent" className="animate-fade-in">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengguna
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 animate-slide-up">
          <div className="rounded-xl bg-card p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pengguna</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pengguna Aktif</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Menunggu Persetujuan</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Shield className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Peran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Peran</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="admin_cabang">Admin Cabang</SelectItem>
              <SelectItem value="pustakawan">Pustakawan</SelectItem>
              <SelectItem value="anggota">Anggota</SelectItem>
              <SelectItem value="manajemen">Manajemen</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="aktif">Aktif</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="nonaktif">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-card shadow-md overflow-hidden animate-slide-up" style={{ animationDelay: '150ms' }}>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Pengguna</TableHead>
                <TableHead className="font-semibold">Peran</TableHead>
                <TableHead className="font-semibold">Cabang</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Terdaftar</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const StatusIcon = statusLabels[user.status].icon;
                return (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn('border-0', roleLabels[user.role].color)}>
                        {roleLabels[user.role].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.branch || <span className="text-muted-foreground">-</span>}
                    </TableCell>
                    <TableCell>
                      <div className={cn('flex items-center gap-1.5', statusLabels[user.status].color)}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="font-medium">{statusLabels[user.status].label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
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
                          {user.status === 'pending' && (
                            <DropdownMenuItem onClick={() => handleApprove(user.id)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Setujui
                            </DropdownMenuItem>
                          )}
                          {user.status === 'aktif' && (
                            <DropdownMenuItem onClick={() => handleDeactivate(user.id)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Nonaktifkan
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
