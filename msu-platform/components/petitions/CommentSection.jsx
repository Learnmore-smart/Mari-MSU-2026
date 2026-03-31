'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { createComment } from '@/lib/data'
import { supabase } from '@/lib/supabase'

export default function CommentSection({ comments, petitionId }) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('You must be logged in to comment')
        return
      }
      
      await createComment({
        petition_id: petitionId,
        author: user.email.split('@')[0], // Simple username extraction
        author_id: user.id,
        content: newComment.trim()
      })
      
      setNewComment('')
      setSubmitted(true)
      // Refresh the page to see the new comment
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments ({comments?.length || 0})
      </h3>
      
      <div className="mb-6">
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-msu-blue focus:outline-none focus:ring-2 focus:ring-msu-blue focus:ring-opacity-20"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" disabled={!newComment.trim() || isSubmitting} isLoading={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </form>
        {submitted && (
          <div className="mt-2 text-sm text-green-600">
            Comment posted successfully!
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="border-l-2 border-msu-blue pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">{formatDate(comment.created_at)}</span>
            </div>
            <p className="text-gray-600 text-sm">{comment.content}</p>
          </div>
        ))}
        
        {(!comments || comments.length === 0) && (
          <p className="text-gray-500 text-sm text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
}
