import Link from 'next/link'
import { basePath } from '@/lib/basePath'
import { getEventsForCalendar } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const metadata = {
  title: 'Calendar - MSU Platform',
  description: 'View all upcoming events in calendar format',
}

export default async function CalendarPage() {
  const events = await getEventsForCalendar()

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getEventsForDay = (day) => {
    if (!day) return []
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="mb-8 pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Calendar</h1>
        <p className="text-gray-600">
          View all upcoming events in a calendar format
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-500 border-b border-gray-100"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day)
            const isToday = day === currentDate.getDate()

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border-b border-r border-gray-100 ${
                  day ? 'hover:bg-gray-50' : 'bg-gray-50'
                }`}
              >
                {day && (
                  <>
                    <span className={`text-sm ${isToday ? 'bg-msu-blue text-white px-2 py-1 rounded-full' : 'text-gray-900'}`}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <Link
                          key={event.id}
                          href={`/events?date=${event.date}`}
                          className="block text-xs bg-msu-blue/10 text-msu-blue px-2 py-1 rounded truncate hover:bg-msu-blue/20"
                        >
                          {event.title}
                        </Link>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events.slice(0, 5).map((event) => (
            <Link
              key={event.id}
              href={`/events?date=${event.date}`}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-msu-blue/10 rounded-lg flex items-center justify-center">
                <span className="text-msu-blue font-bold">
                  {new Date(event.date).getDate()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-msu-blue/10 text-msu-blue">
                {event.category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
