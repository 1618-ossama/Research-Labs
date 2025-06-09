"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PencilIcon } from "lucide-react"
import { Building2, Link2, Calendar, FileText, Users, Globe, Github, Linkedin, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import PublicationCard from "@/components/profile/publication-card"
import { ConferenceCard } from "@/components/conferences/conferences-card"
import GroupManagementClient from "@/components/groups/group-client"

interface UserProfile {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  role: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST"
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  bio: string | null
  affiliation: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
  links?: {
    id: string
    type: "LINKEDIN" | "GITHUB" | "WEBSITE" | "RESEARCHGATE" | "OTHER"
    link: string
  }[]
}

type ConferenceRaw = {
  id: string
  name: string
  description: string
  location: string
  start_date: number[] // [year, month, day, hour, minute, second]
  end_date: number[]
}

interface Publication {
  id: string
  title: string
  journal: string
  doi: string
  status: "DRAFT" | "APPROVED" | "WAITING" | "DELETED"
  visibility: "PUBLIC" | "PRIVATE"
  submitted_at: string
}

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


function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';')[0] || '';
  }
  return '';
}

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])
  const [conferences, setConferences] = useState<ConferenceRaw[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userId = params.userid as string
  const token = getCookie("AccessTokenCookie")
  const currentUserId = getCookie("userId")

  console.log('start', userId, 'vs', currentUserId, 'end');


  const fetchUserConferences = async (userId: string, token: string): Promise<ConferenceRaw[]> => {
    const res = await fetch(`http://127.0.0.1:6188/rust/api/conferences/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    })

    if (!res.ok) {
      return []
    }

    const data: ConferenceRaw[] = await res.json()

    // Convert date arrays to Date objects
    const conferences = data.map((conf) => {
      const [year, month, day, hour, minute, second] = conf.start_date
      const [eyear, emonth, eday, ehour, eminute, esecond] = conf.end_date

      return {
        ...conf,
        start_date: new Date(year, month - 1, day, hour, minute, second), // JS months are 0-based
        end_date: new Date(eyear, emonth - 1, eday, ehour, eminute, esecond),
      }
    })

    return conferences
  }

  const fetchUserProfile = async (userId: string, token: string): Promise<UserProfile> => {
    const [profileRes, linksRes] = await Promise.all([
      fetch(`http://127.0.0.1:6188/nodejs/api/profiles/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      }),
      fetch(`http://127.0.0.1:6188/nodejs/api/links/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      }),
    ])

    if (!profileRes.ok) throw new Error("Failed to fetch user profile")

    const profileData = await profileRes.json()
    const linksData = linksRes.ok ? await linksRes.json() : []

    return {
      ...profileData.data,
      links: linksData,
    }
  }

  const fetchUserPublications = async (userId: string, token: string): Promise<Publication[]> => {
    const res = await fetch(`http://127.0.0.1:6188/rust/api/publications/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include'
    })

    if (!res.ok) return []
    const data = await res.json()
    return data.filter((pub: Publication) => pub.status !== "DELETED")
  }

  const fetchUserGroups = async (userId: string, token: string): Promise<Group[]> => {
    const res = await fetch(`http://127.0.0.1:6188/nodejs/api/groups/my-groups`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    })

    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!token) {
          router.push("/login")
          return
        }

        const [userProfile, userPublications, userConferences, userGroups] = await Promise.all([
          fetchUserProfile(userId, token),
          fetchUserPublications(userId, token),
          fetchUserConferences(userId, token),
          fetchUserGroups(userId, token),
        ])

        setUser(userProfile)
        setPublications(userPublications)
        setConferences(userConferences)
        setGroups(userGroups)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile data")
        console.error("Error loading profile data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router, userId, token])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const getIconForLinkType = (type: string) => {
    switch (type) {
      case "GITHUB":
        return <Github className="h-4 w-4" />
      case "LINKEDIN":
        return <Linkedin className="h-4 w-4" />
      case "WEBSITE":
        return <Globe className="h-4 w-4" />
      default:
        return <Link2 className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Card className="border-destructive">
          <CardContent className="p-8 text-center">
            <div className="mx-auto max-w-md space-y-2">
              <CardTitle className="text-lg text-destructive">Error Loading Profile</CardTitle>
              <CardDescription>{error}</CardDescription>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isCurrentUser = userId == currentUserId

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex gap-2">
            {user.role === "ADMIN" && isCurrentUser && (
              <Button asChild variant="secondary">
                <Link href="/admin" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
            {isCurrentUser && (
              <Button asChild variant="outline">
                <Link href={`/profile/${userId}/settings`} className="flex items-center gap-2">
                  <PencilIcon className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`http://127.0.0.1:6188/rust/api/uploads/${user.photo_url}`} />
                    <AvatarFallback>
                      {user.first_name?.[0]}
                      {user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {user.affiliation && (
                    <div className="flex items-start gap-3">
                      <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <p className="text-sm">{user.affiliation}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Joined {formatDate(user.created_at)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
                      {user.status.toLowerCase()}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {user.role.toLowerCase()}
                    </Badge>
                  </div>
                </div>

                {user.bio && (
                  <>
                    <Separator />
                    <p className="text-sm text-muted-foreground">{user.bio}</p>
                  </>
                )}

                {user.links && user.links.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Links</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.links.map((link) => (
                          <a
                            key={link.id}
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              buttonVariants({ variant: "outline", size: "sm" }),
                              "h-8 px-3 text-xs gap-2 flex items-center",
                            )}
                          >
                            {getIconForLinkType(link.type)}
                            {link.type.toLowerCase()}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-lg">Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="#publications"
                    className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-2xl font-bold">{publications.length}</span>
                    <span className="text-xs text-muted-foreground">Publications</span>
                  </Link>
                  <Link
                    href="#conferences"
                    className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-2xl font-bold">{conferences.length}</span>
                    <span className="text-xs text-muted-foreground">Conferences</span>
                  </Link>
                  <Link
                    href="#groups"
                    className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-2xl font-bold">{groups.length}</span>
                    <span className="text-xs text-muted-foreground">Groups</span>
                  </Link>
                  <Link
                    href="#collaborators"
                    className="flex flex-col items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-2xl font-bold">0</span>
                    <span className="text-xs text-muted-foreground">Collaborators</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="publications" id="tabs">
              <TabsList className="w-full justify-start rounded-lg bg-transparent p-0 h-auto border-b">
                <TabsTrigger
                  value="publications"
                  className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Publications
                    <Badge variant="secondary" className="ml-1">
                      {publications.length}
                    </Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  value="conferences"
                  className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Conferences
                    <Badge variant="secondary" className="ml-1">
                      {conferences.length}
                    </Badge>
                  </div>
                </TabsTrigger>

                {isCurrentUser && (
                  <TabsTrigger
                    value="groups"
                    className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Groups
                      <Badge variant="secondary" className="ml-1">
                        {groups.length}
                      </Badge>
                    </div>
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="pt-6">
                <TabsContent value="publications">
                  <div className="space-y-4">
                    {publications.length > 0 ? (
                      publications.map((publication) => (
                        <PublicationCard key={publication.id} publication={publication} />
                      ))
                    ) : (
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-8 text-center">
                          <div className="mx-auto max-w-md space-y-2">
                            <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
                            <CardTitle className="text-lg">No publications yet</CardTitle>
                            <CardDescription>
                              {isCurrentUser ? "Share your research by adding your first publication" : "This user has no publications yet"}
                            </CardDescription>
                            {isCurrentUser && (
                              <Button asChild className="mt-4">
                                <Link href="/publications/create">Add Publication</Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="conferences">
                  <div className="space-y-4">
                    {conferences.length > 0 ? (
                      conferences.map((conference) => <ConferenceCard key={conference.id} conference={conference} />)
                    ) : (
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-8 text-center">
                          <div className="mx-auto max-w-md space-y-2">
                            <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
                            <CardTitle className="text-lg">No conferences yet</CardTitle>
                            <CardDescription>
                              {isCurrentUser ? "You have no conferences added yet." : "This user has no conferences yet."}
                            </CardDescription>
                            {isCurrentUser && (
                              <Button asChild className="mt-4">
                                <Link href="/conferences/create">Add Conference</Link>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                {isCurrentUser && (
                  <TabsContent value="groups">
                    <GroupManagementClient
                      initialGroups={groups}
                      userId={userId}
                      token={token || ""}
                    />
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

