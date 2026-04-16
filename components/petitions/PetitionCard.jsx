import Link from 'next/link'
import { basePath } from '@/lib/basePath'
import { formatDate, getStatusColor } from '@/lib/utils'
import { ArrowUp, MessageCircle } from 'lucide-react'

export default function PetitionCard({ petition }) {
  const supportPercentage = Math.round((petition.supporters / petition.target_supporters) * 100)

  return (
    <Link href={basePath + `/petitions/${petition.slug}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full p-5">
        <div className="flex items-start justify-between mb-3">
          <span className={getStatusColor(petition.status)}>{petition.status}</span>
          <span className="text-xs text-gray-500">{petition.category}</span>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {petition.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {petition.summary}
        </p>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{petition.supporters} supporters</span>
            <span className="text-gray-500">{supportPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-msu-blue h-2 rounded-full transition-all"
              style={{ width: `${Math.min(supportPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>by {petition.author}</span>
          <span>{formatDate(petition.created_at)}</span>
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-gray-500">
            <ArrowUp className="w-4 h-4" />
            <span className="text-sm">{petition.supporters}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">0</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
