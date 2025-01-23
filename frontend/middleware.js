import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import withAuth from 'next-auth/middleware'

async function middleware (request) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (!token && pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (token && pathname === '/admin/login') {
    const access = new URL('/admin/categories', request.url)
    return NextResponse.redirect(access)
  }

  if (token) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
const withCustomAuth = (handler) => {
  return async (req, res) => {
    const response = await middleware(req)
    if (response) return response
    return handler(req, res)
  }
}

export default withCustomAuth(withAuth)

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}
