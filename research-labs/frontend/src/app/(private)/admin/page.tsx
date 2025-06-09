"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage platform settings and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all user accounts</CardDescription>
              </div>
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/admin/users")}
              className="w-full"
            >
              Access
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Group Management</CardTitle>
                <CardDescription>Manage all groups</CardDescription>
              </div>
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/admin/groups/")}
              className="w-full"
            >
              Access
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View Dashboard</CardDescription>
              </div>
              <Settings className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/admin/dashboard/")}
              className="w-full"
            >
              Access
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
