import { notFound } from 'next/navigation'
import { basePath } from '@/lib/basePath'
import Link from 'next/link'
import { getPetitionBySlug, getAllPetitions, getCommentsByPetitionId } from '@/lib/data'
import { formatDate, getStatusColor } from '@/lib/utils'
import { ArrowLeft, ArrowUp, ArrowDown, Share2, Flag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import CommentSection from '@/components/petitions/CommentSection'

export async function generateStaticParams() {
  const petitions = await getAllPetitions()
  return petitions.map((petition) => ({
    slug: petition.slug,
  }))
}

export async function generateMetadata({ params }) {
  const petition = await getPetitionBySlug(params.slug)
  if (!petition) return { title: 'Petition Not Found' }

  return {
    title: `${petition.title} - MSU Platform`,
    description: petition.summary,
  }
}

export default async function PetitionDetailPage({ params }) {
  const petition = await getPetitionBySlug(params.slug)

  if (!petition) {
    notFound()
  }

  const comments = await getCommentsByPetitionId(petition.id)
  const supportPercentage = Math.round((petition.supporters / petition.target_supporters) * 100)

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Link
        href={basePath + '/petitions'}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 mt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Petitions
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <span className={getStatusColor(petition.status)}>{petition.status}</span>
              <span className="text-sm text-gray-500">{petition.category}</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {petition.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {petition.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span>Started by <strong className="text-gray-900">{petition.author}</strong></span>
              <span>•</span>
              <span>{formatDate(petition.created_at)}</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>
          </div>

          <CommentSection comments={comments} petitionId={petition.id} />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <div className="text-center mb-6">
                <div className="text-4xl font-bold text-msu-blue mb-1">
                  {petition.supporters}
                </div>
                <div className="text-sm text-gray-500">
                  of {petition.target_supporters} supporters needed
                </div>
              </div>

            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-msu-blue h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(supportPercentage, 100)}%` }}
                />
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                {supportPercentage}% complete
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button className="flex-1 flex items-center justify-center gap-2">
                <ArrowUp className="w-4 h-4" />
                Support
              </Button>
              <Button variant="outline" className="flex items-center justify-center">
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className={getStatusColor(petition.status)}>{petition.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{petition.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Created</span>
                <span className="font-medium">{formatDate(petition.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Comments</span>
                <span className="font-medium">{comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
