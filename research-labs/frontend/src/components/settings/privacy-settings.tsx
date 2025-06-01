"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast";
import { LockIcon, EyeIcon, UsersIcon } from "lucide-react"

export default function PrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    emailVisibility: "followers",
    publicationsVisibility: "public",
    projectsVisibility: "public",
    collaboratorsVisibility: "public",
    searchable: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
  })

  const handleVisibilityChange = (key: keyof typeof privacySettings, value: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleToggleChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Profile</Label>
              <Select
                value={privacySettings.profileVisibility}
                onValueChange={(value) => handleVisibilityChange("profileVisibility", value)}
              >
                <SelectTrigger id="profileVisibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="followers">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Followers Only
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <LockIcon className="h-4 w-4 mr-2" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailVisibility">Email Address</Label>
              <Select
                value={privacySettings.emailVisibility}
                onValueChange={(value) => handleVisibilityChange("emailVisibility", value)}
              >
                <SelectTrigger id="emailVisibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="followers">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Followers Only
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <LockIcon className="h-4 w-4 mr-2" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationsVisibility">Publications</Label>
              <Select
                value={privacySettings.publicationsVisibility}
                onValueChange={(value) => handleVisibilityChange("publicationsVisibility", value)}
              >
                <SelectTrigger id="publicationsVisibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="followers">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Followers Only
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <LockIcon className="h-4 w-4 mr-2" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectsVisibility">Projects</Label>
              <Select
                value={privacySettings.projectsVisibility}
                onValueChange={(value) => handleVisibilityChange("projectsVisibility", value)}
              >
                <SelectTrigger id="projectsVisibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="followers">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 mr-2" />
                      Followers Only
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <LockIcon className="h-4 w-4 mr-2" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Privacy Settings</CardTitle>
          <CardDescription>Configure additional privacy options for your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="searchable" className="flex-1">
              Show in search results
              <p className="text-sm font-normal text-muted-foreground">
                Allow your profile to appear in search results
              </p>
            </Label>
            <Switch
              id="searchable"
              checked={privacySettings.searchable}
              onCheckedChange={() => handleToggleChange("searchable")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showOnlineStatus" className="flex-1">
              Show online status
              <p className="text-sm font-normal text-muted-foreground">Allow others to see when you are online</p>
            </Label>
            <Switch
              id="showOnlineStatus"
              checked={privacySettings.showOnlineStatus}
              onCheckedChange={() => handleToggleChange("showOnlineStatus")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allowDirectMessages" className="flex-1">
              Allow direct messages
              <p className="text-sm font-normal text-muted-foreground">Allow others to send you direct messages</p>
            </Label>
            <Switch
              id="allowDirectMessages"
              checked={privacySettings.allowDirectMessages}
              onCheckedChange={() => handleToggleChange("allowDirectMessages")}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
