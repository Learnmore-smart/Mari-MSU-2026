import AdminLayout from '@/components/admin/AdminLayout'
import { getAllClubs } from '@/lib/data'
import { Button } from '@/components/ui/Button'
import { Plus, Edit, Trash2, Users, Mail } from 'lucide-react'

export const metadata = {
  title: 'Manage Clubs - MSU Admin',
}

export default async function AdminClubsPage() {
  const clubs = await getAllClubs()

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Clubs</h1>
          <p className="text-gray-600">Oversee and manage student clubs</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Club
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">
                  {club.name}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {club.description}
              </p>

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
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
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-gray-500 hover:text-msu-blue hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
