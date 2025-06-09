"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

const GroupManagement = dynamic(
  () => import("@/components/groups/group-management").then((mod) => mod.GroupManagement),
  {
    ssr: false,
    loading: () => (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="mx-auto max-w-md space-y-2">
            <Users className="h-10 w-10 mx-auto text-muted-foreground" />
            <CardTitle className="text-lg">Loading groups...</CardTitle>
          </div>
        </CardContent>
      </Card>
    ),
  }
)

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
  members: Array<{
    id: string
    username: string
    first_name?: string
    last_name?: string
    email?: string
    role?: "ADMIN" | "RESEARCHER" | "LEADER" | "GUEST"
    photo_url?: string
    affiliation?: string
    joined_at: string
  }>
}

interface GroupManagementClientProps {
  initialGroups: Group[]
  userId: string
  token: string
}

export default function GroupManagementClient({ initialGroups, userId, token }: GroupManagementClientProps) {
  return <GroupManagement initialGroups={initialGroups} token={token} userId={userId} />
}
