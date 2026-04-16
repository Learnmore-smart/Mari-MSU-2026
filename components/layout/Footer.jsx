import Link from 'next/link'
import { basePath } from '@/lib/basePath'
import { Calendar, Megaphone, Users, Handshake, Info } from 'lucide-react'

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Events', href: basePath + '/events', icon: Calendar },
      { name: 'Petitions', href: basePath + '/petitions', icon: Megaphone },
      { name: 'Clubs', href: basePath + '/clubs', icon: Users },
      { name: 'Sponsors', href: basePath + '/sponsors', icon: Handshake },
      { name: 'About', href: basePath + '/about', icon: Info },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { name: 'Start a Petition', href: basePath + '/petitions/new' },
      { name: 'Join a Club', href: basePath + '/clubs' },
      { name: 'Submit Event', href: basePath + '/admin/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Admin Portal', href: basePath + '/admin' },
      { name: 'Contact Us', href: basePath + '/about#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href={basePath + "/"} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-msu-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl">MSU Platform</span>
            </Link>
            <p className="text-gray-400 text-sm">
              The official platform for Marianopolis Student Union.
              Connecting students, clubs, and community.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Marianopolis Student Union. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href={basePath + "/about"} className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href={basePath + "/about"} className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
