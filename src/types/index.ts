export type UserRole = 'super_admin' | 'admin_cabang' | 'pustakawan' | 'anggota' | 'manajemen';

export type UserStatus = 'pending' | 'aktif' | 'nonaktif';

export type TransactionStatus = 'dipinjam' | 'dikembalikan' | 'terlambat';

export type PaymentStatus = 'paid' | 'unpaid';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  cabang_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Cabang {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  is_pusat: boolean;
  created_at: string;
}

export interface Buku {
  id: string;
  isbn: string;
  judul: string;
  penulis: string;
  penerbit: string;
  tahun_terbit: number;
  kategori: string;
  deskripsi?: string;
  cover_url?: string;
  created_at: string;
}

export interface StokBuku {
  id: string;
  buku_id: string;
  cabang_id: string;
  jumlah_tersedia: number;
  jumlah_total: number;
  buku?: Buku;
  cabang?: Cabang;
}

export interface Transaksi {
  id: string;
  user_id: string;
  buku_id: string;
  cabang_id: string;
  tanggal_pinjam: string;
  tanggal_jatuh_tempo: string;
  tanggal_kembali?: string;
  status: TransactionStatus;
  denda?: number;
  user?: User;
  buku?: Buku;
  cabang?: Cabang;
}

export interface Pembayaran {
  id: string;
  transaksi_id: string;
  jumlah: number;
  tanggal_bayar: string;
  metode_pembayaran: string;
  status: PaymentStatus;
  transaksi?: Transaksi;
}

export interface LogAktivitas {
  id: string;
  user_id: string;
  aksi: string;
  detail: string;
  ip_address?: string;
  created_at: string;
  user?: User;
}

export interface DashboardStats {
  totalBooks: number;
  totalBranches: number;
  totalMembers: number;
  activeLoans: number;
  overdueLoans: number;
  totalFines: number;
  borrowingTrend: { date: string; count: number }[];
  popularBooks: { title: string; count: number }[];
}
