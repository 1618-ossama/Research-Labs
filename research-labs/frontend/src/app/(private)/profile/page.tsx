
// src/app/(private)/profile/page.tsx
import { cookies } from "next/headers"

export default async function ProfilePage() {
  const token = cookies().get("AccessTokenCookie")?.value

  if (!token) {
    // You could redirect to login if token is missing
    return (
      <div className="p-4 text-red-500">
        Unauthorized. Please <a href="/login" className="underline">log in</a>.
      </div>
    )
  }

  const res = await fetch(`http://127.0.0.1:3005/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return (
      <div className="p-4 text-red-500">
        Failed to load profile. Try logging in again.
      </div>
    )
  }


  const {payload}= await res.json()

  console.log(payload)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {payload.username}</h1>
      <p>UserId: {payload.userId}</p>
      <p>Role: {payload.role}</p>
      {/* Add more user info */}
    </div>
  )
}
