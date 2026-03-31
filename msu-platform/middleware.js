import { createServerClient } from './lib/supabase'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = new URL(request.url)

  // Skip middleware for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Create a Supabase server client
  const supabase = createServerClient()
  if (!supabase) {
    // If Supabase is not configured, show an error page
    return new Response('Supabase is not configured. Please set up your environment variables.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  // Get the session from the request
  const authCookie = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('sb-'))
  if (!authCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verify the session
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if the user has admin role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleError || !roleData || roleData.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
