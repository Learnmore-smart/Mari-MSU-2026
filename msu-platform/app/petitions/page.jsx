import PetitionCard from '@/components/petitions/PetitionCard'
import { getAllPetitions } from '@/lib/data'
import Link from 'next/link'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Petitions - MSU Platform',
  description: 'View and support student petitions at Marianopolis College',
}

export default function PetitionsPage() {
  const petitions = getAllPetitions()
  
  const openCount = petitions.filter(p => p.status === 'Open').length
  const reviewCount = petitions.filter(p => p.status === 'Under Review').length
  const approvedCount = petitions.filter(p => p.status === 'Approved' || p.status === 'Implemented').length

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Petitions</h1>
          <p className="text-gray-600">
            Support causes that matter to you and make your voice heard
          </p>
        </div>
        <Link href="/petitions/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Start a Petition
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{openCount}</div>
          <div className="text-sm text-gray-500">Open</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{reviewCount}</div>
          <div className="text-sm text-gray-500">Under Review</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{approvedCount}</div>
          <div className="text-sm text-gray-500">Approved</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="implemented">Implemented</option>
        </select>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
          <option value="all">All Categories</option>
          <option value="facilities">Facilities</option>
          <option value="food">Food Services</option>
          <option value="sustainability">Sustainability</option>
          <option value="services">Student Services</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petitions.map((petition) => (
          <PetitionCard key={petition.id} petition={petition} />
        ))}
      </div>

      {petitions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No petitions yet</h3>
          <p className="text-gray-600 mb-4">Be the first to start a petition!</p>
          <Link href="/petitions/new">
            <Button>Start a Petition</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
