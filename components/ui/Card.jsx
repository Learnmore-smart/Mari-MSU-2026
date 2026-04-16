export function Card({ children, className, hover = false }) {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'
  const hoverClasses = hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-200' : ''
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className || ''}`}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className || ''}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }) {
  return (
    <div className={`p-6 ${className || ''}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 ${className || ''}`}>
      {children}
    </div>
  )
}
