import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  cabang_id?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'superadmin@library.com',
    password: 'password123',
    name: 'Super Administrator',
    role: 'super_admin',
    status: 'aktif',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@library.com',
    password: 'password123',
    name: 'Admin Cabang Pusat',
    role: 'admin_cabang',
    status: 'aktif',
    cabang_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'pustakawan@library.com',
    password: 'password123',
    name: 'Pustakawan Senior',
    role: 'pustakawan',
    status: 'aktif',
    cabang_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'member@library.com',
    password: 'password123',
    name: 'Anggota Perpustakaan',
    role: 'anggota',
    status: 'aktif',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    email: 'manager@library.com',
    password: 'password123',
    name: 'Manager Operasional',
    role: 'manajemen',
    status: 'aktif',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('library_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { success: false, error: 'Email atau password salah' };
      }
      
      if (foundUser.status === 'pending') {
        return { success: false, error: 'Akun Anda masih menunggu persetujuan' };
      }
      
      if (foundUser.status === 'nonaktif') {
        return { success: false, error: 'Akun Anda telah dinonaktifkan' };
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('library_user', JSON.stringify(userWithoutPassword));
      
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email === data.email)) {
        return { success: false, error: 'Email sudah terdaftar' };
      }
      
      // In real app, this would create a new user with 'pending' status
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('library_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
