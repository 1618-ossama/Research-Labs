"use client"

import * as React from "react"
import {
  ArrowUpDown,
  MoreHorizontal,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
  Users,
  Plus,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { userApi, type ApiUser, type CreateUserRequest } from "@/lib/api/users"
import { CreateUserDialog } from "@/components/create-user-dialog"

interface DisplayUser extends ApiUser {
  last_active?: string
}

const getDisplayName = (user: DisplayUser): string => {
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`
  }
  if (user.first_name) {
    return user.first_name
  }
  return user.username
}

const getLastActiveTime = (updatedAt: string): string => {
  const now = new Date()
  const updated = new Date(updatedAt)
  const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
  return `${Math.floor(diffInMinutes / 1440)} days ago`
}

interface UserCardMobileProps {
  user: DisplayUser
  onActivate: () => void
  onSuspend: () => void
  onDelete: () => void
  getStatusBadge: (status: string | null) => React.ReactNode
  getRoleBadge: (role: string) => React.ReactNode
  isLoading?: boolean
}

function UserCardMobile({
  user,
  onActivate,
  onSuspend,
  onDelete,
  getStatusBadge,
  getRoleBadge,
  isLoading,
}: UserCardMobileProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="font-medium">{getDisplayName(user)}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="flex items-center gap-2">
              {getStatusBadge(user.status)}
              {getRoleBadge(user.role)}
            </div>
            <div className="text-xs text-muted-foreground">Last active: {getLastActiveTime(user.updated_at)}</div>
            {user.affiliation && <div className="text-xs text-muted-foreground">Affiliation: {user.affiliation}</div>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onActivate}
                disabled={user.status === "ACTIVE" || isLoading}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                <span>Activate</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onSuspend}
                disabled={user.status === "SUSPENDED" || isLoading}
              >
                <UserX className="mr-2 h-4 w-4" />
                <span>Suspend</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                disabled={isLoading}
                className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

interface UserStatCardsProps {
  users: DisplayUser[]
  isLoading: boolean
}

function UserStatCards({ users, isLoading }: UserStatCardsProps) {
  const activeUsers = users.filter((user) => user.status === "ACTIVE").length
  const suspendedUsers = users.filter((user) => user.status === "SUSPENDED").length
  const totalUsers = users.length

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : totalUsers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : activeUsers}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Suspended Users</CardTitle>
          <UserX className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : suspendedUsers}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function UserManagement() {
  const [sortColumn, setSortColumn] = React.useState<keyof DisplayUser | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [userList, setUserList] = React.useState<DisplayUser[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadingUsers, setLoadingUsers] = React.useState<Set<string>>(new Set())
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  React.useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const users = await userApi.getAllUsers()
      console.log(users);

      setUserList(
        users.map((user) => ({
          ...user,
          last_active: getLastActiveTime(user.updated_at),
        })),
      )
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (column: keyof DisplayUser) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedUsers = React.useMemo(() => {
    if (!sortColumn) return userList

    return [...userList].sort((a, b) => {
      let aValue: any = a[sortColumn]
      let bValue: any = b[sortColumn]

      if (sortColumn === "first_name") {
        aValue = getDisplayName(a)
        bValue = getDisplayName(b)
      }

      if (aValue === null && bValue === null) return 0
      if (aValue === null) return sortDirection === "asc" ? 1 : -1
      if (bValue === null) return sortDirection === "asc" ? -1 : 1

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [userList, sortColumn, sortDirection])

  const setUserLoading = (userId: string, loading: boolean) => {
    setLoadingUsers((prev) => {
      const newSet = new Set(prev)
      if (loading) newSet.add(userId)
      else newSet.delete(userId)
      return newSet
    })
  }

  const handleStatusChange = async (userId: string, newStatus: "ACTIVE" | "SUSPENDED") => {
    try {
      setUserLoading(userId, true)

      if (newStatus === "ACTIVE") {
        await userApi.activateUser(userId)
      } else {
        await userApi.suspendUser(userId)
      }

      setUserList((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, status: newStatus, updated_at: new Date().toISOString() }
            : user
        ),
      )

      const user = userList.find((u) => u.id === userId)
      toast({
        title: `User ${newStatus === "ACTIVE" ? "Activated" : "Suspended"}`,
        description: `${getDisplayName(user!)} has been ${newStatus === "ACTIVE" ? "activated" : "suspended"}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user status",
        variant: "destructive",
      })
    } finally {
      setUserLoading(userId, false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      setUserLoading(userId, true)
      await userApi.deleteUser(userId)

      const user = userList.find((u) => u.id === userId)
      setUserList((prev) => prev.filter((user) => user.id !== userId))

      toast({
        title: "User Deleted",
        description: `${getDisplayName(user!)} has been removed from the system.`,
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive",
      })
    } finally {
      setUserLoading(userId, false)
    }
  }

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      const response = await userApi.createUser(userData)
      const newUser = await userApi.getUserById(response.userId)

      setUserList((prev) => [
        ...prev,
        {
          ...newUser,
          last_active: getLastActiveTime(newUser.updated_at),
        },
      ])

      toast({
        title: "User Created",
        description: `${getDisplayName(newUser)} has been added to the system.`,
      })

      setIsCreateDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: DisplayUser["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
            Active
          </Badge>
        )
      case "SUSPENDED":
        return (
          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
            Suspended
          </Badge>
        )
      case "INACTIVE":
        return (
          <Badge variant="outline" className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: DisplayUser["role"]) => {
    switch (role) {
      case "ADMIN":
        return (
          <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-400">
            <Shield className="mr-1 h-3 w-3" /> Admin
          </Badge>
        )
      case "RESEARCHER":
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
            <ShieldCheck className="mr-1 h-3 w-3" /> Researcher
          </Badge>
        )
      case "LEADER":
        return (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400">
            <ShieldCheck className="mr-1 h-3 w-3" /> Leader
          </Badge>
        )
      case "GUEST":
        return (
          <Badge variant="outline">
            <Users className="mr-1 h-3 w-3" /> Guest
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Users className="mr-1 h-3 w-3" /> {role}
          </Badge>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <UserStatCards users={[]} isLoading={true} />
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts, permissions, and status.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading users...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <UserStatCards users={userList} isLoading={false} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, permissions, and status.</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {sortedUsers.map((user) => (
                <UserCardMobile
                  key={user.id}
                  user={user}
                  onActivate={() => handleStatusChange(user.id, "ACTIVE")}
                  onSuspend={() => handleStatusChange(user.id, "SUSPENDED")}
                  onDelete={() => handleDeleteUser(user.id)}
                  getStatusBadge={getStatusBadge}
                  getRoleBadge={getRoleBadge}
                  isLoading={loadingUsers.has(user.id)}
                />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    onClick={() => handleSort("first_name")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      Name
                      {sortColumn === "first_name" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("email")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      Email
                      {sortColumn === "email" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("status")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      Status
                      {sortColumn === "status" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("role")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      Role
                      {sortColumn === "role" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead
                    onClick={() => handleSort("updated_at")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      Last Active
                      {sortColumn === "updated_at" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{getDisplayName(user)}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.affiliation || "—"}</TableCell>
                    <TableCell>{getLastActiveTime(user.updated_at)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                            disabled={loadingUsers.has(user.id)}
                          >
                            {loadingUsers.has(user.id) ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "ACTIVE")}
                            disabled={user.status === "ACTIVE" || loadingUsers.has(user.id)}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Activate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "SUSPENDED")}
                            disabled={user.status === "SUSPENDED" || loadingUsers.has(user.id)}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Suspend</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={loadingUsers.has(user.id)}
                            className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateUserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateUser={handleCreateUser}
      />
    </div>
  )
}
