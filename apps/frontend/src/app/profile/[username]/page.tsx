import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MailIcon, MapPinIcon, BuildingIcon, LinkIcon, GlobeIcon } from "lucide-react"
import PublicationCard from "@/components/profile/publication-card"
import ProfileHeader from "@/components/profile/profile-header"

async function getUser(username: string) {
  // simulate gettings new user
  await new Promise((resolve) => setTimeout(resolve, 500))

  const users = {
    jsmith: {
      id: "1",
      username: "jsmith",
      name: "Dr. Jane Smith",
      avatar: "/placeholder.svg?height=300&width=300",
      coverImage: "/placeholder.svg?height=400&width=1200",
      title: "Associate Professor of Molecular Biology",
      affiliation: "Stanford University",
      location: "Stanford, CA",
      email: "jane.smith@stanford.edu",
      website: "https://janesmith.research.edu",
      bio: "Researching molecular mechanisms of cellular aging and regeneration with a focus on therapeutic applications.",
      interests: ["Molecular Biology", "Cellular Aging", "Regenerative Medicine", "Gene Therapy"],
      stats: {
        publications: 47,
        citations: 1283,
        hIndex: 18,
        followers: 215,
      },
      isCurrentUser: false,
      isFollowing: false,
      privacySettings: {
        email: "public",
        publications: "public",
      },
    },
    "current-user": {
      id: "2",
      username: "current-user",
      name: "Dr. Alex Johnson",
      avatar: "/placeholder.svg?height=300&width=300",
      coverImage: "/placeholder.svg?height=400&width=1200",
      title: "Assistant Professor of Bioinformatics",
      affiliation: "MIT",
      location: "Cambridge, MA",
      email: "alex.johnson@mit.edu",
      website: "https://alexjohnson.research.edu",
      bio: "Developing computational methods for analyzing large-scale genomic data to understand disease mechanisms.",
      interests: ["Bioinformatics", "Genomics", "Machine Learning", "Systems Biology"],
      stats: {
        publications: 23,
        citations: 578,
        hIndex: 12,
        followers: 98,
      },
      isCurrentUser: true,
      isFollowing: false,
      privacySettings: {
        email: "followers",
        publications: "public",
      },
    },
  }

  return users[username] || null
}

async function getPublications(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "1",
      title: "Novel computational approach for predicting protein-protein interactions in cancer pathways",
      journal: "Nature Bioinformatics",
      year: 2023,
      authors: ["Johnson, A.", "Zhang, L.", "Patel, S.", "Garcia, R."],
      abstract:
        "We present a new machine learning framework that integrates structural and functional data to predict protein interactions with high accuracy.",
      doi: "10.1038/s41587-023-0123-4",
      citations: 12,
      isOpenAccess: true,
    },
    {
      id: "2",
      title: "Genomic analysis reveals new targets for immunotherapy in metastatic melanoma",
      journal: "Cell",
      year: 2022,
      authors: ["Patel, S.", "Johnson, A.", "Williams, T.", "Chen, H."],
      abstract:
        "Comprehensive genomic profiling of metastatic melanoma samples identified novel immune checkpoint regulators that could serve as therapeutic targets.",
      doi: "10.1016/j.cell.2022.08.015",
      citations: 45,
      isOpenAccess: false,
    },
    {
      id: "3",
      title:
        "Single-cell transcriptomics of tumor microenvironment reveals prognostic signatures in treatment-resistant breast cancer",
      journal: "Science Advances",
      year: 2021,
      authors: ["Johnson, A.", "Lee, K.", "Ramirez, J.", "Kim, Y."],
      abstract:
        "Single-cell RNA sequencing of breast cancer biopsies identified distinct cellular states associated with treatment resistance and poor clinical outcomes.",
      doi: "10.1126/sciadv.abc1234",
      citations: 78,
      isOpenAccess: true,
    },
  ]
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username)

  if (!user) {
    notFound()
  }

  const publications = await getPublications(user.id)

  return (
    <div className="container w-full mx-auto px-4 py-8">
      <ProfileHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <BuildingIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{user.affiliation}</p>
                  <p className="text-sm text-muted-foreground">{user.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>{user.location}</span>
              </div>

              {(user.isCurrentUser ||
                user.privacySettings.email === "public" ||
                (user.privacySettings.email === "followers" && user.isFollowing)) && (
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span>{user.email}</span>
                  </div>
                )}

              {user.website && (
                <div className="flex items-center max-w-screen-md gap-2">
                  <GlobeIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    {user.website.replace(/^https?:\/\//, "")}
                    <LinkIcon className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Bio</h4>
                <p className="text-sm">{user.bio}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Research Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Research Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{user.stats.publications}</p>
                  <p className="text-sm text-muted-foreground">Publications</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{user.stats.citations}</p>
                  <p className="text-sm text-muted-foreground">Citations</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{user.stats.hIndex}</p>
                  <p className="text-sm text-muted-foreground">h-index</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{user.stats.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="publications">
            <TabsList className="mb-4">
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="space-y-4">
              {publications.map((publication) => (
                <PublicationCard key={publication.id} publication={publication} />
              ))}

              <Button variant="outline" className="w-full mt-4">
                View All Publications
              </Button>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">Projects will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaborators">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground py-8">Collaborators will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
