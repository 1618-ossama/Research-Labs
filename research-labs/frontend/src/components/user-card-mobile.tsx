"use client"

import type * as React from "react"
import { MoreVertical } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  status: string
  role: string
  lastActive: string
}

interface UserCardMobileProps {
  user: User
  onActivate: () => void
  onSuspend: () => void
  onDelete: () => void
  getStatusBadge: (status: string) => React.ReactNode
  getRoleBadge: (role: string) => React.ReactNode
}

export function UserCardMobile({
  user,
  onActivate,
  onSuspend,
  onDelete,
  getStatusBadge,
  getRoleBadge,
}: UserCardMobileProps) {
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onActivate} disabled={user.status === "active"}>
              Activate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSuspend} disabled={user.status === "suspended"}>
              Suspend
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Status</p>
            <div className="mt-1">{getStatusBadge(user.status)}</div>
          </div>
          <div>
            <p className="text-muted-foreground">Role</p>
            <div className="mt-1">{getRoleBadge(user.role)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 text-sm text-muted-foreground">Last active: {user.lastActive}</CardFooter>
    </Card>
  )
}
