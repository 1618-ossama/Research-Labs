import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose' // Add jose for JWT verification

const PROTECTED_PATHS = [
  '/private',
  '/dashboard',
  '/profile',
  '/publications',
  '/settings'
]

const rateLimit = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute window
const RATE_LIMIT_MAX = 10 // Max requests per window

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected
  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  if (!isProtected) {
    return NextResponse.next()
  }

  // Apply rate limiting
  const clientIp = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  if (applyRateLimit(clientIp)) {
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

  // Check for authentication token
  const token = request.cookies.get('authToken')?.value

  if (!token) {
    return redirectToLogin(request)
  }

  try {
    // Verify JWT token locally first (reduces unnecessary backend calls)
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET, {
        algorithms: ['HS256']
      })

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp < currentTime) {
        return handleTokenExpiration(request)
      }

      // Set user data from JWT payload
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.sub as string)
      requestHeaders.set('x-user-role', payload.role as string)

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })

    } catch (jwtError) {
      // If local verification fails, verify with backend
      // This handles cases where JWT secret might have changed or token needs additional validation
      const verifyResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        signal: AbortSignal.timeout(3000) // Reduced timeout for better UX
      })

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json().catch(() => ({}))

        // Handle specific error cases
        if (verifyResponse.status === 401) {
          if (errorData.code === 'token_expired') {
            return handleTokenExpiration(request)
          }
          return redirectToLogin(request)
        }

        return redirectToLogin(request)
      }

      const user = await verifyResponse.json()

      // Add user information to request headers
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', user.id)
      requestHeaders.set('x-user-role', user.role)

      // For security, also add a timestamp for when this authentication happened
      requestHeaders.set('x-auth-time', Date.now().toString())

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication service unavailable' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.error('Authentication error:', error)
    return redirectToLogin(request)
  }
}

/**
 * Apply rate limiting and return true if rate limit is exceeded
 */
function applyRateLimit(clientIp: string): boolean {
  const currentTime = Date.now()
  const windowStart = currentTime - RATE_LIMIT_WINDOW

  // Initialize or get existing timestamps for this IP
  const timestamps = rateLimit.get(clientIp) || []

  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter(time => time > windowStart)

  // Check if rate limit is exceeded
  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    return true
  }

  // Add current timestamp and update the map
  recentTimestamps.push(currentTime)
  rateLimit.set(clientIp, recentTimestamps)

  // Clean up old entries from other IPs
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

/**
 * Handle token expiration - could redirect to refresh token endpoint
 */
function handleTokenExpiration(request: NextRequest) {
  // Option 1: Redirect to refresh token endpoint
  if (process.env.ENABLE_TOKEN_REFRESH === 'true') {
    const response = NextResponse.redirect(new URL('/api/auth/refresh', request.url))
    // Keep the token for the refresh endpoint to use
    return response
  }

  // Option 2: Just clear token and redirect to login
  return redirectToLogin(request)
}

/**
 * Redirect to login page
 */
function redirectToLogin(request: NextRequest) {
  // Store the original URL to redirect back after login
  const response = NextResponse.redirect(new URL('/auth/login', request.url))
  response.cookies.set('redirectAfterLogin', request.nextUrl.pathname, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 5, // 5 minutes max age
    sameSite: 'lax'
  })
  response.cookies.delete('authToken')
  return response
}
