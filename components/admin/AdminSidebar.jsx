'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Megaphone,
  DollarSign,
  Users,
  Handshake,
  ArrowLeft
} from 'lucide-react'

const adminLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Petitions', href: '/admin/petitions', icon: Megaphone },
  { name: 'Finance', href: '/admin/finance', icon: DollarSign },
  { name: 'Clubs', href: '/admin/clubs', icon: Users },
  { name: 'Sponsors', href: '/admin/sponsors', icon: Handshake },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Site</span>
        </Link>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Admin Panel</h2>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {adminLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href ||
            (link.href !== '/admin' && pathname.startsWith(link.href))

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-msu-blue text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-msu-gold rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@msu.edu</p>
          </div>
        </div>
      </div>
    </div>
  )
}
