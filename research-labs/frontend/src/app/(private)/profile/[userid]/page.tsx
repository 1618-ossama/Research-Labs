import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  Button,
  buttonVariants
} from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PencilIcon } from 'lucide-react';
import {
  Building2,
  Link2,
  Calendar,
  FileText,
  Users,
  LayoutGrid,
  Globe,
  Github,
  Linkedin
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Make sure these components exist and are properly exported in their files
import PublicationCard from "@/components/profile/publication-card"

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

interface Publication {
  id: string
  title: string
  journal: string
  doi: string
  status: "DRAFT" | "APPROVED" | "WAITING" | "DELETED"
  visibility: "PUBLIC" | "PRIVATE"
  submitted_at: string
}

async function fetchUserProfile(userId: string, token: string): Promise<UserProfile> {
  const [profileRes, linksRes] = await Promise.all([
    fetch(`http://127.0.0.1:3005/api/profiles/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
    fetch(`${process.env.NEXT_PUBLIC_RUST_BACKEND_URL}/api/links/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
  ])

  if (!profileRes.ok) throw new Error("Failed to fetch user profile")

  const profileData = await profileRes.json()
  const linksData = linksRes.ok ? await linksRes.json() : []

  return {
    ...profileData.data,
    links: linksData
  }
}

async function fetchUserPublications(userId: string, token: string): Promise<Publication[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RUST_BACKEND_URL}/api/publications/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (!res.ok) return []
  const data = await res.json()
  return data.filter((pub: Publication) => pub.status !== "DELETED")
}

interface ProfilePageProps {
  params: {
    username: string
  }
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const cookieStore = cookies()

  const token = cookieStore.get("AccessTokenCookie")?.value

  let userId = params.username;

  if (!userId || !token) redirect('/auth/login')

  const [user, publications] = await Promise.all([
    fetchUserProfile(userId, token),
    fetchUserPublications(userId, token)
  ])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  const getIconForLinkType = (type: string) => {
    switch (type) {
      case "GITHUB": return <Github className="h-4 w-4" />
      case "LINKEDIN": return <Linkedin className="h-4 w-4" />
      case "WEBSITE": return <Globe className="h-4 w-4" />
      default: return <Link2 className="h-4 w-4" />
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header with Edit Button */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.photo_url || ""} />
                    <AvatarFallback>
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      @{user.username}
                    </p>
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
                    <p className="text-sm">
                      Joined {formatDate(user.created_at)}
                    </p>
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
                              "h-8 px-3 text-xs gap-2"
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
                  <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-2xl font-bold">
                      {publications.length}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Publications
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-2xl font-bold">0</span>
                    <span className="text-xs text-muted-foreground">
                      Projects
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="publications">
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
                  value="projects"
                  className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Projects
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="collaborators"
                  className="relative px-4 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Collaborators
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="pt-6">
                <TabsContent value="publications">
                  <div className="space-y-4">
                    {publications.length > 0 ? (
                      publications.map((publication) => (
                        <PublicationCard
                          key={publication.id}
                          publication={publication}
                        />
                      ))
                    ) : (
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-8 text-center">
                          <div className="mx-auto max-w-md space-y-2">
                            <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
                            <CardTitle className="text-lg">
                              No publications yet
                            </CardTitle>
                            <CardDescription>
                              Share your research by adding your first publication
                            </CardDescription>
                            <Button asChild className="mt-4">
                              <Link href="/publications/create">
                                Add Publication
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="projects">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto max-w-md space-y-2">
                        <LayoutGrid className="h-10 w-10 mx-auto text-muted-foreground" />
                        <CardTitle className="text-lg">
                          Projects coming soon
                        </CardTitle>
                        <CardDescription>
                          Organize your research into projects and collaborate with others
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="collaborators">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto max-w-md space-y-2">
                        <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                        <CardTitle className="text-lg">
                          Collaborators coming soon
                        </CardTitle>
                        <CardDescription>
                          Connect with other researchers and build your network
                        </CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
