import AdminLayout from '@/components/admin/AdminLayout'
import { getAllEvents } from '@/lib/data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Manage Events - MSU Admin',
}

export default async function AdminEventsPage() {
  const events = await getAllEvents()

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
          <p className="text-gray-600">Create, edit, and manage MSU events</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.organizer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className="status-badge bg-msu-blue/10 text-msu-blue">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.attendees}/{event.max_attendees}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusColor(event.status)}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/events/${event.slug}`}>
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-1.5 text-gray-500 hover:text-msu-blue hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
