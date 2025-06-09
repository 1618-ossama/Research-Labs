"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { toast } from "@/hooks/use-toast"
import { Plus, Users, Crown, Calendar, LogOut, Search } from "lucide-react"

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

interface GroupManagementProps {
  initialGroups: Group[]
  token: string;
  userId: string;
}

export function GroupManagement({ initialGroups, token, userId }: GroupManagementProps) {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [allGroups, setAllGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [newGroup, setNewGroup] = useState({ title: "", description: "" })

  useEffect(() => {
    fetchAllGroups()
  }, [])

  const fetchAllGroups = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include"
      })
      if (res.ok) {
        const data = await res.json()
        setAllGroups(data.data || [])
      }
    } catch (error) {
      console.error("Failed to fetch all groups:", error)
    }
  }

  const createGroup = async () => {
    if (!newGroup.title.trim() || !newGroup.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGroup),
        credentials: "include"
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Group created successfully",
        })
        setNewGroup({ title: "", description: "" })
        setShowCreateDialog(false)
        // Refresh groups
        const updatedRes = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/my-groups`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include"
        })
        if (updatedRes.ok) {
          const data = await updatedRes.json()
          setGroups(data.data || [])
        }
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to create group",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const joinGroup = async (groupId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include"
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Successfully joined the group",
        })
        const updatedRes = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/my-groups`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include"
        })
        if (updatedRes.ok) {
          const data = await updatedRes.json()
          setGroups(data.data || [])
        }
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to join group",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join group",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const leaveGroup = async (groupId: string) => {
    setLoading(true)
    try {
      const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/${groupId}/leave`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include"
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Successfully left the group",
        })
        setGroups(groups.filter((g) => g.id !== groupId))
        fetchAllGroups()
      } else {
        const error = await res.json()
        toast({
          title: "Error",
          description: error.message || "Failed to leave group",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to leave group",
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
        return "secondary"
      case "FINISHED":
        return "outline"
      default:
        return "secondary"
    }
  }

  const availableGroups = allGroups.filter(
    (group) =>
      !groups.some((myGroup) => myGroup.id === group.id) &&
      group.status === "ONGOINING" &&
      (group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="z-60">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Group Title</Label>
                <Input
                  id="title"
                  value={newGroup.title}
                  onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })}
                  placeholder="Enter group title (3-100 characters)"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Enter group description (10-500 characters)"
                  rows={3}
                />
              </div>
              <Button onClick={createGroup} disabled={loading} className="w-full">
                {loading ? "Creating..." : "Create Group"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Join Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl z-60">
            <DialogHeader>
              <DialogTitle>Join a Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {availableGroups.length > 0 ? (
                  availableGroups.map((group) => (
                    <Card key={group.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{group.title}</h4>
                            <Badge variant={getStatusColor(group.status)}>{group.status.toLowerCase()}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>
                              Leader: {group.leader.first_name} {group.leader.last_name}
                            </span>
                            <span>{group.members.length} members</span>
                            <span>Created {formatDate(group.created_at)}</span>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => joinGroup(group.id)} disabled={loading}>
                          Join
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    {searchQuery ? "No groups found matching your search" : "No available groups to join"}
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* My Groups */}
      <div className="space-y-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{group.title}</CardTitle>
                      <Badge variant={getStatusColor(group.status)}>{group.status.toLowerCase()}</Badge>
                      {group.leader_id === userId && (
                        <Badge variant="outline" className="text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          Leader
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {group.leader_id !== userId && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <LogOut className="h-4 w-4 mr-2" />
                            Leave
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Leave Group</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to leave "{group.title}"? You'll need to request to join again if
                              you change your mind.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => leaveGroup(group.id)}>Leave Group</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created {formatDate(group.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {group.members.length} members
                    </div>
                  </div>

                  {/* Group Members */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Members</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.members.slice(0, 5).map((member) => (
                        <div key={member.id} className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={
                                member.photo_url ? `http://127.0.0.1:6188/api/uploads/${member.photo_url}` : undefined
                              }
                            />
                            <AvatarFallback className="text-xs">
                              {member.first_name?.[0]}
                              {member.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {member.first_name} {member.last_name}
                          </span>
                          {member.id === group.leader_id && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                      ))}
                      {group.members.length > 5 && (
                        <div className="flex items-center justify-center bg-muted/50 rounded-full px-3 py-1">
                          <span className="text-sm text-muted-foreground">+{group.members.length - 5} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mx-auto max-w-md space-y-2">
                <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                <CardTitle className="text-lg">No groups yet</CardTitle>
                <CardDescription>
                  Create your first group or join an existing one to start collaborating
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
