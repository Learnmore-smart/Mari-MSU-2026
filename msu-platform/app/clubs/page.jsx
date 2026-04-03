import { getAllClubs } from '@/lib/data'
import { Users, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Clubs - MSU Platform',
  description: 'Discover and join student clubs at Marianopolis College',
}

export default async function ClubsPage() {
  const clubs = await getAllClubs()
  
  const categories = [...new Set(clubs.map(c => c.category))]

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Clubs</h1>
        <p className="text-gray-600">
          Discover and join student clubs that match your interests
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button className="px-4 py-2 bg-msu-blue text-white rounded-lg text-sm font-medium">
          All Clubs
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200">
            <div className="aspect-video relative">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-blue text-white">
                  {club.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {club.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {club.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{club.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{club.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  President: {club.president}
                </span>
                <button className="text-msu-blue text-sm font-medium hover:underline">
                  Join Club
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clubs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
          <p className="text-gray-600">Check back later for new clubs!</p>
        </div>
      )}

      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to start a new club?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Have an idea for a new student club? We're always looking to support new initiatives 
          that enrich student life at Marianopolis.
        </p>
        <Link href="/about#contact" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-msu-blue text-white hover:bg-msu-blue/90 px-4 py-2">
          Contact MSU
        </Link>
      </div>
    </div>
  )
}
