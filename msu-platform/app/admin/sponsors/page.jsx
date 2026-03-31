import AdminLayout from '@/components/admin/AdminLayout'
import { getAllSponsors } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import { TierBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Manage Sponsors - MSU Admin',
}

export default async function AdminSponsorsPage() {
  const sponsors = await getAllSponsors()

  const totalSponsorship = sponsors.reduce((sum, s) => sum + s.contribution, 0)

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Sponsors</h1>
          <p className="text-gray-600">Manage sponsor relationships and contributions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Sponsor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-msu-blue">{sponsors.length}</div>
          <div className="text-sm text-gray-500">Total Sponsors</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {sponsors.filter(s => s.tier === 'Platinum').length}
          </div>
          <div className="text-sm text-gray-500">Platinum</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {sponsors.filter(s => s.tier === 'Gold').length}
          </div>
          <div className="text-sm text-gray-500">Gold</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalSponsorship)}</div>
          <div className="text-sm text-gray-500">Total Contributions</div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sponsor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contribution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-16 h-8 object-contain"
                      />
                      <span className="font-medium text-gray-900">{sponsor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <TierBadge tier={sponsor.tier} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {sponsor.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(sponsor.contribution)}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-msu-blue hover:underline flex items-center gap-1 text-sm"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
