'use server'

import { createComment as createCommentDb } from './data'
import { revalidatePath } from 'next/cache'

export async function createCommentAction(data) {
  const result = await createCommentDb(data)
  revalidatePath('/petitions/' + data.petition_id)
  return result
}