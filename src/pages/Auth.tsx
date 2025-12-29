import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Library, Mail, Lock, User, Building2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

type AuthMode = 'login' | 'register';

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'anggota', label: 'Anggota' },
  { value: 'pustakawan', label: 'Pustakawan' },
  { value: 'admin_cabang', label: 'Admin Cabang' },
  { value: 'manajemen', label: 'Manajemen' },
  { value: 'super_admin', label: 'Super Admin' },
];

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'anggota' as UserRole,
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast({
            title: 'Berhasil masuk!',
            description: 'Selamat datang kembali di Perpustakaan Digital.',
          });
          navigate('/dashboard');
        } else {
          toast({
            title: 'Gagal masuk',
            description: result.error,
            variant: 'destructive',
          });
        }
      } else {
        const result = await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
        });
        if (result.success) {
          toast({
            title: 'Pendaftaran berhasil!',
            description: 'Akun Anda sedang menunggu persetujuan dari administrator.',
          });
          setMode('login');
        } else {
          toast({
            title: 'Gagal mendaftar',
            description: result.error,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 47% 20%) 50%, hsl(38 40% 25%) 100%)',
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20">
          <div className="animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent shadow-glow">
                <Library className="h-7 w-7 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground">Perpustakaan Digital</h1>
                <p className="text-primary-foreground/60 text-sm">PT. Cerdas Digital Nusantara</p>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6">
              Kelola Perpustakaan<br />
              <span className="text-accent">dengan Mudah</span>
            </h2>
            
            <p className="text-lg text-primary-foreground/70 max-w-md mb-8">
              Sistem manajemen perpustakaan digital terintegrasi untuk mengelola buku, 
              transaksi, dan cabang dengan efisien.
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                'Multi-cabang',
                'Laporan Real-time',
                'Manajemen Stok',
                'Pembayaran Denda',
              ].map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Library className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Perpustakaan Digital</span>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">
                {mode === 'login' ? 'Masuk' : 'Daftar'}
              </CardTitle>
              <CardDescription>
                {mode === 'login'
                  ? 'Masukkan kredensial Anda untuk mengakses sistem'
                  : 'Buat akun baru untuk bergabung dengan perpustakaan'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="role">Peran</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {mode === 'login' ? 'Masuk' : 'Daftar'}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                {mode === 'login' ? (
                  <p className="text-muted-foreground">
                    Belum punya akun?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-accent font-medium hover:underline"
                    >
                      Daftar sekarang
                    </button>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Sudah punya akun?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-accent font-medium hover:underline"
                    >
                      Masuk
                    </button>
                  </p>
                )}
              </div>

              {mode === 'login' && (
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-2">Demo credentials:</p>
                  <p className="text-xs font-mono">superadmin@library.com / password123</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
