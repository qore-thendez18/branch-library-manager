import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  Users,
  ArrowLeftRight,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Library,
  Shield,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['super_admin', 'admin_cabang', 'pustakawan', 'anggota', 'manajemen'],
  },
  {
    title: 'Buku',
    href: '/books',
    icon: BookOpen,
    roles: ['super_admin', 'admin_cabang', 'pustakawan', 'anggota', 'manajemen'],
  },
  {
    title: 'Cabang',
    href: '/branches',
    icon: Building2,
    roles: ['super_admin', 'admin_cabang', 'manajemen'],
  },
  {
    title: 'Pengguna',
    href: '/users',
    icon: Users,
    roles: ['super_admin', 'admin_cabang'],
  },
  {
    title: 'Transaksi',
    href: '/transactions',
    icon: ArrowLeftRight,
    roles: ['super_admin', 'admin_cabang', 'pustakawan', 'anggota'],
  },
  {
    title: 'Pembayaran',
    href: '/payments',
    icon: CreditCard,
    roles: ['super_admin', 'admin_cabang', 'pustakawan', 'anggota'],
  },
  {
    title: 'Laporan',
    href: '/reports',
    icon: FileText,
    roles: ['super_admin', 'admin_cabang', 'manajemen'],
  },
  {
    title: 'Analitik',
    href: '/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'manajemen'],
  },
  {
    title: 'Audit Log',
    href: '/audit-log',
    icon: ClipboardList,
    roles: ['super_admin'],
  },
  {
    title: 'Pengaturan',
    href: '/settings',
    icon: Settings,
    roles: ['super_admin', 'admin_cabang'],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter(
    item => user && item.roles.includes(user.role)
  );

  const getRoleBadge = (role: UserRole) => {
    const badges: Record<UserRole, { label: string; className: string }> = {
      super_admin: { label: 'Super Admin', className: 'bg-accent/20 text-accent' },
      admin_cabang: { label: 'Admin Cabang', className: 'bg-info/20 text-info' },
      pustakawan: { label: 'Pustakawan', className: 'bg-success/20 text-success' },
      anggota: { label: 'Anggota', className: 'bg-muted text-muted-foreground' },
      manajemen: { label: 'Manajemen', className: 'bg-warning/20 text-warning' },
    };
    return badges[role];
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center w-full')}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Library className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-sm font-bold text-sidebar-foreground">Perpustakaan</h1>
              <p className="text-xs text-sidebar-foreground/60">Digital</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent',
            collapsed && 'absolute -right-3 top-6 h-6 w-6 rounded-full bg-sidebar border border-sidebar-border'
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Info */}
      {user && (
        <div className={cn('border-b border-sidebar-border p-4', collapsed && 'px-2')}>
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <span
                  className={cn(
                    'inline-block text-xs px-2 py-0.5 rounded-full mt-1',
                    getRoleBadge(user.role).className
                  )}
                >
                  {getRoleBadge(user.role).label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary-foreground')} />
              {!collapsed && <span className="animate-fade-in">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            'w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive',
            collapsed && 'justify-center px-2'
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Keluar</span>}
        </Button>
      </div>
    </aside>
  );
}
