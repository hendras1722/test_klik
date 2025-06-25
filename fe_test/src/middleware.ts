import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const { pathname } = new URL(request.url)

  const isLoginPage = pathname === '/login'

  if (!token) {
    console.log(request.url)
    if (!isLoginPage) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  if (token && isLoginPage) {
    const redirectUrl = new URL(request.url).searchParams.get('redirect')
    const targetUrl = redirectUrl ?? '/'
    return NextResponse.redirect(new URL(targetUrl, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
