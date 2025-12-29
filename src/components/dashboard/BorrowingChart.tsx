import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sen', pinjam: 24, kembali: 18 },
  { name: 'Sel', pinjam: 31, kembali: 28 },
  { name: 'Rab', pinjam: 18, kembali: 22 },
  { name: 'Kam', pinjam: 42, kembali: 35 },
  { name: 'Jum', pinjam: 38, kembali: 40 },
  { name: 'Sab', pinjam: 55, kembali: 48 },
  { name: 'Min', pinjam: 28, kembali: 30 },
];

export function BorrowingChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-md animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Tren Peminjaman</h3>
          <p className="text-sm text-muted-foreground">Minggu ini</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Pinjam</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Kembali</span>
          </div>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPinjam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38 92% 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorKembali" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="pinjam"
              stroke="hsl(38 92% 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPinjam)"
            />
            <Area
              type="monotone"
              dataKey="kembali"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorKembali)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
