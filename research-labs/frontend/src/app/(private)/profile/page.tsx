// src/app/(private)/profile/page.tsx

import Link from "next/link"
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPinIcon, BuildingIcon, } from "lucide-react";
import PublicationCard from "@/components/profile/publication-card";
import ProfileHeader from "@/components/profile/profile-header";

// User profile interface
interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  bio: string | null;
  affiliation: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}
export type RawStatus = "DRAFT" | "APPROVED" | "WAITING";

export interface RawPublication {
  id: string;
  title: string;
  journal: string;
  status: RawStatus;
  submitter_id: string;
  submiited_at: string;  // Note the typo as returned by the API
}

export async function getPublications(
  userId: string,
  token: string
): Promise<RawPublication[]> {
  const res = await fetch(
    `http://127.0.0.1:3009/api/publications/user/${encodeURIComponent(
      userId
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  // console.log(res.text())
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to load publications: ${errText}`);
  }

  const json: RawPublication[] = await res.json();
  console.log(json);
  return json;
}
export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("AccessTokenCookie")?.value;

  if (!userId || !token) {
    redirect('/login');
  }

  // Fetch user profile
  const userRes = await fetch(`http://127.0.0.1:3005/api/profiles/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!userRes.ok) {
    notFound();
  }

  const userJson = await userRes.json();
  const user: UserProfile = userJson.data;


  const publications = await getPublications(user.id)

  console.log("hehe")
  console.log(publications)
  console.log("hehe")
  user.isCurrentUser = true;
  return (
    <div className="container w-full mx-auto px-4 py-8">
      <ProfileHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <BuildingIcon className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{user.affiliation || 'N/A'}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                <span>Member since {new Date(user.created_at).toLocaleDateString()}</span>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Bio</h4>
                <p className="text-sm">{user.bio || 'No bio available.'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{user.status}</p>
                  <p className="text-sm text-muted-foreground">Status</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{new Date(user.updated_at).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
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
                <Link href={`publications/${publication.id}`}>
                  <PublicationCard key={publication.id} publication={publication} />
                </Link>
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
  );
}
