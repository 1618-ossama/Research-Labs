'use client'

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountSettings from "@/components/settings/account-settings"
import ProfileSettings from "@/components/settings/profile-settings"
import PrivacySettings from "@/components/settings/privacy-settings"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation';

export default function SettingsPage() {
  const params = useParams();
  const userid = params.userid;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link href={`/profile/`}>Back to Profile </Link>
        </Button>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full h-full md:w-auto grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-0">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountSettings userId={userid as string} />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileSettings userId={userid as string} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
