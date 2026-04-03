import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-blue text-white">
              {event.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{formatDate(event.date)}</span>
            <span>{event.time}</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">{event.location}</span>
            <span className="text-xs text-gray-500">
              {event.attendees}/{event.max_attendees} attending
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
