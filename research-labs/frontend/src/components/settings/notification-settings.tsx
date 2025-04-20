"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toast as toast } from "@/components/ui/use-toast";

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailFrequency, setEmailFrequency] = useState("daily")
  const [notifications, setNotifications] = useState({
    newFollowers: true,
    mentions: true,
    directMessages: true,
    publicationCitations: true,
    collaborationRequests: true,
    researchUpdates: false,
    newsletters: false,
    events: true,
  })

  const handleToggleChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Digest</CardTitle>
          <CardDescription>Configure how often you receive email summaries.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={emailFrequency} onValueChange={setEmailFrequency}>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="realtime" id="realtime" />
              <Label htmlFor="realtime">Real-time</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily digest</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">Don't send email digests</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what activities you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Social</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="newFollowers" className="flex-1">
                  New followers
                  <p className="text-sm font-normal text-muted-foreground">When someone follows your profile</p>
                </Label>
                <Switch
                  id="newFollowers"
                  checked={notifications.newFollowers}
                  onCheckedChange={() => handleToggleChange("newFollowers")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mentions" className="flex-1">
                  Mentions
                  <p className="text-sm font-normal text-muted-foreground">
                    When someone mentions you in a comment or post
                  </p>
                </Label>
                <Switch
                  id="mentions"
                  checked={notifications.mentions}
                  onCheckedChange={() => handleToggleChange("mentions")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="directMessages" className="flex-1">
                  Direct messages
                  <p className="text-sm font-normal text-muted-foreground">When you receive a direct message</p>
                </Label>
                <Switch
                  id="directMessages"
                  checked={notifications.directMessages}
                  onCheckedChange={() => handleToggleChange("directMessages")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Research</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="publicationCitations" className="flex-1">
                  Publication citations
                  <p className="text-sm font-normal text-muted-foreground">When your publications are cited</p>
                </Label>
                <Switch
                  id="publicationCitations"
                  checked={notifications.publicationCitations}
                  onCheckedChange={() => handleToggleChange("publicationCitations")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="collaborationRequests" className="flex-1">
                  Collaboration requests
                  <p className="text-sm font-normal text-muted-foreground">When someone invites you to collaborate</p>
                </Label>
                <Switch
                  id="collaborationRequests"
                  checked={notifications.collaborationRequests}
                  onCheckedChange={() => handleToggleChange("collaborationRequests")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="researchUpdates" className="flex-1">
                  Research updates
                  <p className="text-sm font-normal text-muted-foreground">Updates on research in your field</p>
                </Label>
                <Switch
                  id="researchUpdates"
                  checked={notifications.researchUpdates}
                  onCheckedChange={() => handleToggleChange("researchUpdates")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Other</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="newsletters" className="flex-1">
                  Newsletters
                  <p className="text-sm font-normal text-muted-foreground">Periodic newsletters and updates</p>
                </Label>
                <Switch
                  id="newsletters"
                  checked={notifications.newsletters}
                  onCheckedChange={() => handleToggleChange("newsletters")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="events" className="flex-1">
                  Events
                  <p className="text-sm font-normal text-muted-foreground">Upcoming conferences and events</p>
                </Label>
                <Switch
                  id="events"
                  checked={notifications.events}
                  onCheckedChange={() => handleToggleChange("events")}
                />
              </div>
            </div>
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
