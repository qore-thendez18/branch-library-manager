import { useState } from 'react';
import {
  Search,
  Filter,
  Activity,
  User,
  Clock,
  Shield,
  LogIn,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view';
  resource: string;
  detail: string;
  ipAddress: string;
  timestamp: string;
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Super Administrator',
    userRole: 'super_admin',
    action: 'login',
    resource: 'System',
    detail: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    timestamp: '2025-12-29T10:30:00',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Admin Cabang Pusat',
    userRole: 'admin_cabang',
    action: 'create',
    resource: 'Buku',
    detail: 'Added new book: "Filosofi Teras"',
    ipAddress: '192.168.1.105',
    timestamp: '2025-12-29T09:45:00',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Pustakawan Senior',
    userRole: 'pustakawan',
    action: 'update',
    resource: 'Transaksi',
    detail: 'Updated transaction TRX005 status to returned',
    ipAddress: '192.168.1.108',
    timestamp: '2025-12-29T09:30:00',
  },
  {
    id: '4',
    userId: '1',
    userName: 'Super Administrator',
    userRole: 'super_admin',
    action: 'delete',
    resource: 'User',
    detail: 'Deleted inactive user: john.doe@email.com',
    ipAddress: '192.168.1.100',
    timestamp: '2025-12-29T09:00:00',
  },
  {
    id: '5',
    userId: '5',
    userName: 'Manager Operasional',
    userRole: 'manajemen',
    action: 'view',
    resource: 'Report',
    detail: 'Viewed monthly transaction report',
    ipAddress: '192.168.1.120',
    timestamp: '2025-12-29T08:45:00',
  },
  {
    id: '6',
    userId: '2',
    userName: 'Admin Cabang Pusat',
    userRole: 'admin_cabang',
    action: 'update',
    resource: 'Cabang',
    detail: 'Updated branch information: Cabang Bandung',
    ipAddress: '192.168.1.105',
    timestamp: '2025-12-29T08:30:00',
  },
  {
    id: '7',
    userId: '3',
    userName: 'Pustakawan Senior',
    userRole: 'pustakawan',
    action: 'create',
    resource: 'Transaksi',
    detail: 'Created new borrowing: TRX012',
    ipAddress: '192.168.1.108',
    timestamp: '2025-12-28T16:00:00',
  },
  {
    id: '8',
    userId: '1',
    userName: 'Super Administrator',
    userRole: 'super_admin',
    action: 'logout',
    resource: 'System',
    detail: 'User logged out',
    ipAddress: '192.168.1.100',
    timestamp: '2025-12-28T18:00:00',
  },
];

const actionConfig: Record<AuditLog['action'], { icon: typeof Activity; color: string; label: string }> = {
  login: { icon: LogIn, color: 'bg-success/10 text-success', label: 'Login' },
  logout: { icon: LogOut, color: 'bg-muted text-muted-foreground', label: 'Logout' },
  create: { icon: Plus, color: 'bg-info/10 text-info', label: 'Create' },
  update: { icon: Edit, color: 'bg-warning/10 text-warning', label: 'Update' },
  delete: { icon: Trash2, color: 'bg-destructive/10 text-destructive', label: 'Delete' },
  view: { icon: Eye, color: 'bg-accent/10 text-accent', label: 'View' },
};

export default function AuditLog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground mt-1">
            Pantau semua aktivitas sistem untuk keamanan dan compliance
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari aktivitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Aksi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Aksi</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs Timeline */}
        <div className="rounded-xl border bg-card shadow-md overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="p-4 border-b bg-muted/30">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4" />
              {filteredLogs.length} aktivitas ditemukan
            </div>
          </div>
          
          <div className="divide-y">
            {filteredLogs.map((log) => {
              const ActionIcon = actionConfig[log.action].icon;
              const { date, time } = formatTimestamp(log.timestamp);
              
              return (
                <div
                  key={log.id}
                  className="flex gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                    actionConfig[log.action].color
                  )}>
                    <ActionIcon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{log.detail}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.userName}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {log.resource}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium">{time}</p>
                        <p className="text-xs text-muted-foreground">{date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {log.userRole.replace('_', ' ')}
                      </span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline">
            Muat Lebih Banyak
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
