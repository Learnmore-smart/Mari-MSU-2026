import AdminLayout from '@/components/admin/AdminLayout'
import { getAdminStats, getRecentActivity, getAllEvents, getAllPetitions } from '@/lib/data'
import { KPICard } from '@/components/admin/KPICard'
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils'
import { 
  Calendar, 
  Megaphone, 
  Users, 
  Handshake, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Admin Dashboard - MSU Platform',
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  const recentActivity = await getRecentActivity()
  const allEvents = await getAllEvents()
  const allPetitions = await getAllPetitions()
  const recentEvents = allEvents.slice(0, 3)
  const recentPetitions = allPetitions.slice(0, 3)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with MSU.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Events"
          value={stats.totalEvents}
          icon={Calendar}
        />
        <KPICard
          title="Open Petitions"
          value={stats.openPetitions}
          icon={Megaphone}
        />
        <KPICard
          title="Active Clubs"
          value={stats.totalClubs}
          icon={Users}
        />
        <KPICard
          title="Sponsors"
          value={stats.totalSponsors}
          icon={Handshake}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Income"
          value={formatCurrency(stats.totalIncome)}
          icon={TrendingUp}
          trend="vs last month"
          trendUp={true}
        />
        <KPICard
          title="Total Expenses"
          value={formatCurrency(stats.totalExpenses)}
          icon={DollarSign}
        />
        <KPICard
          title="Pending Reimbursements"
          value={formatCurrency(stats.pendingReimbursements)}
          icon={Clock}
        />
        <KPICard
          title="Total Sponsorship"
          value={formatCurrency(stats.totalSponsorship)}
          icon={Handshake}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Events</h2>
            <Link href="/admin/events" className="text-msu-blue text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentEvents.map((event) => (
              <div key={event.id} className="px-6 py-4 flex items-center gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                </div>
                <span className="status-badge bg-msu-blue/10 text-msu-blue">
                  {event.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Petitions</h2>
            <Link href="/admin/petitions" className="text-msu-blue text-sm hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPetitions.map((petition) => (
              <div key={petition.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{petition.title}</p>
                  <p className="text-sm text-gray-500">
                    {petition.supporters} supporters
                  </p>
                </div>
                <span className={getStatusColor(petition.status)}>
                  {petition.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/events" className="card-hover p-4 text-center">
            <Calendar className="w-8 h-8 text-msu-blue mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Event</span>
          </Link>
          <Link href="/admin/petitions" className="card-hover p-4 text-center">
            <Megaphone className="w-8 h-8 text-msu-blue mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Review Petitions</span>
          </Link>
          <Link href="/admin/finance" className="card-hover p-4 text-center">
            <DollarSign className="w-8 h-8 text-msu-blue mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">View Finance</span>
          </Link>
          <Link href="/admin/sponsors" className="card-hover p-4 text-center">
            <Handshake className="w-8 h-8 text-msu-blue mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Manage Sponsors</span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
