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

interface ProfileHeaderProps {
  user: {
    name: string
    username: string
    avatar: string
    coverImage: string
    isCurrentUser: boolean
    isFollowing: boolean
  }
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing)

  const handleFollow = () => {
    // In a real app, you would call an API to follow/unfollow
    setIsFollowing(!isFollowing)
  }

  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-sm border">
      <div className="h-48 md:h-64 relative">
        <Image src={user.coverImage || "/placeholder.svg"} alt="Cover image" fill className="object-cover" priority />

        {user.isCurrentUser && (
          <Button size="sm" variant="secondary" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white -mt-12 md:-mt-16 relative">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="mt-2 md:mt-0 md:mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {user.isCurrentUser ? (
              <>
                <Button asChild>
                  <Link href="/settings">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/profile/${user.username}/edit`}>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
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
                <Button variant="outline">
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
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ShareIcon className="h-4 w-4 mr-2" />
                      Share Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
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
