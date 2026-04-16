import { cn } from '@/lib/utils'

export function StatusBadge({ status, className }) {
  const statusStyles = {
    'Open': 'bg-green-100 text-green-800',
    'Under Review': 'bg-orange-100 text-orange-800',
    'Approved': 'bg-blue-100 text-blue-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Implemented': 'bg-purple-100 text-purple-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Paid': 'bg-green-100 text-green-800',
    'Received': 'bg-blue-100 text-blue-800',
    'upcoming': 'bg-blue-100 text-blue-800',
    'past': 'bg-gray-100 text-gray-800',
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      statusStyles[status] || 'bg-gray-100 text-gray-800',
      className
    )}>
      {status}
    </span>
  )
}

export function CategoryBadge({ category, className }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-blue/10 text-msu-blue',
      className
    )}>
      {category}
    </span>
  )
}

export function TierBadge({ tier, className }) {
  const tierStyles = {
    'Platinum': 'bg-purple-100 text-purple-800',
    'Gold': 'bg-yellow-100 text-yellow-800',
    'Silver': 'bg-gray-200 text-gray-800',
    'Bronze': 'bg-orange-100 text-orange-800',
  }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      tierStyles[tier] || 'bg-gray-100 text-gray-800',
      className
    )}>
      {tier}
    </span>
  )
}
