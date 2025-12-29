import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-card p-6 shadow-md card-hover animate-slide-up',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-sm font-medium',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              <span className="text-muted-foreground ml-1">dari bulan lalu</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            iconClassName || 'bg-accent/10 text-accent'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
