'use client'

import Link from 'next/link'
import { basePath } from '@/lib/basePath'
import { usePathname } from 'next/navigation'
import { Menu, X, Calendar, Megaphone, Users, Handshake, Info, Settings } from 'lucide-react'
import { useState } from 'react'

const publicLinks = [
  { name: 'Events', href: `${basePath}/events`, icon: Calendar },
  { name: 'Petitions', href: `${basePath}/petitions`, icon: Megaphone },
  { name: 'Clubs', href: `${basePath}/clubs`, icon: Users },
  { name: 'Sponsors', href: `${basePath}/sponsors`, icon: Handshake },
  { name: 'About', href: `${basePath}/about`, icon: Info },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAdmin = pathname.startsWith('/admin')

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={basePath + '/'} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-msu-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl text-gray-900">MSU</span>
            </Link>

            <div className="hidden md:flex items-center ml-10 space-x-1">
              {publicLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-msu-blue text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={basePath + '/admin'}
              className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAdmin
                  ? 'bg-msu-blue/10 text-msu-blue'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin
            </Link>

            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {publicLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-msu-blue text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                )
              })}
              <Link
                href={basePath + '/admin'}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isAdmin
                    ? 'bg-msu-blue/10 text-msu-blue'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
