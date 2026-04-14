'use client'

import { useState } from 'react'
import { basePath } from '@/lib/basePath'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { ArrowLeft, Send } from 'lucide-react'

const categories = [
  { value: '', label: 'Select a category' },
  { value: 'Facilities', label: 'Facilities' },
  { value: 'Food Services', label: 'Food Services' },
  { value: 'Sustainability', label: 'Sustainability' },
  { value: 'Student Services', label: 'Student Services' },
  { value: 'Academic', label: 'Academic' },
  { value: 'Other', label: 'Other' },
]

export default function NewPetitionPage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    description: '',
    category: '',
    targetSupporters: 100,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    alert('Petition submitted successfully!')
    setIsSubmitting(false)
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <Link
        href={basePath + '/petitions'}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 mt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Petitions
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Start a Petition</h1>
        <p className="text-gray-600">
          Have an idea to improve student life? Start a petition and gather support from the community.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Petition Title"
            placeholder="Enter a clear, concise title for your petition"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Summary"
            placeholder="Brief summary of your petition (1-2 sentences)"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            required
          />

          <Textarea
            label="Full Description"
            placeholder="Provide a detailed explanation of your petition, including why it matters and what changes you're proposing..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <Select
            label="Category"
            options={categories}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />

          <Input
            label="Target Supporters"
            type="number"
            placeholder="100"
            value={formData.targetSupporters}
            onChange={(e) => setFormData({ ...formData, targetSupporters: parseInt(e.target.value) })}
            min={10}
            max={10000}
            required
          />

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Tips for a successful petition:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use a clear, specific title that explains your goal</li>
              <li>• Explain why this issue matters to students</li>
              <li>• Propose concrete, achievable solutions</li>
              <li>• Share your petition on social media to reach more supporters</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={isSubmitting || !formData.title || !formData.description || !formData.category}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Petition'}
            </Button>
            <Link href="/petitions">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
