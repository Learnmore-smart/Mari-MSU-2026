'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export default function CommentSection({ comments }) {
  const [newComment, setNewComment] = useState('')
  
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments ({comments?.length || 0})
      </h3>
      
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-msu-blue focus:outline-none focus:ring-2 focus:ring-msu-blue focus:ring-opacity-20"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <Button size="sm" disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="border-l-2 border-msu-blue pl-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
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
