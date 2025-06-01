"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  EditIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
  UserMinusIcon,
  SettingsIcon,
  ShareIcon,
  FlagIcon,
} from "lucide-react"

interface UserProfile {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  status: string
  bio: string | null
  affiliation: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
}

interface ProfileHeaderProps {
  user: UserProfile & {
    isCurrentUser: boolean
    isFollowing?: boolean
    coverImage?: string
  }
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // TODO: call follow/unfollow API
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim()
  const avatarFallback = fullName 
    ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`
    : '?'

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm border dark:bg-gray-900 dark:border-gray-800">
      {/* Cover Image */}
      <div className="h-48 md:h-64 relative bg-gray-100 dark:bg-gray-800">
        {user.coverImage && (
          <Image
            src={user.coverImage}
            alt="Cover image"
            fill
            className="object-cover"
            priority
          />
        )}

        {user.isCurrentUser && (
          <Button 
            size="sm" 
            variant="secondary" 
            className="absolute top-4 right-4 bg-white/80 hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
            asChild
          >
            <Link href="/profile/edit/cover">
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Cover
            </Link>
          </Button>
        )}
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          {/* Avatar and Name */}
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white dark:border-gray-900 -mt-12 md:-mt-16 relative">
              <AvatarImage
                src={user.photo_url || undefined}
                alt={fullName}
              />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="mt-2 md:mt-0 md:mb-2">
              <h1 className="text-2xl font-bold dark:text-white">{fullName}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {user.isCurrentUser ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/settings">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/profile/edit">
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant={isFollowing ? "outline" : "default"} 
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <>
                      <UserMinusIcon className="h-4 w-4 mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <ShareIcon className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="dark:bg-gray-800">
                    <DropdownMenuItem className="dark:hover:bg-gray-700">
                      <ShareIcon className="h-4 w-4 mr-2" />
                      Share Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="dark:bg-gray-700" />
                    <DropdownMenuItem className="text-destructive dark:hover:bg-gray-700">
                      <FlagIcon className="h-4 w-4 mr-2" />
                      Report Profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
