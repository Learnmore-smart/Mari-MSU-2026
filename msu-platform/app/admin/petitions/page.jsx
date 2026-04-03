import AdminLayout from '@/components/admin/AdminLayout'
import { getAllPetitions } from '@/lib/data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Manage Petitions - MSU Admin',
}

export default async function AdminPetitionsPage() {
  const petitions = await getAllPetitions()

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Petitions</h1>
          <p className="text-gray-600">Review and moderate student petitions</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {petitions.filter(p => p.status === 'Open').length}
          </div>
          <div className="text-sm text-gray-500">Open</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {petitions.filter(p => p.status === 'Under Review').length}
          </div>
          <div className="text-sm text-gray-500">Under Review</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {petitions.filter(p => p.status === 'Approved').length}
          </div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {petitions.filter(p => p.status === 'Implemented').length}
          </div>
          <div className="text-sm text-gray-500">Implemented</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Petition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supporters
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
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
              {petitions.map((petition) => (
                <tr key={petition.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{petition.title}</p>
                      <p className="text-sm text-gray-500 truncate">{petition.summary}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {petition.author}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-msu-blue/10 text-msu-blue border border-msu-blue/20">
                      {petition.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">{petition.supporters}</span>
                      <span className="text-gray-500"> / {petition.target_supporters}</span>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-msu-blue h-1.5 rounded-full"
                        style={{ width: `${Math.min((petition.supporters / petition.target_supporters) * 100, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(petition.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusColor(petition.status)}>
                      {petition.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/petitions/${petition.slug}`}>
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      {petition.status === 'Open' && (
                        <button className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-gray-100 rounded" title="Mark Under Review">
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                      {petition.status === 'Under Review' && (
                        <>
                          <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
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
