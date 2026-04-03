import Link from 'next/link'
import { CalendarDays, Megaphone, Users, Handshake } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import PetitionCard from '@/components/petitions/PetitionCard'
import { getFeaturedEvents, getFeaturedPetitions, getStats } from '@/lib/data'

export default async function HomePage() {
  const stats = await getStats()
  const featuredEvents = await getFeaturedEvents()
  const featuredPetitions = await getFeaturedPetitions()

  return (
    <div>
      <section className="bg-gradient-to-br from-msu-blue to-blue-800 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to the MSU Platform
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your hub for events, petitions, clubs, and student life at Marianopolis College.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/events" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-msu-gold text-white hover:bg-msu-gold/90 px-4 py-2">
                Explore Events
              </Link>
              <Link href="/petitions" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-white/10 text-white hover:bg-white/20 px-4 py-2">
                View Petitions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-msu-blue">{stats.events}</div>
            <div className="text-gray-600 text-sm mt-1">Upcoming Events</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-msu-blue">{stats.petitions}</div>
            <div className="text-gray-600 text-sm mt-1">Active Petitions</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-msu-blue">{stats.clubs}</div>
            <div className="text-gray-600 text-sm mt-1">Student Clubs</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="text-3xl font-bold text-msu-blue">{stats.members}</div>
            <div className="text-gray-600 text-sm mt-1">Active Members</div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-msu-blue" />
            Upcoming Events
          </h2>
          <Link href="/events" className="text-msu-blue hover:underline text-sm font-medium">
            View all events →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-msu-blue" />
            Active Petitions
          </h2>
          <Link href="/petitions" className="text-msu-blue hover:underline text-sm font-medium">
            View all petitions →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {featuredPetitions.map((petition) => (
            <PetitionCard key={petition.id} petition={petition} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Users className="w-10 h-10 text-msu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">Join a Club</h3>
              <p className="text-gray-600 text-sm mb-4">
                Discover and join student clubs that match your interests. From academic societies to hobby groups.
              </p>
              <Link href="/clubs" className="text-msu-blue hover:underline text-sm font-medium">
                Browse clubs →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Megaphone className="w-10 h-10 text-msu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start a Petition</h3>
              <p className="text-gray-600 text-sm mb-4">
                Have an idea to improve student life? Start a petition and gather support from the community.
              </p>
              <Link href="/petitions/new" className="text-msu-blue hover:underline text-sm font-medium">
                Create petition →
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Handshake className="w-10 h-10 text-msu-blue mb-4" />
              <h3 className="text-lg font-semibold mb-2">Our Partners</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn about our sponsors and partners who help make student activities possible.
              </p>
              <Link href="/sponsors" className="text-msu-blue hover:underline text-sm font-medium">
                View sponsors →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get involved?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the MSU community today and make your voice heard. Participate in events, 
          support petitions, and connect with fellow students.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/events" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-msu-blue text-white hover:bg-msu-blue/90 px-4 py-2">
            Explore Events
          </Link>
          <Link href="/petitions/new" className="inline-flex items-center justify-center rounded-lg font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 px-4 py-2">
            Start a Petition
          </Link>
        </div>
      </section>
    </div>
  )
}
