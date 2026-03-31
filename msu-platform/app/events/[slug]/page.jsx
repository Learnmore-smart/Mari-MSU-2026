import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getEventBySlug, getAllEvents } from '@/lib/data'
import { formatDate, formatTime } from '@/lib/utils'
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }) {
  const event = getEventBySlug(params.slug)
  if (!event) return { title: 'Event Not Found' }
  
  return {
    title: `${event.title} - MSU Platform`,
    description: event.description,
  }
}

export default function EventDetailPage({ params }) {
  const event = getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  const spotsLeft = event.maxAttendees - event.attendees
  const isFull = spotsLeft <= 0

  return (
    <div className="page-container">
      <Link 
        href="/events" 
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Events
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="status-badge bg-msu-blue text-white">
                  {event.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {event.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-msu-blue" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-msu-blue" />
                  <span>{formatTime(event.date + 'T' + event.time)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-msu-blue" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Users className="w-5 h-5 text-msu-blue" />
                  <span>{event.organizer}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">About this event</h3>
                <p className="text-gray-600">
                  Join us for {event.title.toLowerCase()}. This event is organized by {event.organizer} 
                  and is open to all Marianopolis students. Don't miss this opportunity to connect, 
                  learn, and have fun!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Event Details</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span className="font-medium">{event.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-right">{event.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{event.category}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Attendance</span>
                <span className="font-medium">
                  {event.attendees} / {event.maxAttendees}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-msu-blue'}`}
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                />
              </div>
              {!isFull && (
                <p className="text-xs text-gray-500 mt-1">
                  {spotsLeft} spots remaining
                </p>
              )}
            </div>

            <Button 
              className="w-full mb-3" 
              disabled={isFull}
            >
              {isFull ? 'Event Full' : 'Register Now'}
            </Button>

            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
