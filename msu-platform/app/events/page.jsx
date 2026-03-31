import EventCard from '@/components/events/EventCard'
import { getAllEvents } from '@/lib/data'
import { Calendar, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Events - MSU Platform',
  description: 'Discover upcoming events at Marianopolis College',
}

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
        <p className="text-gray-600">
          Discover and attend exciting events happening at Marianopolis College
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Filter by date</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Filter by location</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Filter by time</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Check back later for upcoming events!</p>
        </div>
      )}
    </div>
  )
}
