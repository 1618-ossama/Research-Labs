"use client"

import { useState } from "react"

export interface UserData {
  name: string
  email: string
  avatar?: string
}

export function useAuth() {
  const mockUser: UserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const toggleLoginStatus = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
      setUserData(null)
    } else {
      setIsLoggedIn(true)
      setUserData(mockUser)
    }
  }

  return {
    isLoggedIn,
    userData,
    toggleLoginStatus,
  }
}
