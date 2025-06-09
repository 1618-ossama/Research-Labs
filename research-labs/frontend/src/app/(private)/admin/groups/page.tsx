"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { Users, Crown, UserMinus, UserPlus, Search, Trash2, Edit, Shield, Archive } from "lucide-react"
import Link from "next/link"

interface Group {
  id: string
  title: string
  description: string
  status: "ONGOINING" | "SUSPENDED" | "FINISHED" | "DELETED"
  created_at: string
  updated_at: string
  leader_id: string
  leader: {
    id: string
    username: string
    first_name?: string
    last_name?: string
    email?: string
  }
  members: GroupMember[]
}

interface GroupMember {
  id: string
  username: string
  first_name?: string
  last_name?: string
  email?: string
  role?: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST"
  photo_url?: string
  affiliation?: string
  joined_at: string
}

interface User {
  id: string
  username: string
  first_name?: string
  last_name?: string
  email?: string
  role?: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST"
  photo_url?: string
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';')[0] || '';
  }
  return '';
}

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [editForm, setEditForm] = useState({ title: "", description: "", status: "" })
  const [selectedUserId, setSelectedUserId] = useState("")


  const token = getCookie("AccessTokenCookie");

  useEffect(() => {
    fetchAllGroups()
    fetchAllUsers()
  }, [])

  const fetchAllGroups = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setGroups(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch groups:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/profiles/users`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const updateGroup = async () => {
    if (!selectedGroup || !editForm.title.trim() || !editForm.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${selectedGroup.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
        credentials: 'include'
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Group updated successfully",
        })
        setShowEditDialog(false)
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to update group",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update group",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteGroup = async (groupId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${groupId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Group deleted successfully",
        })
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to delete group",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete group",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addMemberToGroup = async () => {
    if (!selectedGroup || !selectedUserId) {
      toast({
        title: "Error",
        description: "Please select a user",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${selectedGroup.id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: selectedUserId }),
        credentials: 'include'
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Member added successfully",
        })
        setShowAddMemberDialog(false)
        setSelectedUserId("")
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to add member",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeMemberFromGroup = async (groupId: string, userId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${groupId}/members/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Member removed successfully",
        })
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to remove member",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONGOINING":
        return "default"
      case "SUSPENDED":
        return "destructive"
      case "FINISHED":
        return "secondary"
      case "DELETED":
        return "outline"
      default:
        return "secondary"
    }
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.leader.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeGroups = filteredGroups.filter((g) => g.status !== "DELETED")
  const deletedGroups = filteredGroups.filter((g) => g.status === "DELETED")

  const openEditDialog = (group: Group) => {
    setSelectedGroup(group)
    setEditForm({
      title: group.title,
      description: group.description,
      status: group.status,
    })
    setShowEditDialog(true)
  }

  const openAddMemberDialog = (group: Group) => {
    setSelectedGroup(group)
    setShowAddMemberDialog(true)
  }

  const availableUsers = users.filter((user) => !selectedGroup?.members.some((member) => member.id === user.id))

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Group Administration
            </h1>
            <p className="text-muted-foreground">Manage all groups and their members</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/profile">Back to Profile</Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups, leaders, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{groups.length}</p>
                  <p className="text-sm text-muted-foreground">Total Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{activeGroups.length}</p>
                  <p className="text-sm text-muted-foreground">Active Groups</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{groups.filter((g) => g.status === "SUSPENDED").length}</p>
                  <p className="text-sm text-muted-foreground">Suspended</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{deletedGroups.length}</p>
                  <p className="text-sm text-muted-foreground">Deleted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Groups ({activeGroups.length})</TabsTrigger>
            <TabsTrigger value="deleted">Deleted Groups ({deletedGroups.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeGroups.length > 0 ? (
              activeGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{group.title}</CardTitle>
                          <Badge variant={getStatusColor(group.status)}>{group.status.toLowerCase()}</Badge>
                        </div>
                        <CardDescription>{group.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span>
                            Leader: {group.leader.first_name} {group.leader.last_name}
                          </span>
                          <span>{group.members.length} members</span>
                          <span>Created {formatDate(group.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(group)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openAddMemberDialog(group)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Add Member
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Group</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{group.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteGroup(group.id)}>Delete Group</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Members ({group.members.length})</h4>
                      <div className="space-y-2">
                        {group.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={
                                    member.photo_url
                                      ? `http://127.0.0.1:6188/rust/api/uploads/${member.photo_url}`
                                      : undefined
                                  }
                                />
                                <AvatarFallback className="text-xs">
                                  {member.first_name?.[0]}
                                  {member.last_name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {member.first_name} {member.last_name}
                                  {member.id === group.leader_id && (
                                    <Crown className="inline h-3 w-3 ml-1 text-yellow-500" />
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">@{member.username}</p>
                              </div>
                            </div>
                            {member.id !== group.leader_id && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <UserMinus className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove {member.first_name} {member.last_name} from this
                                      group?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeMemberFromGroup(group.id, member.id)}>
                                      Remove Member
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No active groups found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="deleted" className="space-y-4">
            {deletedGroups.length > 0 ? (
              deletedGroups.map((group) => (
                <Card key={group.id} className="opacity-60">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{group.title}</CardTitle>
                          <Badge variant="outline">deleted</Badge>
                        </div>
                        <CardDescription>{group.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span>
                            Leader: {group.leader.first_name} {group.leader.last_name}
                          </span>
                          <span>{group.members.length} members</span>
                          <span>Deleted {formatDate(group.updated_at)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Trash2 className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No deleted groups found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Edit Group Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="z-60">
            <DialogHeader>
              <DialogTitle>Edit Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Group Title</Label>
                <Input
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONGOINING">Ongoing</SelectItem>
                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                    <SelectItem value="FINISHED">Finished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={updateGroup} disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Group"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
          <DialogContent className="z-60">
            <DialogHeader>
              <DialogTitle>Add Member to {selectedGroup?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-select">Select User</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user to add" />
                  </SelectTrigger>
                  <SelectContent className="z-65">
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.first_name} {user.last_name} (@{user.username})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addMemberToGroup} disabled={loading || !selectedUserId} className="w-full">
                {loading ? "Adding..." : "Add Member"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
