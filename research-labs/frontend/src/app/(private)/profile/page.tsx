"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfileRedirect() {
  const router = useRouter()

  useEffect(() => {
    const token = getCookie("AccessTokenCookie")
    const currentUserId = getCookie("userId")

    if (!token || !currentUserId) {
      router.push("/api/auth/login")
    } else {
      router.push(`/profile/${currentUserId}`)
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Redirecting to your profile...</p>
      </div>
    </div>
  )
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || ''
  return ''
}
