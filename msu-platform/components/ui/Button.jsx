import { cn } from '@/lib/utils'

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  isLoading,
  ...props 
}) {
  const variants = {
    primary: 'bg-msu-blue text-white hover:bg-blue-800 focus:ring-msu-blue',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    gold: 'bg-msu-gold text-white hover:bg-amber-600 focus:ring-msu-gold',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export function IconButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-msu-blue',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
