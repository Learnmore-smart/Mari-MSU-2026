import Link from 'next/link'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-msu-blue/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors bg-msu-blue text-white hover:bg-msu-blue/90 px-5 py-2.5"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 px-5 py-2.5"
          >
            <Search className="w-4 h-4" />
            Browse Events
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link href="/about#contact" className="text-msu-blue hover:underline">
              Contact MSU Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
