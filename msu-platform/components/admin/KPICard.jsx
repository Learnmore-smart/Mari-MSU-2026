import { cn } from '@/lib/utils'

export function KPICard({ title, value, icon: Icon, trend, trendUp, className }) {
  return (
    <div className={cn('card p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={cn(
              'text-sm mt-2',
              trendUp ? 'text-green-600' : 'text-red-600'
            )}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-msu-blue/10 rounded-lg">
            <Icon className="w-6 h-6 text-msu-blue" />
          </div>
        )}
      </div>
    </div>
  )
}

export function KPICardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}
