import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const PROTECTED_PATHS = [
  '/private',
  // '/dashboard',
  '/profile',
  // '/publications',
  '/settings'
]
const ADMIN_ONLY_PATHS = [
  '/admin',
  '/admin/dashboard',
  // add other admin-only paths here
]

const rateLimit = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 1000

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'access'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // console.log(`[Middleware] Incoming request to: ${pathname}`)

  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  const isAdminOnly = ADMIN_ONLY_PATHS.some(path => pathname.startsWith(path))
  // console.log(`[Middleware] Is protected path: ${isProtected}`)

  if (!isProtected && !isAdminOnly) {
    return NextResponse.next()
  }

  const clientIp = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  // console.log(`[Middleware] Client IP: ${clientIp}`)

  if (applyRateLimit(clientIp)) {
    // console.warn(`[RateLimit] IP ${clientIp} exceeded limit`)
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests', retryAfter: RATE_LIMIT_WINDOW / 1000 }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': (RATE_LIMIT_WINDOW / 1000).toString()
        }
      }
    )
  }

  const token = request.cookies.get('AccessTokenCookie')?.value
  console.log(`[Middleware] Token present: ${Boolean(token)}`)

  if (!token) {
    console.warn(`[Auth] No token found, redirecting to login`)
    return redirectToLogin(request)
  }

  try {
    try {
      // console.log(`[JWT] Attempting local verification`)
      console.log(JWT_SECRET)
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        algorithms: ['HS256']
      })
      console.log(`[JWT] Local verification successful for user: ${payload.userId}`)

      const currentTime = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp < currentTime) {
        console.warn(`[JWT] Token expired at ${payload.exp}, current time: ${currentTime}`)
        return handleTokenExpiration(request)
      }

      const role = payload.role as string | undefined

      if (isAdminOnly && role !== 'ADMIN') {
        console.warn(`[Auth] Access denied for path ${pathname}, user role: ${role}`)
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }

      const requestHeaders = new Headers(request.headers)

      const response = NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
      response.cookies.set('userId', payload.userId as string, {
        httpOnly: false, // so that Next.js pages (and client code, if needed) can read it
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      })

      response.cookies.set('userRole', role ?? '', {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      })


      return response

    } catch (jwtError) {
      console.warn(`[JWT] Local verification failed:`, jwtError)

      console.log(`[JWT] Attempting backend verification`)
      const verifyResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        signal: AbortSignal.timeout(3000)
      })

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json().catch(() => ({}))
        console.warn(`[JWT] Backend verification failed with status ${verifyResponse.status}`, errorData)

        if (verifyResponse.status === 401) {
          if (errorData.code === 'token_expired') {
            return handleTokenExpiration(request)
          }
          return redirectToLogin(request)
        }

        return redirectToLogin(request)
      }

      const user = await verifyResponse.json()
      console.log(`[JWT] Backend verification successful for user: ${user.id}`)

      // let userRole: string | undefined = undefined

      const role = payload.role as string | undefined

      console.log("====");
      console.log(role);
      console.log("====");
      if (isAdminOnly && role !== 'ADMIN') {
        console.warn(`[Auth] Access denied for path ${pathname}, user role: ${role}`)
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
      response.cookies.set('userRole', role ?? '', {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
      })
      console.log("hehehe role : ", user.role);
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', user.id)
      requestHeaders.set('x-user-role', user.role)
      requestHeaders.set('x-auth-time', Date.now().toString())

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`[JWT] Backend verification aborted: service timeout`)
      return new NextResponse(
        JSON.stringify({ error: 'Authentication service unavailable' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.error('[Auth] Unexpected error during authentication:', error)
    return redirectToLogin(request)
  }
}

function applyRateLimit(clientIp: string): boolean {
  const currentTime = Date.now()
  const windowStart = currentTime - RATE_LIMIT_WINDOW

  const timestamps = rateLimit.get(clientIp) || []
  const recentTimestamps = timestamps.filter(time => time > windowStart)

  const isLimited = recentTimestamps.length >= RATE_LIMIT_MAX
  console.log(`[RateLimit] IP ${clientIp}: ${recentTimestamps.length} requests in window (limit: ${RATE_LIMIT_MAX})`)

  if (isLimited) {
    return true
  }

  recentTimestamps.push(currentTime)
  rateLimit.set(clientIp, recentTimestamps)

  rateLimit.forEach((timestamps, ip) => {
    if (ip !== clientIp) {
      const filteredTimestamps = timestamps.filter(time => time > windowStart)
      if (filteredTimestamps.length === 0) {
        rateLimit.delete(ip)
      } else {
        rateLimit.set(ip, filteredTimestamps)
      }
    }
  })

  return false
}

function handleTokenExpiration(request: NextRequest) {
  console.warn(`[JWT] Token expired, handling expiration`)

  if (process.env.ENABLE_TOKEN_REFRESH === 'true') {
    console.log(`[JWT] Redirecting to refresh endpoint`)
    return NextResponse.redirect(new URL('/api/auth/refresh', request.url))
  }

  console.log(`[JWT] Token refresh disabled, redirecting to login`)
  return redirectToLogin(request)
}

function redirectToLogin(request: NextRequest) {
  console.log(`[Auth] Redirecting to /login with redirectAfterLogin=${request.nextUrl.pathname}`)

  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.set('redirectAfterLogin', request.nextUrl.pathname, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 5,
    sameSite: 'lax'
  })
  response.cookies.delete('authToken')
  return response
}
